import Link from 'next/link';
import { Clock } from 'lucide-react';
import { Card } from '@/components/ui/primitives';

export default function PremiumPendingPage() {
  return (
    <div className="mx-auto max-w-md py-12 text-center">
      <Card>
        <Clock className="mx-auto h-10 w-10 text-brand" aria-hidden />
        <h1 className="mt-4 font-display text-2xl font-bold text-ink">Payment submitted</h1>
        <p className="mt-2 text-sm text-ink-soft">
          We&apos;re verifying your transaction now. Once it&apos;s approved your account switches
          to Premium automatically — no need to do anything else here.
        </p>
        <Link
          href="/dashboard"
          className="mt-6 inline-block text-sm font-semibold text-brand hover:underline"
        >
          Back to dashboard
        </Link>
      </Card>
    </div>
  );
}
