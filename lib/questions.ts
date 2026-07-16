import type { SupabaseClient } from '@supabase/supabase-js';
import type { IeltsPart, Question } from '@/types/database';

/**
 * Fetches every seeded question for a part and returns one at random.
 * Works with either the browser or server Supabase client since `questions`
 * has a public-read RLS policy.
 */
export async function getRandomQuestion(
  supabase: SupabaseClient,
  part: IeltsPart
): Promise<Question | null> {
  const { data, error } = await supabase.from('questions').select('*').eq('part', part);

  if (error || !data || data.length === 0) {
    return null;
  }

  const index = Math.floor(Math.random() * data.length);
  return data[index] as Question;
}
