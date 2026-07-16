// Hand-written types mirroring supabase/migrations/0001_init.sql.
// Field names intentionally match the DB's snake_case columns so rows can be
// passed straight from a Supabase query into these types with no mapping layer.

export type IeltsPart = 1 | 2 | 3;

export interface Profile {
  id: string;
  email: string | null;
  full_name: string | null;
  avatar_url: string | null;
  is_premium: boolean;
  is_admin: boolean;
  free_tries_used: number;
  free_tries_limit: number;
  created_at: string;
  updated_at: string;
}

export interface Question {
  id: string;
  part: IeltsPart;
  topic: string;
  question_text: string;
  cue_card_points: string[] | null;
  prep_seconds: number;
  min_speak_seconds: number;
  max_speak_seconds: number;
  created_at: string;
}

export interface Correction {
  original: string;
  corrected: string;
  explanation: string;
  type?: 'grammar' | 'vocabulary' | 'word_choice' | 'other';
}

export interface BandScores {
  fluencyCoherence: number;
  lexicalResource: number;
  grammaticalRangeAccuracy: number;
  pronunciation: number;
  overall: number;
}

export interface Attempt {
  id: string;
  user_id: string;
  question_id: string | null;
  part: IeltsPart;
  question_text: string;
  cue_card_points: string[] | null;
  audio_path: string;
  audio_duration_seconds: number | null;
  transcription: string | null;
  band_fluency_coherence: number | null;
  band_lexical_resource: number | null;
  band_grammatical_range: number | null;
  band_pronunciation: number | null;
  band_overall: number | null;
  feedback_summary: string | null;
  corrections: Correction[];
  model_answer: string | null;
  status: 'completed' | 'failed';
  error_message: string | null;
  created_at: string;
}

export type PaymentMethod = 'bkash' | 'nagad';
export type PaymentStatus = 'pending' | 'approved' | 'rejected';

export interface PaymentRequest {
  id: string;
  user_id: string;
  method: PaymentMethod;
  sender_name: string;
  sender_phone: string;
  txn_id: string;
  amount_bdt: number;
  status: PaymentStatus;
  admin_note: string | null;
  reviewed_at: string | null;
  created_at: string;
  // Joined in from profiles by the admin requests endpoint, not a DB column.
  profile?: Pick<Profile, 'email' | 'full_name'> | null;
}
