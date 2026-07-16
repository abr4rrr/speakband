import type { IeltsPart, BandScores, Correction } from '@/types/database';

// gemini-1.5-* has been fully retired by Google (requests now 404).
// gemini-2.5-flash is the current cost-effective default for this workload;
// override with GEMINI_MODEL to try gemini-3.5-flash / gemini-3.1-pro for
// higher-quality (and higher-cost) scoring. See README.md for the trade-off.
const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-2.5-flash';
const GEMINI_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

export interface SpeakingAnalysis {
  transcription: string;
  bandScores: BandScores;
  feedbackSummary: string;
  corrections: Correction[];
  modelAnswer: string;
}

interface AnalyzeParams {
  base64Audio: string;
  mimeType: string;
  part: IeltsPart;
  questionText: string;
  cueCardPoints?: string[] | null;
}

// Gemini's structured-output schema format: a constrained subset of OpenAPI
// schema with UPPERCASE type names (OBJECT, STRING, ARRAY, NUMBER, ...).
const RESPONSE_SCHEMA = {
  type: 'OBJECT',
  properties: {
    transcription: {
      type: 'STRING',
      description: 'Verbatim transcription of everything the candidate said, including fillers and false starts.',
    },
    bandScores: {
      type: 'OBJECT',
      properties: {
        fluencyCoherence: { type: 'NUMBER', description: 'Band 0-9, half-band increments.' },
        lexicalResource: { type: 'NUMBER', description: 'Band 0-9, half-band increments.' },
        grammaticalRangeAccuracy: { type: 'NUMBER', description: 'Band 0-9, half-band increments.' },
        pronunciation: { type: 'NUMBER', description: 'Band 0-9, half-band increments.' },
        overall: { type: 'NUMBER', description: 'Average of the four criteria, rounded to the nearest 0.5.' },
      },
      required: ['fluencyCoherence', 'lexicalResource', 'grammaticalRangeAccuracy', 'pronunciation', 'overall'],
    },
    feedbackSummary: {
      type: 'STRING',
      description: '2-3 encouraging, specific sentences explaining the overall band.',
    },
    corrections: {
      type: 'ARRAY',
      description: 'Concrete grammar/vocabulary fixes for phrases the candidate actually said. Empty array if none found.',
      items: {
        type: 'OBJECT',
        properties: {
          original: { type: 'STRING', description: 'The exact phrase the candidate said.' },
          corrected: { type: 'STRING', description: 'The corrected version.' },
          explanation: { type: 'STRING', description: 'One plain-language sentence explaining the fix.' },
          type: { type: 'STRING', enum: ['grammar', 'vocabulary', 'word_choice', 'other'] },
        },
        required: ['original', 'corrected', 'explanation'],
      },
    },
    modelAnswer: {
      type: 'STRING',
      description: 'A natural-sounding Band 8-9 spoken answer to the same question.',
    },
  },
  required: ['transcription', 'bandScores', 'feedbackSummary', 'corrections', 'modelAnswer'],
} as const;

function targetLengthForPart(part: IeltsPart): string {
  switch (part) {
    case 1:
      return 'about 35-55 words - short, direct, conversational, like a real Part 1 answer';
    case 2:
      return 'about 200-250 words - a fluent 1.5-2 minute monologue that naturally covers every cue-card point';
    case 3:
      return 'about 90-130 words - a developed opinion with reasons and an example, discussion-register';
  }
}

function buildPrompt(part: IeltsPart, questionText: string, cueCardPoints?: string[] | null): string {
  const cueCardBlock =
    part === 2 && cueCardPoints?.length
      ? `\nCue card - the candidate was told "You should say:"\n${cueCardPoints.map((p) => `- ${p}`).join('\n')}\n`
      : '';

  return `You are a certified IELTS Speaking examiner scoring a candidate's real spoken response to an official IELTS Speaking Part ${part} question. The attached audio is the candidate's actual answer - listen to it carefully before writing anything.

QUESTION: "${questionText}"
${cueCardBlock}
Do the following, in order:

1. TRANSCRIBE exactly what the candidate said, verbatim - including hesitations, filler words ("um", "uh"), repetitions, and false starts if audible. Do not clean it up; fluency scoring depends on the transcription being real, not idealized. If the recording is silent, empty, or contains no intelligible English speech, set every band score to 0, explain that clearly in feedbackSummary, leave corrections empty, and still provide a model answer.
2. SCORE the response 0-9 (whole or half bands only, e.g. 5.0, 5.5, 6.0, matching real IELTS band descriptors) against the four official criteria: Fluency and Coherence, Lexical Resource, Grammatical Range and Accuracy, and Pronunciation. For Pronunciation, judge only what's audible (clarity, word/sentence stress, intonation, individual sounds) - note in feedbackSummary if the audio quality limited this judgment.
3. Compute "overall" as the mean of the four criteria, rounded to the nearest 0.5, exactly as real IELTS scoring does.
4. Write feedbackSummary: 2-3 sentences, specific and encouraging, referencing something the candidate actually did well and the single highest-impact thing to improve.
5. List corrections: only concrete grammar or vocabulary errors the candidate actually produced, quoting their exact words. Never invent an error that isn't in the transcription. Return an empty array if the response was error-free.
6. Write modelAnswer: a Band 8-9 answer to this exact question, natural and idiomatic as if spoken aloud (not a written essay), ${targetLengthForPart(part)}.

Respond with only the JSON object matching the provided schema - no markdown, no commentary before or after it.`;
}

export async function analyzeSpeakingAudio(params: AnalyzeParams): Promise<SpeakingAnalysis> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error('GEMINI_API_KEY environment variable is not set.');

  const prompt = buildPrompt(params.part, params.questionText, params.cueCardPoints);

  const response = await fetch(GEMINI_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-goog-api-key': apiKey,
    },
    body: JSON.stringify({
      contents: [
        {
          role: 'user',
          parts: [
            { inline_data: { mime_type: params.mimeType, data: params.base64Audio } },
            { text: prompt },
          ],
        },
      ],
      generationConfig: {
        temperature: 0.4,
        responseMimeType: 'application/json',
        responseSchema: RESPONSE_SCHEMA,
      },
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text().catch(() => '');
    throw new Error(`Gemini API request failed (${response.status}): ${errorBody.slice(0, 500)}`);
  }

  const data = await response.json();

  const blockReason = data?.promptFeedback?.blockReason;
  if (blockReason) {
    throw new Error(`Gemini blocked this request: ${blockReason}`);
  }

  const text: string | undefined = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) {
    throw new Error('Gemini returned an empty response.');
  }

  let parsed: SpeakingAnalysis;
  try {
    parsed = JSON.parse(text);
  } catch {
    throw new Error('Gemini returned a response that was not valid JSON.');
  }

  return parsed;
}
