import { notFound, redirect } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { BandScoreCard } from '@/components/BandScoreCard';
import { TranscriptWithFixes } from '@/components/TranscriptWithFixes';
import { ModelAnswerCard } from '@/components/ModelAnswerCard';
import { PageHeading } from '@/components/ui/primitives';
import type { Attempt } from '@/types/database';

export default async function ResultsPage({
  params,
}: {
  params: Promise<{ attemptId: string }>;
}) {
  const { attemptId } = await params;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: attempt, error } = await supabase
    .from('attempts')
    .select('*')
    .eq('id', attemptId)
    .single();

  // RLS already scopes this query to the caller's own rows, so a mismatched
  // or missing attempt looks identical from the outside - both 404.
  if (error || !attempt || attempt.user_id !== user.id) notFound();

  const typedAttempt = attempt as Attempt;

  return (
    <div className="space-y-6">
      <PageHeading eyebrow={`Part ${typedAttempt.part} result`} title={typedAttempt.question_text} />

      <BandScoreCard attempt={typedAttempt} />
      <TranscriptWithFixes
        transcription={typedAttempt.transcription}
        corrections={typedAttempt.corrections}
      />
      <ModelAnswerCard modelAnswer={typedAttempt.model_answer} />

      <Link
        href="/dashboard"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden /> Back to dashboard
      </Link>
    </div>
  );
}
