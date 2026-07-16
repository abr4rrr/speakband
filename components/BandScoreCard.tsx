import { Card } from '@/components/ui/primitives';
import { BAND_CRITERIA_LABELS } from '@/lib/constants';
import { formatBand } from '@/lib/utils';
import type { Attempt } from '@/types/database';

const CRITERIA_ORDER = [
  'fluencyCoherence',
  'lexicalResource',
  'grammaticalRangeAccuracy',
  'pronunciation',
] as const;

export function BandScoreCard({ attempt }: { attempt: Attempt }) {
  const values: Record<(typeof CRITERIA_ORDER)[number], number | null> = {
    fluencyCoherence: attempt.band_fluency_coherence,
    lexicalResource: attempt.band_lexical_resource,
    grammaticalRangeAccuracy: attempt.band_grammatical_range,
    pronunciation: attempt.band_pronunciation,
  };

  return (
    <Card>
      <div className="flex flex-col items-center gap-3 border-b border-border pb-6 text-center sm:flex-row sm:items-end sm:justify-between sm:text-left">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-brand">Overall band</p>
          <p className="font-mono text-6xl font-semibold leading-none text-brand">
            {formatBand(attempt.band_overall)}
          </p>
        </div>
        {attempt.feedback_summary && (
          <p className="max-w-xs text-sm text-ink-soft">{attempt.feedback_summary}</p>
        )}
      </div>

      <div className="mt-6 space-y-5">
        {CRITERIA_ORDER.map((key) => (
          <div key={key}>
            <div className="mb-1.5 flex items-center justify-between text-sm">
              <span className="font-medium text-ink">{BAND_CRITERIA_LABELS[key]}</span>
              <span className="font-mono font-semibold text-ink">{formatBand(values[key])}</span>
            </div>
            <BandRuler value={values[key]} />
          </div>
        ))}
      </div>
    </Card>
  );
}

/** Compact 0-9 ruler with a marker — the same visual language as the homepage hero. */
function BandRuler({ value }: { value: number | null }) {
  const clamped = Math.max(0, Math.min(9, value ?? 0));
  const percent = (clamped / 9) * 100;

  return (
    <div className="relative h-2 w-full rounded-full bg-black/5" aria-hidden>
      <div
        className="absolute inset-y-0 left-0 rounded-full bg-brand/70"
        style={{ width: `${percent}%` }}
      />
      {[1, 2, 3, 4, 5, 6, 7, 8].map((tick) => (
        <span
          key={tick}
          className="absolute top-0 h-2 w-px bg-white/70"
          style={{ left: `${(tick / 9) * 100}%` }}
        />
      ))}
      <div
        className="absolute -top-1 h-4 w-1 rounded-full bg-gold shadow-sm"
        style={{ left: `calc(${percent}% - 2px)` }}
      />
    </div>
  );
}
