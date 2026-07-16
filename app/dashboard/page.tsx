import Link from 'next/link';
import { redirect } from 'next/navigation';
import { ArrowRight, Lock, Target, TrendingUp, Award, Zap } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { Card, Badge, PageHeading, MetricCard } from '@/components/ui/primitives';
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
    .limit(10);

  const isPremium = profile?.is_premium ?? false;
  const triesUsed = profile?.free_tries_used ?? 0;
  const triesLimit = profile?.free_tries_limit ?? 2;
  const isBlocked = !isPremium && triesUsed >= triesLimit;

  // Compute stats from existing data
  const attempts = (recentAttempts as Attempt[]) ?? [];
  const completedAttempts = attempts.filter((a) => a.status === 'completed' && a.band_overall != null);
  const totalAttempts = completedAttempts.length;
  const averageBand =
    totalAttempts > 0
      ? completedAttempts.reduce((sum, a) => sum + (a.band_overall ?? 0), 0) / totalAttempts
      : null;
  const bestScore =
    totalAttempts > 0
      ? Math.max(...completedAttempts.map((a) => a.band_overall ?? 0))
      : null;

  return (
    <div className="space-y-10">
      <PageHeading
        eyebrow="Dashboard"
        title={`Welcome back${profile?.full_name ? `, ${profile.full_name.split(' ')[0]}` : ''}`}
        description="Pick a part to practice, or review a past attempt below."
      />

      {/* Stats row */}
      <div className="animate-fade-in-up grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          label="Remaining Attempts"
          value={isPremium ? '∞' : `${Math.max(0, triesLimit - triesUsed)}`}
          icon={<Target className="h-5 w-5" />}
          accent={isBlocked ? 'flag' : 'brand'}
        />
        <MetricCard
          label="Total Practices"
          value={totalAttempts}
          icon={<Zap className="h-5 w-5" />}
          accent="brand"
        />
        <MetricCard
          label="Average Band"
          value={averageBand != null ? formatBand(averageBand) : '—'}
          icon={<TrendingUp className="h-5 w-5" />}
          accent="good"
        />
        <MetricCard
          label="Best Score"
          value={bestScore != null ? formatBand(bestScore) : '—'}
          icon={<Award className="h-5 w-5" />}
          accent="gold"
        />
      </div>

      {isBlocked && (
        <Card className="animate-fade-in-up animate-delay-1 border-flag/20 bg-flag-soft/50">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-flag/10">
              <Lock className="h-5 w-5 text-flag" aria-hidden />
            </div>
            <div>
              <p className="font-display font-semibold text-flag">You&apos;ve used both free tries</p>
              <p className="mt-1 text-sm text-ink-soft">
                Unlock unlimited checks with a one-time bKash or Nagad payment — usually approved
                within a few hours.
              </p>
              <Link
                href="/premium"
                className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-flag transition-colors hover:underline"
              >
                Go to payment page <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </Card>
      )}

      <section className="animate-fade-in-up animate-delay-2">
        <h2 className="text-xl font-bold text-ink">Choose a part to practice</h2>
        <div className="mt-4 grid gap-5 sm:grid-cols-3">
          {([1, 2, 3] as const).map((part) => {
            const partIcons = [Zap, Award, TrendingUp];
            const PartIcon = partIcons[part - 1];
            return (
              <Link
                key={part}
                href={isBlocked ? '/premium' : `/practice/${part}`}
                className="group block"
              >
                <Card className="h-full card-hover">
                  <div className="flex items-start justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand to-brand-dark text-white shadow-sm">
                      <PartIcon className="h-5 w-5" aria-hidden />
                    </div>
                    {isBlocked && <Lock className="h-4 w-4 text-flag" aria-hidden />}
                  </div>
                  <p className="mt-3 font-display text-sm font-semibold text-ink">
                    {IELTS_PART_LABELS[part]}
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{IELTS_PART_DESCRIPTIONS[part]}</p>
                  <p
                    className={cn(
                      'mt-4 inline-flex items-center gap-1 text-sm font-semibold transition-colors',
                      isBlocked ? 'text-ink-soft' : 'text-brand group-hover:gap-2'
                    )}
                  >
                    {isBlocked ? 'Unlock to start' : 'Start practicing'}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </p>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="animate-fade-in-up animate-delay-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-ink">Recent attempts</h2>
          {!isPremium && (
            <Badge variant="brand">
              {triesUsed}/{triesLimit} free tries used
            </Badge>
          )}
        </div>

        {!recentAttempts || recentAttempts.length === 0 ? (
          <Card className="mt-4 py-10 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-soft">
              <Target className="h-7 w-7 text-brand" aria-hidden />
            </div>
            <p className="mt-4 font-display text-base font-semibold text-ink">No attempts yet</p>
            <p className="mt-1 text-sm text-ink-soft">
              Pick a part above to record your first answer.
            </p>
          </Card>
        ) : (
          <div className="mt-4 space-y-3">
            {(recentAttempts as Attempt[]).map((attempt) => (
              <Link key={attempt.id} href={`/results/${attempt.id}`} className="block">
                <Card className="flex items-center justify-between gap-4 card-hover">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <Badge variant="brand" className="text-[10px]">Part {attempt.part}</Badge>
                      <span className="text-xs text-ink-muted">{formatDate(attempt.created_at)}</span>
                    </div>
                    <p className="mt-1.5 truncate text-sm font-medium text-ink">{attempt.question_text}</p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="font-mono text-2xl font-bold text-brand">
                      {formatBand(attempt.band_overall)}
                    </p>
                    <p className="text-[10px] font-medium text-ink-muted">Overall</p>
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
