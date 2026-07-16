import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createClient } from '@/lib/supabase/server';
import { analyzeSpeakingAudio } from '@/lib/gemini';

export const runtime = 'nodejs';
// Hint for platforms that support configurable function durations. Netlify's
// own plan-level timeout (10s free / 26s paid) still applies regardless -
// see the note in netlify.toml if this route starts timing out under load.
export const maxDuration = 60;

const analyzeRequestSchema = z.object({
  storagePath: z.string().min(1),
  part: z.union([z.literal(1), z.literal(2), z.literal(3)]),
  questionId: z.string().uuid().nullable().optional(),
  questionText: z.string().min(1).max(500),
  cueCardPoints: z.array(z.string()).nullable().optional(),
  audioDurationSeconds: z.number().nonnegative().optional(),
});

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 });
  }

  const parsed = analyzeRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'invalid_request', details: parsed.error.flatten() },
      { status: 400 }
    );
  }
  const { storagePath, part, questionId, questionText, cueCardPoints, audioDurationSeconds } =
    parsed.data;

  // Never trust the client's claimed path - it must live inside this user's
  // own storage folder (also enforced by the storage RLS policy, but we
  // check early here to fail fast with a clear error).
  if (!storagePath.startsWith(`${user.id}/`)) {
    return NextResponse.json({ error: 'invalid_storage_path' }, { status: 400 });
  }

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (profileError || !profile) {
    return NextResponse.json({ error: 'profile_not_found' }, { status: 404 });
  }

  // The one rule that actually matters: this check happens server-side,
  // against the database, every single time - never trust a client-sent
  // "tries remaining" value.
  if (!profile.is_premium && profile.free_tries_used >= profile.free_tries_limit) {
    return NextResponse.json({ error: 'limit_reached' }, { status: 403 });
  }

  const { data: audioBlob, error: downloadError } = await supabase.storage
    .from('audio-answers')
    .download(storagePath);

  if (downloadError || !audioBlob) {
    return NextResponse.json({ error: 'audio_not_found' }, { status: 404 });
  }

  const base64Audio = Buffer.from(await audioBlob.arrayBuffer()).toString('base64');
  const mimeType = audioBlob.type || 'audio/wav';

  let analysis;
  try {
    analysis = await analyzeSpeakingAudio({
      base64Audio,
      mimeType,
      part,
      questionText,
      cueCardPoints,
    });
  } catch (err) {
    console.error('[api/analyze] Gemini call failed:', err);
    return NextResponse.json({ error: 'analysis_failed' }, { status: 502 });
  }

  const { data: attempt, error: insertError } = await supabase
    .from('attempts')
    .insert({
      user_id: user.id,
      question_id: questionId ?? null,
      part,
      question_text: questionText,
      cue_card_points: cueCardPoints ?? null,
      audio_path: storagePath,
      audio_duration_seconds: audioDurationSeconds ?? null,
      transcription: analysis.transcription,
      band_fluency_coherence: analysis.bandScores.fluencyCoherence,
      band_lexical_resource: analysis.bandScores.lexicalResource,
      band_grammatical_range: analysis.bandScores.grammaticalRangeAccuracy,
      band_pronunciation: analysis.bandScores.pronunciation,
      band_overall: analysis.bandScores.overall,
      feedback_summary: analysis.feedbackSummary,
      corrections: analysis.corrections,
      model_answer: analysis.modelAnswer,
      status: 'completed',
    })
    .select()
    .single();

  if (insertError || !attempt) {
    console.error('[api/analyze] failed to save attempt:', insertError);
    return NextResponse.json({ error: 'save_failed' }, { status: 500 });
  }

  // Only spend a free try on success, and only if they aren't premium.
  // Uses the increment_free_tries RPC (a single atomic UPDATE) rather than a
  // read-then-write from this handler, so two concurrent submissions can't
  // both slip through on the same trial count.
  if (!profile.is_premium) {
    const { error: incrementError } = await supabase.rpc('increment_free_tries', {
      p_user_id: user.id,
    });
    if (incrementError) {
      console.error('[api/analyze] failed to increment free tries:', incrementError);
    }
  }

  return NextResponse.json({ attemptId: attempt.id });
}
