// Every brand-specific value lives here and nowhere else, driven by env vars.
// Renaming the product, changing the price, or swapping payment numbers is a
// .env change - never a code change.

export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || 'SpeakBand';

export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

export const FREE_TRIES_LIMIT = Number(process.env.NEXT_PUBLIC_FREE_TRIES_LIMIT ?? 2);

export const PREMIUM_PRICE_BDT = Number(process.env.NEXT_PUBLIC_PREMIUM_PRICE_BDT ?? 200);

export const BKASH_NUMBER = process.env.NEXT_PUBLIC_BKASH_NUMBER || '01XXXXXXXXX';
export const BKASH_TYPE = process.env.NEXT_PUBLIC_BKASH_TYPE || 'Personal (Send Money)';

export const NAGAD_NUMBER = process.env.NEXT_PUBLIC_NAGAD_NUMBER || '01XXXXXXXXX';
export const NAGAD_TYPE = process.env.NEXT_PUBLIC_NAGAD_TYPE || 'Personal (Send Money)';

export const IELTS_PART_LABELS: Record<1 | 2 | 3, string> = {
  1: 'Part 1 — Introduction & Interview',
  2: 'Part 2 — Cue Card',
  3: 'Part 3 — Two-Way Discussion',
};

export const IELTS_PART_DESCRIPTIONS: Record<1 | 2 | 3, string> = {
  1: 'Short, everyday questions about you: home, work, study, and familiar topics.',
  2: 'You get a topic card, 1 minute to prepare, then speak for up to 2 minutes.',
  3: 'A deeper discussion connected to Part 2, exploring abstract ideas and opinions.',
};

export const BAND_CRITERIA_LABELS = {
  fluencyCoherence: 'Fluency & Coherence',
  lexicalResource: 'Lexical Resource',
  grammaticalRangeAccuracy: 'Grammatical Range & Accuracy',
  pronunciation: 'Pronunciation',
} as const;
