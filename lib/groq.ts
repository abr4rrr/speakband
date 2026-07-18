import type { IeltsPart, BandScores, Correction } from '@/types/database';

const GROQ_BASE_URL = 'https://api.groq.com/openai/v1';
const GROQ_CHAT_MODEL = process.env.GROQ_CHAT_MODEL || 'llama-3.3-70b-versatile';
const GROQ_TRANSCRIPTION_MODEL = process.env.GROQ_TRANSCRIPTION_MODEL || 'whisper-large-v3-turbo';
const MAX_GROQ_API_KEYS = 5;

// -----------------------------------------------------------------------------
// Multi-key failover
//
// Isolated to credential resolution + the request wrapper below. It does not
// touch prompts, the response schema, JSON parsing, or anything in
// analyzeSpeakingAudio's public contract - it only changes which key a given
// HTTP call uses and, on a rate-limit/quota failure, retries the same call
// with the next key before giving up.
// -----------------------------------------------------------------------------

/** Thrown for any non-2xx Groq HTTP response, carrying the status code so the
 *  failover wrapper can distinguish "rate limited, try the next key" from
 *  "this request is bad, don't retry it". */
class GroqApiError extends Error {
  readonly status: number;
  readonly body: string;

  constructor(status: number, body: string, message: string) {
    super(message);
    this.name = 'GroqApiError';
    this.status = status;
    this.body = body;
  }
}

/**
 * Resolves the active pool of Groq API keys, in the order they should be
 * tried:
 *   1. GROQ_API_KEY_1 .. GROQ_API_KEY_5, in that sequence (any gaps/unset
 *      slots are skipped).
 *   2. If none of the numbered keys are set, fall back to the single legacy
 *      GROQ_API_KEY, preserving existing single-key deployments unchanged.
 */
function resolveGroqApiKeys(): string[] {
  const numbered: string[] = [];
  for (let i = 1; i <= MAX_GROQ_API_KEYS; i++) {
    const key = process.env[`GROQ_API_KEY_${i}`];
    if (key && key.trim()) numbered.push(key.trim());
  }
  if (numbered.length > 0) return numbered;

  const legacy = process.env.GROQ_API_KEY;
  return legacy && legacy.trim() ? [legacy.trim()] : [];
}

/** True only for infrastructure/rate-limit style failures that warrant
 *  rotating to the next key: HTTP 429, or a message/body mentioning quota or
 *  credit exhaustion. Everything else (bad requests, malformed prompts, bad
 *  audio buffers, JSON parsing bugs, auth errors, etc.) returns false so the
 *  caller fails immediately instead of retrying. */
function isFailoverEligible(error: unknown): boolean {
  if (!(error instanceof GroqApiError)) return false;
  if (error.status === 429) return true;
  const haystack = `${error.message} ${error.body}`.toLowerCase();
  return haystack.includes('quota') || haystack.includes('credits');
}

/**
 * Sequential retry helper: runs `execute` with the first key in the pool
 * (index 0), and on a rate-limit/quota-style failure retries with the next
 * key in order. Returns as soon as any attempt succeeds. Any non-failover
 * error is thrown immediately with no retry. If every key in the pool is
 * exhausted, the last error is thrown up to the caller.
 */
async function withGroqFailover<T>(execute: (apiKey: string) => Promise<T>): Promise<T> {
  const keys = resolveGroqApiKeys();
  if (keys.length === 0) {
    throw new Error(
      'No Groq API key is configured. Set GROQ_API_KEY, or GROQ_API_KEY_1 through GROQ_API_KEY_5.'
    );
  }

  let lastError: unknown;
  for (const apiKey of keys) {
    try {
      return await execute(apiKey);
    } catch (error) {
      lastError = error;
      if (!isFailoverEligible(error)) throw error;
      // Otherwise: rate limit / quota / credits - fall through and try the next key.
    }
  }
  throw lastError;
}

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
      ? `\nCue card points:\n${cueCardPoints.map((p) => `- ${p}`).join('\n')}\n`
      : '';

  return `IELTS Speaking examiner. Score this Part ${part} response.

Q: "${questionText}"${cueCardBlock}
TRANSCRIPT: ${transcription || '[Empty/unintelligible]'}

Instructions:
- Keep transcription verbatim. If empty, all bands=0, explain in feedbackSummary, still provide modelAnswer.
- Score 0-9 (half-band increments) on: Fluency & Coherence, Lexical Resource, Grammatical Range & Accuracy, Pronunciation. Estimate Pronunciation conservatively from transcript signals (repetitions, missing words).
- overall = mean of four criteria, rounded to nearest 0.5.
- feedbackSummary: 2 sentences — one strength, one improvement area.
- corrections: only real errors from transcript with exact quotes. Empty array if none.
- modelAnswer: Band 8-9 spoken answer, ${targetLengthForPart(part)}.

Return JSON matching this schema:
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
    throw new GroqApiError(
      response.status,
      errorBody,
      `Groq transcription request failed (${response.status}): ${errorBody.slice(0, 500)}`
    );
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
    throw new GroqApiError(
      response.status,
      errorBody,
      `Groq chat request failed (${response.status}): ${errorBody.slice(0, 500)}`
    );
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
  const transcription = await withGroqFailover((apiKey) => transcribeAudio(params, apiKey));
  return withGroqFailover((apiKey) => scoreTranscription(params, transcription, apiKey));
}
