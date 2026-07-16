'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Card, Button } from '@/components/ui/primitives';
import { APP_NAME } from '@/lib/constants';

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      if (!response.ok) throw new Error('Incorrect password.');

      router.push('/admin/dashboard');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-sm py-16">
      <Card>
        <h1 className="font-display text-xl font-bold text-ink">{APP_NAME} admin</h1>
        <p className="mt-1 text-sm text-ink-soft">
          Owner-only. Enter the admin password to review payments.
        </p>
        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <input
            type="password"
            required
            autoFocus
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Admin password"
            className="w-full rounded-lg border border-border bg-white px-3.5 py-2.5 text-sm text-ink focus:border-brand"
          />
          {error && <p className="text-sm text-flag">{error}</p>}
          <Button type="submit" loading={loading} className="w-full justify-center py-2.5">
            Sign in
          </Button>
        </form>
      </Card>
    </div>
  );
}
