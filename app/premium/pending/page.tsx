import Link from 'next/link';
import { CheckCircle2, Clock } from 'lucide-react';
import { Card } from '@/components/ui/primitives';

export default function PremiumPendingPage() {
  return (
    <div className="mx-auto max-w-md py-12 text-center">
      <Card className="animate-fade-in-up">
        <div className="relative mx-auto flex h-16 w-16 items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-brand-soft animate-ping" style={{ animationDuration: '3s' }} />
          <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-brand-soft">
            <Clock className="h-7 w-7 text-brand" aria-hidden />
          </div>
        </div>
        <h1 className="mt-5 font-display text-2xl font-bold text-ink">Payment submitted</h1>
        <p className="mt-2 text-sm leading-relaxed text-ink-soft">
          We&apos;re verifying your transaction now. Once it&apos;s approved your account switches
          to Premium automatically — no need to do anything else here.
        </p>
        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-good">
          <CheckCircle2 className="h-3.5 w-3.5" aria-hidden />
          <span className="font-medium">Usually verified within a few hours</span>
        </div>
        <Link
          href="/dashboard"
          className="mt-6 inline-block rounded-full bg-brand px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-brand-dark hover:shadow-md"
        >
          Back to dashboard
        </Link>
      </Card>
    </div>
  );
}
