import { Card, ProgressRing } from '@/components/ui/primitives';
import { BAND_CRITERIA_LABELS } from '@/lib/constants';
import { formatBand } from '@/lib/utils';
import type { Attempt } from '@/types/database';

const CRITERIA_ORDER = [
  'fluencyCoherence',
  'lexicalResource',
  'grammaticalRangeAccuracy',
  'pronunciation',
] as const;

function bandColor(value: number | null): string {
  const v = value ?? 0;
  if (v >= 7) return 'var(--color-good)';
  if (v >= 5.5) return 'var(--color-brand)';
  if (v >= 4) return 'var(--color-gold)';
  return 'var(--color-flag)';
}

export function BandScoreCard({ attempt }: { attempt: Attempt }) {
  const values: Record<(typeof CRITERIA_ORDER)[number], number | null> = {
    fluencyCoherence: attempt.band_fluency_coherence,
    lexicalResource: attempt.band_lexical_resource,
    grammaticalRangeAccuracy: attempt.band_grammatical_range,
    pronunciation: attempt.band_pronunciation,
  };

  return (
    <Card>
      <div className="flex flex-col items-center gap-6 border-b border-border pb-6 sm:flex-row sm:items-center">
        {/* Animated circular progress for overall band */}
        <ProgressRing
          value={attempt.band_overall}
          label="Overall Band"
          sublabel="out of 9.0"
          size={150}
          strokeWidth={10}
        />
        {attempt.feedback_summary && (
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold uppercase tracking-widest text-brand mb-2">Feedback</p>
            <p className="text-sm leading-relaxed text-ink-soft">{attempt.feedback_summary}</p>
          </div>
        )}
      </div>

      <div className="mt-6 space-y-5">
        {CRITERIA_ORDER.map((key) => {
          const value = values[key];
          const clamped = Math.max(0, Math.min(9, value ?? 0));
          const percent = (clamped / 9) * 100;
          const color = bandColor(value);

          return (
            <div key={key}>
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="font-medium text-ink">{BAND_CRITERIA_LABELS[key]}</span>
                <span className="font-mono font-bold" style={{ color }}>
                  {formatBand(value)}
                </span>
              </div>
              {/* Animated bar */}
              <div className="relative h-2.5 w-full overflow-hidden rounded-full bg-border-subtle" aria-hidden>
                <div
                  className="absolute inset-y-0 left-0 rounded-full animate-progress-fill"
                  style={{
                    width: `${percent}%`,
                    backgroundColor: color,
                  }}
                />
                {/* Tick marks */}
                {[1, 2, 3, 4, 5, 6, 7, 8].map((tick) => (
                  <span
                    key={tick}
                    className="absolute top-0 h-full w-px bg-white/60"
                    style={{ left: `${(tick / 9) * 100}%` }}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
