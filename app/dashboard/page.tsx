import Link from 'next/link';
import { redirect } from 'next/navigation';
import { ArrowRight, Lock } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { Card, Badge, PageHeading } from '@/components/ui/primitives';
import { IELTS_PART_LABELS, IELTS_PART_DESCRIPTIONS } from '@/lib/constants';
import { cn, formatBand, formatDate } from '@/lib/utils';
import type { Attempt } from '@/types/database';

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  const { data: recentAttempts } = await supabase
    .from('attempts')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(5);

  const isPremium = profile?.is_premium ?? false;
  const triesUsed = profile?.free_tries_used ?? 0;
  const triesLimit = profile?.free_tries_limit ?? 2;
  const isBlocked = !isPremium && triesUsed >= triesLimit;

  return (
    <div className="space-y-10">
      <PageHeading
        eyebrow="Dashboard"
        title={`Welcome back${profile?.full_name ? `, ${profile.full_name.split(' ')[0]}` : ''}`}
        description="Pick a part to practice, or review a past attempt below."
      />

      {isBlocked && (
        <Card className="border-flag/30 bg-flag-soft">
          <p className="font-display font-semibold text-flag">You've used both free tries</p>
          <p className="mt-1 text-sm text-ink-soft">
            Unlock unlimited checks with a one-time bKash or Nagad payment — usually approved
            within a few hours.
          </p>
          <Link
            href="/premium"
            className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-flag hover:underline"
          >
            Go to payment page <ArrowRight className="h-4 w-4" />
          </Link>
        </Card>
      )}

      <section>
        <h2 className="text-xl font-bold text-ink">Choose a part to practice</h2>
        <div className="mt-4 grid gap-5 sm:grid-cols-3">
          {([1, 2, 3] as const).map((part) => (
            <Link
              key={part}
              href={isBlocked ? '/premium' : `/practice/${part}`}
              className="group block"
            >
              <Card className="h-full transition-shadow group-hover:shadow-md">
                <div className="flex items-start justify-between">
                  <p className="font-display text-sm font-semibold text-brand">
                    {IELTS_PART_LABELS[part]}
                  </p>
                  {isBlocked && <Lock className="h-4 w-4 text-flag" aria-hidden />}
                </div>
                <p className="mt-2 text-sm text-ink-soft">{IELTS_PART_DESCRIPTIONS[part]}</p>
                <p
                  className={cn(
                    'mt-4 inline-flex items-center gap-1 text-sm font-semibold',
                    isBlocked ? 'text-ink-soft' : 'text-brand'
                  )}
                >
                  {isBlocked ? 'Unlock to start' : 'Start practicing'}
                  <ArrowRight className="h-4 w-4" />
                </p>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-ink">Recent attempts</h2>
          {!isPremium && (
            <Badge variant="brand">
              {triesUsed}/{triesLimit} free tries used
            </Badge>
          )}
        </div>

        {!recentAttempts || recentAttempts.length === 0 ? (
          <Card className="mt-4 text-center text-sm text-ink-soft">
            No attempts yet — pick a part above to record your first answer.
          </Card>
        ) : (
          <div className="mt-4 space-y-3">
            {(recentAttempts as Attempt[]).map((attempt) => (
              <Link key={attempt.id} href={`/results/${attempt.id}`} className="block">
                <Card className="flex items-center justify-between gap-4 transition-shadow hover:shadow-md">
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-wide text-brand">
                      Part {attempt.part}
                    </p>
                    <p className="truncate text-sm font-medium text-ink">{attempt.question_text}</p>
                    <p className="mt-0.5 text-xs text-ink-soft">{formatDate(attempt.created_at)}</p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="font-mono text-2xl font-semibold text-brand">
                      {formatBand(attempt.band_overall)}
                    </p>
                    <p className="text-xs text-ink-soft">Overall band</p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
