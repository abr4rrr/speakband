'use client';

import { useState, type FormEvent, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/primitives';
import type { PaymentMethod } from '@/types/database';

const inputClass =
  'w-full rounded-lg border border-border bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-soft/60 focus:border-brand';

export function PaymentForm() {
  const router = useRouter();
  const [method, setMethod] = useState<PaymentMethod>('bkash');
  const [senderName, setSenderName] = useState('');
  const [senderPhone, setSenderPhone] = useState('');
  const [txnId, setTxnId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/payment-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ method, senderName, senderPhone, txnId }),
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.error === 'duplicate_txn_id'
            ? 'This transaction ID has already been submitted.'
            : result.error || 'Something went wrong. Please try again.'
        );
      }

      router.push('/premium/pending');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="mb-1.5 block text-sm font-medium text-ink">Payment method</label>
        <div className="flex gap-3">
          {(['bkash', 'nagad'] as const).map((m) => (
            <button
              type="button"
              key={m}
              onClick={() => setMethod(m)}
              className={`flex-1 rounded-lg border px-4 py-2.5 text-sm font-semibold capitalize transition-colors ${
                method === m
                  ? 'border-brand bg-brand-soft text-brand-dark'
                  : 'border-border text-ink-soft'
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      <Field label="Your name (as used for the transfer)">
        <input
          required
          value={senderName}
          onChange={(e) => setSenderName(e.target.value)}
          className={inputClass}
          placeholder="e.g. Abdullah Al Mamun"
        />
      </Field>

      <Field label="Phone number used to send the money">
        <input
          required
          value={senderPhone}
          onChange={(e) => setSenderPhone(e.target.value)}
          className={inputClass}
          placeholder="e.g. 01812345678"
          inputMode="tel"
        />
      </Field>

      <Field label="Transaction ID (TxnID) from the confirmation SMS">
        <input
          required
          value={txnId}
          onChange={(e) => setTxnId(e.target.value.toUpperCase())}
          className={`${inputClass} font-mono`}
          placeholder="e.g. 9F3K7L2Q1R"
        />
      </Field>

      {error && <p className="text-sm text-flag">{error}</p>}

      <Button type="submit" loading={loading} className="w-full justify-center py-3">
        Submit for verification
      </Button>
    </form>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-ink">{label}</label>
      {children}
    </div>
  );
}
