'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Check, X, LogOut } from 'lucide-react';
import { Card, Badge, Button } from '@/components/ui/primitives';
import { formatDate } from '@/lib/utils';
import type { PaymentRequest, PaymentStatus } from '@/types/database';

export function AdminRequestsTable({ initialRequests }: { initialRequests: PaymentRequest[] }) {
  const router = useRouter();
  const [requests, setRequests] = useState(initialRequests);
  const [tab, setTab] = useState<PaymentStatus>('pending');
  const [busyId, setBusyId] = useState<string | null>(null);
  const [banner, setBanner] = useState<string | null>(null);

  const filtered = useMemo(() => requests.filter((r) => r.status === tab), [requests, tab]);
  const pendingCount = useMemo(
    () => requests.filter((r) => r.status === 'pending').length,
    [requests]
  );

  async function handleDecision(id: string, action: 'approve' | 'reject') {
    setBusyId(id);
    setBanner(null);
    try {
      const response = await fetch(`/api/admin/${action}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ requestId: id }),
      });
      if (!response.ok) {
        const result = await response.json().catch(() => ({}));
        throw new Error(result.error || 'Request failed');
      }
      setRequests((prev) =>
        prev.map((r) =>
          r.id === id ? { ...r, status: action === 'approve' ? 'approved' : 'rejected' } : r
        )
      );
    } catch (err) {
      setBanner(
        err instanceof Error
          ? `Couldn't ${action} that request: ${err.message}`
          : `Couldn't ${action} that request. Please try again.`
      );
    } finally {
      setBusyId(null);
    }
  }

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin');
    router.refresh();
  }

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-2">
          {(['pending', 'approved', 'rejected'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setTab(status)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium capitalize transition-colors ${
                tab === status ? 'bg-brand text-white' : 'bg-black/5 text-ink-soft'
              }`}
            >
              {status}
              {status === 'pending' && pendingCount > 0 && ` (${pendingCount})`}
            </button>
          ))}
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-1.5 text-sm text-ink-soft hover:text-flag"
        >
          <LogOut className="h-4 w-4" aria-hidden /> Log out
        </button>
      </div>

      {banner && <p className="mb-4 text-sm text-flag">{banner}</p>}

      {filtered.length === 0 ? (
        <Card className="text-center text-sm text-ink-soft">No {tab} requests.</Card>
      ) : (
        <div className="space-y-3">
          {filtered.map((req) => (
            <Card
              key={req.id}
              className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="min-w-0 space-y-1 text-sm">
                <p className="font-semibold text-ink">
                  {req.sender_name}{' '}
                  <span className="font-normal text-ink-soft">· {req.sender_phone}</span>
                </p>
                <p className="text-ink-soft">
                  {req.profile?.email ?? 'Unknown user'} · {formatDate(req.created_at)}
                </p>
                <p className="flex flex-wrap items-center gap-2">
                  <Badge variant={req.method === 'bkash' ? 'good' : 'brand'} className="uppercase">
                    {req.method}
                  </Badge>
                  <span className="font-mono text-xs text-ink-soft">TxnID: {req.txn_id}</span>
                  <span className="font-mono text-xs font-semibold text-ink">{req.amount_bdt}৳</span>
                </p>
              </div>

              {req.status === 'pending' ? (
                <div className="flex shrink-0 gap-2">
                  <Button
                    variant="secondary"
                    loading={busyId === req.id}
                    onClick={() => handleDecision(req.id, 'reject')}
                  >
                    <X className="h-4 w-4" aria-hidden /> Reject
                  </Button>
                  <Button loading={busyId === req.id} onClick={() => handleDecision(req.id, 'approve')}>
                    <Check className="h-4 w-4" aria-hidden /> Approve
                  </Button>
                </div>
              ) : (
                <Badge
                  variant={req.status === 'approved' ? 'good' : 'flag'}
                  className="shrink-0 capitalize"
                >
                  {req.status}
                </Badge>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
