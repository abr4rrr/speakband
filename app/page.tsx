import Link from 'next/link';
import Image from 'next/image';
import { Mic, FileText, SpellCheck2, Sparkles, ShieldCheck, BarChart3, BookOpen } from 'lucide-react';
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
    <div className="space-y-28">
      {/* Hero */}
      <section className="grid items-center gap-12 pt-4 lg:grid-cols-2">
        <div className="animate-fade-in-up">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand-soft/60 px-4 py-1.5">
            <ShieldCheck className="h-3.5 w-3.5 text-brand" aria-hidden />
            <span className="text-xs font-semibold text-brand-dark">
              Aligned with British Council IELTS standards
            </span>
          </div>
          <h1 className="text-4xl font-bold leading-[1.08] text-ink sm:text-5xl lg:text-[3.4rem]">
            Know your band{' '}
            <span className="text-gradient-brand">before</span>{' '}
            test day.
          </h1>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-ink-soft sm:text-lg">
            Record an answer to a real Part 1, 2, or 3 question. {APP_NAME} transcribes it,
            scores it against the four official IELTS criteria, and hands you a Band 8–9 model
            answer to learn from — in under a minute.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href={user ? '/dashboard' : '/login'}
              className="inline-flex items-center justify-center rounded-full bg-brand px-7 py-3.5 text-base font-semibold text-white shadow-md transition-all hover:bg-brand-dark hover:shadow-lg active:scale-[0.98]"
            >
              {user ? 'Go to dashboard' : 'Start your first free check'}
            </Link>
            <p className="text-sm text-ink-soft">
              {FREE_TRIES_LIMIT} free tries · then {PREMIUM_PRICE_BDT}৳ one‑time
            </p>
          </div>
        </div>

        <div className="animate-fade-in-up animate-delay-2">
          <HeroVisual />
        </div>
      </section>

      {/* Trust strip */}
      <section className="animate-fade-in-up animate-delay-3">
        <div className="flex flex-wrap items-center justify-center gap-6 rounded-2xl border border-border/60 bg-surface px-6 py-5 shadow-card sm:gap-10 sm:px-10">
          {[
            { icon: ShieldCheck, text: 'Real IELTS Scoring Rubrics' },
            { icon: BarChart3, text: 'AI-Powered Band Evaluation' },
            { icon: BookOpen, text: 'British Council Criteria' },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-2.5">
              <Icon className="h-5 w-5 text-brand" aria-hidden />
              <span className="text-xs font-semibold text-ink sm:text-sm">{text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Three parts */}
      <section className="animate-fade-in-up">
        <p className="text-xs font-semibold uppercase tracking-widest text-brand">Complete coverage</p>
        <h2 className="mt-2 text-2xl font-bold text-ink sm:text-3xl">Every part of the real test</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-3">
          {([1, 2, 3] as const).map((part, i) => (
            <Card key={part} className={`card-hover animate-fade-in-up animate-delay-${i + 1}`}>
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-brand-soft">
                <span className="font-mono text-sm font-bold text-brand">{part}</span>
              </div>
              <p className="font-display text-base font-semibold text-ink">
                {IELTS_PART_LABELS[part]}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{IELTS_PART_DESCRIPTIONS[part]}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="animate-fade-in-up">
        <p className="text-xs font-semibold uppercase tracking-widest text-brand">Simple process</p>
        <h2 className="mt-2 text-2xl font-bold text-ink sm:text-3xl">How it works</h2>
        <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Mic, title: 'Record', body: 'Answer out loud, right in your browser. No apps needed.' },
            { icon: FileText, title: 'Transcribe', body: 'Get an exact, word-for-word transcript of your speech.' },
            { icon: SpellCheck2, title: 'Score', body: 'Receive your overall band plus all four official criteria.' },
            { icon: Sparkles, title: 'Learn', body: 'Study a Band 8–9 model answer, side by side with yours.' },
          ].map((step, i) => (
            <div key={step.title} className={`animate-fade-in-up animate-delay-${i + 1}`}>
              <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand to-brand-dark text-white shadow-sm">
                <step.icon className="h-5 w-5" aria-hidden />
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-gold text-[10px] font-bold text-white">
                  {i + 1}
                </span>
              </div>
              <p className="mt-4 font-display text-base font-semibold text-ink">
                {step.title}
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{step.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="animate-fade-in-up">
        <div className="rounded-2xl bg-gradient-to-br from-brand to-brand-dark px-6 py-12 text-center shadow-elevated sm:px-12 sm:py-16">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Ready to know your real band score?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-white/75 sm:text-base">
            Join thousands of IELTS candidates who practice with {APP_NAME} to improve their speaking band.
          </p>
          <Link
            href={user ? '/dashboard' : '/login'}
            className="mt-8 inline-flex items-center justify-center rounded-full bg-white px-8 py-3.5 text-base font-semibold text-brand shadow-md transition-all hover:shadow-lg active:scale-[0.98]"
          >
            {user ? 'Go to dashboard' : 'Get started for free'}
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border pt-8 pb-6">
        <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
          <div className="flex items-center gap-2.5">
            <Image
              src="/speakband-logo.png"
              alt="SpeakBand"
              width={24}
              height={24}
              className="h-6 w-6 object-contain"
            />
            <span className="font-display text-sm font-bold text-ink">{APP_NAME}</span>
            <span className="text-xs text-ink-muted">Since 2022</span>
          </div>
          <p className="text-xs text-ink-muted">
            © 2022 {APP_NAME}. AI-powered IELTS preparation tool. Not affiliated with the British Council, IDP, or Cambridge.
        </div>
      </footer>
    </div>
  );
}

/** Polished hero visual with animated band score display */
function HeroVisual() {
  const width = 420;
  const height = 340;
  const rulerY = 270;
  const rulerLeft = 30;
  const rulerRight = 390;
  const step = (rulerRight - rulerLeft) / 9;
  const markerBand = 7.5;
  const markerX = rulerLeft + markerBand * step;

  return (
    <div className="relative animate-float">
      <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-brand/5 to-brand/10 blur-2xl" />
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="relative w-full max-w-md"
        role="img"
        aria-label="Illustration of an IELTS band score ruler, marked at band 7.5"
      >
        {/* Card background */}
        <rect x="0" y="0" width={width} height={height} rx="24" fill="var(--color-surface)" />
        <rect x="0.5" y="0.5" width={width - 1} height={height - 1} rx="24" fill="none" stroke="var(--color-border)" strokeOpacity="0.6" />

        {/* Decorative gradient strip at top */}
        <defs>
          <linearGradient id="hero-grad" x1="0" y1="0" x2={width} y2="0">
            <stop stopColor="var(--color-brand)" />
            <stop offset="1" stopColor="var(--color-brand-glow)" />
          </linearGradient>
        </defs>
        <rect x="0" y="0" width={width} height="4" rx="24" fill="url(#hero-grad)" />

        <text x="30" y="50" fontFamily="var(--font-display)" fontSize="13" fontWeight="600" fill="var(--color-ink-soft)">
          YOUR BAND SCORE
        </text>
        <text x="30" y="110" fontFamily="var(--font-mono)" fontSize="64" fontWeight="600" fill="var(--color-brand)">
          7.5
        </text>
        <text x="165" y="110" fontFamily="var(--font-body)" fontSize="14" fill="var(--color-good)">
          Good User ✓
        </text>

        {/* Criteria mini bars */}
        {[
          { label: 'FC', val: 7.5 },
          { label: 'LR', val: 7.0 },
          { label: 'GRA', val: 7.5 },
          { label: 'PR', val: 8.0 },
        ].map(({ label, val }, i) => {
          const barY = 140 + i * 26;
          const barWidth = (val / 9) * 200;
          return (
            <g key={label}>
              <text x="30" y={barY + 12} fontFamily="var(--font-body)" fontSize="11" fill="var(--color-ink-soft)">
                {label}
              </text>
              <rect x="80" y={barY} width="200" height="16" rx="8" fill="var(--color-border-subtle)" />
              <rect x="80" y={barY} width={barWidth} height="16" rx="8" fill="var(--color-brand)" opacity="0.7" />
              <text x="290" y={barY + 12} fontFamily="var(--font-mono)" fontSize="11" fontWeight="600" fill="var(--color-ink)">
                {val.toFixed(1)}
              </text>
            </g>
          );
        })}

        {/* Ruler line */}
        <line x1={rulerLeft} y1={rulerY} x2={rulerRight} y2={rulerY} stroke="var(--color-border)" strokeWidth="2" />
        {Array.from({ length: 10 }).map((_, band) => {
          const x = rulerLeft + band * step;
          return (
            <g key={band}>
              <line
                x1={x}
                y1={rulerY - 12}
                x2={x}
                y2={rulerY}
                stroke="var(--color-ink-soft)"
                strokeOpacity="0.3"
                strokeWidth="1.5"
              />
              <text
                x={x}
                y={rulerY + 20}
                fontFamily="var(--font-mono)"
                fontSize="10"
                textAnchor="middle"
                fill="var(--color-ink-muted)"
              >
                {band}
              </text>
            </g>
          );
        })}

        {/* Marker */}
        <circle cx={markerX} cy={rulerY} r="7" fill="var(--color-gold)" />
        <line x1={markerX} y1={rulerY - 30} x2={markerX} y2={rulerY - 8} stroke="var(--color-gold)" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    </div>
  );
}
