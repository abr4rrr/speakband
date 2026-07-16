import Link from 'next/link';
import { Mic, FileText, SpellCheck2, Sparkles } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { Card } from '@/components/ui/primitives';
import {
  APP_NAME,
  FREE_TRIES_LIMIT,
  PREMIUM_PRICE_BDT,
  IELTS_PART_LABELS,
  IELTS_PART_DESCRIPTIONS,
} from '@/lib/constants';

export default async function HomePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="space-y-24">
      {/* Hero */}
      <section className="grid items-center gap-12 pt-6 lg:grid-cols-2">
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-brand">
            IELTS Speaking, scored honestly
          </p>
          <h1 className="text-4xl font-bold leading-[1.05] text-ink sm:text-5xl">
            Know your band <span className="text-brand">before</span> test day.
          </h1>
          <p className="mt-5 max-w-md text-lg text-ink-soft">
            Record an answer to a real Part 1, 2, or 3 question. {APP_NAME} transcribes it,
            scores it against the four official IELTS criteria, and hands you a Band 8-9 model
            answer to learn from — in under a minute.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href={user ? '/dashboard' : '/login'}
              className="inline-flex items-center justify-center rounded-full bg-brand px-6 py-3 text-base font-medium text-white transition-colors hover:bg-brand-dark"
            >
              {user ? 'Go to dashboard' : 'Start your first free check'}
            </Link>
            <p className="text-sm text-ink-soft">
              {FREE_TRIES_LIMIT} free tries · then {PREMIUM_PRICE_BDT}৳ one-time via bKash/Nagad
            </p>
          </div>
        </div>

        <BandRulerHero />
      </section>

      {/* Three parts */}
      <section>
        <h2 className="text-2xl font-bold text-ink">Every part of the real test</h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-3">
          {([1, 2, 3] as const).map((part) => (
            <Card key={part}>
              <p className="font-display text-sm font-semibold text-brand">
                {IELTS_PART_LABELS[part]}
              </p>
              <p className="mt-2 text-sm text-ink-soft">{IELTS_PART_DESCRIPTIONS[part]}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section>
        <h2 className="text-2xl font-bold text-ink">How it works</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-4">
          {[
            { icon: Mic, title: 'Record', body: 'Answer out loud, right in your browser.' },
            { icon: FileText, title: 'Transcribe', body: 'Get an exact, word-for-word transcript.' },
            { icon: SpellCheck2, title: 'Score', body: 'Overall band plus all four criteria.' },
            { icon: Sparkles, title: 'Learn', body: 'See a Band 8-9 model answer, side by side.' },
          ].map((step, i) => (
            <div key={step.title}>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-soft text-brand">
                <step.icon className="h-5 w-5" aria-hidden />
              </div>
              <p className="mt-3 font-display text-sm font-semibold text-ink">
                {i + 1}. {step.title}
              </p>
              <p className="mt-1 text-sm text-ink-soft">{step.body}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

/** Signature hero visual: a literal 0-9 band ruler with a marker on the score. */
function BandRulerHero() {
  const width = 420;
  const height = 320;
  const rulerY = 250;
  const rulerLeft = 30;
  const rulerRight = 390;
  const step = (rulerRight - rulerLeft) / 9;
  const markerBand = 7.5;
  const markerX = rulerLeft + markerBand * step;

  return (
    <div className="relative">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full max-w-md"
        role="img"
        aria-label="Illustration of an IELTS band score ruler, marked at band 7.5"
      >
        <rect x="0" y="0" width={width} height={height} rx="20" fill="var(--color-surface)" />
        <rect x="0.5" y="0.5" width={width - 1} height={height - 1} rx="20" fill="none" stroke="var(--color-border)" />

        <text x="30" y="46" fontFamily="var(--font-display)" fontSize="15" fontWeight="700" fill="var(--color-ink)">
          Your band
        </text>
        <text x="30" y="100" fontFamily="var(--font-mono)" fontSize="56" fontWeight="600" fill="var(--color-brand)">
          7.5
        </text>
        <text x="150" y="100" fontFamily="var(--font-body)" fontSize="13" fill="var(--color-ink-soft)">
          Good User
        </text>

        {/* ruler line */}
        <line x1={rulerLeft} y1={rulerY} x2={rulerRight} y2={rulerY} stroke="var(--color-border)" strokeWidth="2" />
        {Array.from({ length: 10 }).map((_, band) => {
          const x = rulerLeft + band * step;
          const isMajor = band % 1 === 0;
          return (
            <g key={band}>
              <line
                x1={x}
                y1={rulerY - (isMajor ? 12 : 7)}
                x2={x}
                y2={rulerY}
                stroke="var(--color-ink-soft)"
                strokeOpacity="0.4"
                strokeWidth="1.5"
              />
              <text
                x={x}
                y={rulerY + 22}
                fontFamily="var(--font-mono)"
                fontSize="11"
                textAnchor="middle"
                fill="var(--color-ink-soft)"
              >
                {band}
              </text>
            </g>
          );
        })}

        {/* marker */}
        <circle cx={markerX} cy={rulerY} r="7" fill="var(--color-gold)" />
        <line x1={markerX} y1={rulerY - 34} x2={markerX} y2={rulerY - 8} stroke="var(--color-gold)" strokeWidth="2" />

        <text x="30" y="160" fontFamily="var(--font-body)" fontSize="12" fill="var(--color-ink-soft)">
          <tspan x="30" dy="0">Fluency &amp; Coherence · Lexical Resource</tspan>
          <tspan x="30" dy="18">Grammatical Range &amp; Accuracy · Pronunciation</tspan>
        </text>
      </svg>
    </div>
  );
}
