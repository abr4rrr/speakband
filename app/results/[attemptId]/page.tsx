import { notFound, redirect } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, RotateCcw } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { BandScoreCard } from '@/components/BandScoreCard';
import { TranscriptWithFixes } from '@/components/TranscriptWithFixes';
import { ModelAnswerCard } from '@/components/ModelAnswerCard';
import { PageHeading, Badge } from '@/components/ui/primitives';
import { formatDate } from '@/lib/utils';
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
      <div className="animate-fade-in-up">
        <PageHeading eyebrow={`Part ${typedAttempt.part} result`} title={typedAttempt.question_text} />
        <div className="flex items-center gap-3 -mt-4 mb-6">
          <Badge variant="brand">Part {typedAttempt.part}</Badge>
          <span className="text-xs text-ink-muted">{formatDate(typedAttempt.created_at)}</span>
        </div>
      </div>

      <div className="animate-fade-in-up animate-delay-1">
        <BandScoreCard attempt={typedAttempt} />
      </div>

      <div className="animate-fade-in-up animate-delay-2">
        <TranscriptWithFixes
          transcription={typedAttempt.transcription}
          corrections={typedAttempt.corrections}
        />
      </div>

      <div className="animate-fade-in-up animate-delay-3">
        <ModelAnswerCard modelAnswer={typedAttempt.model_answer} />
      </div>

      <div className="animate-fade-in-up animate-delay-4 flex flex-wrap items-center gap-4">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand transition-colors hover:underline"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden /> Back to dashboard
        </Link>
        <Link
          href={`/practice/${typedAttempt.part}`}
          className="inline-flex items-center gap-1.5 rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-brand-dark hover:shadow-md active:scale-[0.98]"
        >
          <RotateCcw className="h-4 w-4" aria-hidden /> Practice Part {typedAttempt.part} again
        </Link>
      </div>
    </div>
  );
}
