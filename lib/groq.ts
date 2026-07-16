import type { IeltsPart, BandScores, Correction } from '@/types/database';

const GROQ_BASE_URL = 'https://api.groq.com/openai/v1';
const GROQ_CHAT_MODEL = process.env.GROQ_CHAT_MODEL || 'llama-3.3-70b-versatile';
const GROQ_TRANSCRIPTION_MODEL = process.env.GROQ_TRANSCRIPTION_MODEL || 'whisper-large-v3-turbo';

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

const RESPONSE_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  properties: {
    transcription: {
      type: 'string',
      description: 'Verbatim transcription of everything the candidate said, including fillers and false starts.',
    },
    bandScores: {
      type: 'object',
      additionalProperties: false,
      properties: {
        fluencyCoherence: { type: 'number', description: 'Band 0-9, half-band increments.' },
        lexicalResource: { type: 'number', description: 'Band 0-9, half-band increments.' },
        grammaticalRangeAccuracy: { type: 'number', description: 'Band 0-9, half-band increments.' },
        pronunciation: { type: 'number', description: 'Band 0-9, half-band increments.' },
        overall: { type: 'number', description: 'Average of the four criteria, rounded to the nearest 0.5.' },
      },
      required: ['fluencyCoherence', 'lexicalResource', 'grammaticalRangeAccuracy', 'pronunciation', 'overall'],
    },
    feedbackSummary: {
      type: 'string',
      description: '2-3 encouraging, specific sentences explaining the overall band.',
    },
    corrections: {
      type: 'array',
      description: 'Concrete grammar/vocabulary fixes for phrases the candidate actually said. Empty array if none found.',
      items: {
        type: 'object',
        additionalProperties: false,
        properties: {
          original: { type: 'string', description: 'The exact phrase the candidate said.' },
          corrected: { type: 'string', description: 'The corrected version.' },
          explanation: { type: 'string', description: 'One plain-language sentence explaining the fix.' },
          type: { type: 'string', enum: ['grammar', 'vocabulary', 'word_choice', 'other'] },
        },
        required: ['original', 'corrected', 'explanation', 'type'],
      },
    },
    modelAnswer: {
      type: 'string',
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

function buildScoringPrompt(part: IeltsPart, questionText: string, transcription: string, cueCardPoints?: string[] | null): string {
  const cueCardBlock =
    part === 2 && cueCardPoints?.length
      ? `\nCue card - the candidate was told "You should say:"\n${cueCardPoints.map((p) => `- ${p}`).join('\n')}\n`
      : '';

  return `You are a certified IELTS Speaking examiner scoring a candidate's spoken response to an official IELTS Speaking Part ${part} question.

QUESTION: "${questionText}"
${cueCardBlock}
TRANSCRIPTION:
${transcription || '[No intelligible English speech was transcribed.]'}

Do the following, in order:

1. Preserve transcription exactly as provided. If the transcription is empty or contains no intelligible English speech, set every band score to 0, explain that clearly in feedbackSummary, leave corrections empty, and still provide a model answer.
2. SCORE the response 0-9 (whole or half bands only, e.g. 5.0, 5.5, 6.0) against the four official criteria: Fluency and Coherence, Lexical Resource, Grammatical Range and Accuracy, and Pronunciation. Since you only receive the transcript after Groq Whisper transcription, estimate Pronunciation conservatively from transcription confidence signals such as missing words, repetitions, and unclear segments, and mention this limitation in feedbackSummary when relevant.
3. Compute "overall" as the mean of the four criteria, rounded to the nearest 0.5.
4. Write feedbackSummary: 2-3 sentences, specific and encouraging, referencing something the candidate actually did well and the single highest-impact thing to improve.
5. List corrections: only concrete grammar or vocabulary errors the candidate actually produced, quoting their exact words. Never invent an error that isn't in the transcription. Return an empty array if the response was error-free.
6. Write modelAnswer: a Band 8-9 answer to this exact question, natural and idiomatic as if spoken aloud (not a written essay), ${targetLengthForPart(part)}.

Respond with only the JSON object matching this JSON Schema:
${JSON.stringify(RESPONSE_SCHEMA)}`;
}

function filenameForMimeType(mimeType: string): string {
  if (mimeType.includes('mpeg') || mimeType.includes('mp3')) return 'answer.mp3';
  if (mimeType.includes('webm')) return 'answer.webm';
  if (mimeType.includes('ogg')) return 'answer.ogg';
  if (mimeType.includes('mp4')) return 'answer.mp4';
  return 'answer.wav';
}

function extractJson(text: string): string {
  const trimmed = text.trim();
  if (trimmed.startsWith('{') && trimmed.endsWith('}')) return trimmed;

  const start = trimmed.indexOf('{');
  const end = trimmed.lastIndexOf('}');
  if (start >= 0 && end > start) return trimmed.slice(start, end + 1);

  return trimmed;
}

async function transcribeAudio(params: AnalyzeParams, apiKey: string): Promise<string> {
  const audioBytes = Buffer.from(params.base64Audio, 'base64');
  const formData = new FormData();
  formData.append('model', GROQ_TRANSCRIPTION_MODEL);
  formData.append('file', new Blob([audioBytes], { type: params.mimeType }), filenameForMimeType(params.mimeType));
  formData.append('response_format', 'json');

  const response = await fetch(`${GROQ_BASE_URL}/audio/transcriptions`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const errorBody = await response.text().catch(() => '');
    throw new Error(`Groq transcription request failed (${response.status}): ${errorBody.slice(0, 500)}`);
  }

  const data = await response.json();
  if (typeof data?.text !== 'string') {
    throw new Error('Groq transcription returned an empty response.');
  }

  return data.text.trim();
}

async function scoreTranscription(params: AnalyzeParams, transcription: string, apiKey: string): Promise<SpeakingAnalysis> {
  const prompt = buildScoringPrompt(params.part, params.questionText, transcription, params.cueCardPoints);

  const response = await fetch(`${GROQ_BASE_URL}/chat/completions`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: GROQ_CHAT_MODEL,
      messages: [
        {
          role: 'system',
          content:
            'You are a precise IELTS Speaking examiner. Return valid JSON only, with no markdown or commentary.',
        },
        { role: 'user', content: prompt },
      ],
      temperature: 0.3,
      response_format: { type: 'json_object' },
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text().catch(() => '');
    throw new Error(`Groq chat request failed (${response.status}): ${errorBody.slice(0, 500)}`);
  }

  const data = await response.json();
  const text: string | undefined = data?.choices?.[0]?.message?.content;
  if (!text) {
    throw new Error('Groq chat returned an empty response.');
  }

  let parsed: SpeakingAnalysis;
  try {
    parsed = JSON.parse(extractJson(text));
  } catch {
    throw new Error('Groq chat returned a response that was not valid JSON.');
  }

  return {
    ...parsed,
    transcription,
  };
}

export async function analyzeSpeakingAudio(params: AnalyzeParams): Promise<SpeakingAnalysis> {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) throw new Error('GROQ_API_KEY environment variable is not set.');

  const transcription = await transcribeAudio(params, apiKey);
  return scoreTranscription(params, transcription, apiKey);
}
