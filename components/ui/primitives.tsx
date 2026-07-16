'use client';

import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from 'react';
import { useState } from 'react';
import { Loader2, AlertCircle, CheckCircle2, Info, RotateCcw, ChevronDown, Copy, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

// --- Button ------------------------------------------------------------------

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  loading?: boolean;
}

const buttonVariantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-brand text-white hover:bg-brand-dark active:scale-[0.98] disabled:bg-brand/50 shadow-sm hover:shadow-md',
  secondary:
    'bg-white text-ink border border-border hover:border-brand hover:text-brand active:scale-[0.98] disabled:opacity-50 shadow-sm',
  ghost: 'bg-transparent text-ink hover:bg-black/5 active:bg-black/8 disabled:opacity-50',
  danger:
    'bg-flag text-white hover:bg-flag/90 active:scale-[0.98] disabled:opacity-50 shadow-sm',
};

export function Button({
  variant = 'primary',
  loading = false,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200 disabled:cursor-not-allowed',
        buttonVariantClasses[variant],
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
      {children}
    </button>
  );
}

// --- Card --------------------------------------------------------------------

export function Card({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'rounded-card-lg border border-border bg-surface p-6 shadow-card',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

// --- Badge -------------------------------------------------------------------

type BadgeVariant = 'neutral' | 'brand' | 'gold' | 'good' | 'flag';

const badgeVariantClasses: Record<BadgeVariant, string> = {
  neutral: 'bg-black/5 text-ink-soft',
  brand: 'bg-brand-soft text-brand-dark',
  gold: 'bg-gold-soft text-gold-dark',
  good: 'bg-good-soft text-good',
  flag: 'bg-flag-soft text-flag',
};

export function Badge({
  variant = 'neutral',
  children,
  className,
}: {
  variant?: BadgeVariant;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold',
        badgeVariantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  );
}

// --- Spinner -----------------------------------------------------------------

export function Spinner({ className }: { className?: string }) {
  return <Loader2 className={cn('animate-spin', className)} aria-hidden />;
}

// --- Page heading ------------------------------------------------------------

export function PageHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="animate-fade-in-up mb-8">
      {eyebrow && (
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-brand">
          {eyebrow}
        </p>
      )}
      <h1 className="text-3xl font-bold text-ink sm:text-4xl">{title}</h1>
      {description && <p className="mt-2 max-w-2xl text-ink-soft">{description}</p>}
    </div>
  );
}

// --- Skeleton ----------------------------------------------------------------

export function Skeleton({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('skeleton', className)}
      aria-hidden
      {...props}
    />
  );
}

// --- ProgressRing ────────────────────────────────────────────────────────────

export function ProgressRing({
  value,
  maxValue = 9,
  size = 140,
  strokeWidth = 10,
  label,
  sublabel,
}: {
  value: number | null;
  maxValue?: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
  sublabel?: string;
}) {
  const clamped = Math.max(0, Math.min(maxValue, value ?? 0));
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (clamped / maxValue) * circumference;
  const offset = circumference - progress;

  const color =
    clamped >= 7 ? 'var(--color-good)' :
    clamped >= 5.5 ? 'var(--color-brand)' :
    clamped >= 4 ? 'var(--color-gold)' :
    'var(--color-flag)';

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="-rotate-90"
        aria-hidden
      >
        {/* Background track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--color-border-subtle)"
          strokeWidth={strokeWidth}
        />
        {/* Progress arc */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="animate-circular-progress"
          style={{ '--circumference': circumference } as React.CSSProperties}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="font-mono text-3xl font-bold" style={{ color }}>
          {value !== null && value !== undefined ? value.toFixed(1) : '—'}
        </span>
        {label && <span className="mt-0.5 text-xs font-medium text-ink-soft">{label}</span>}
        {sublabel && <span className="text-[10px] text-ink-muted">{sublabel}</span>}
      </div>
    </div>
  );
}

// --- AlertBanner ─────────────────────────────────────────────────────────────

type AlertVariant = 'error' | 'info' | 'success';

const alertConfig: Record<AlertVariant, { bg: string; border: string; icon: typeof AlertCircle; iconColor: string }> = {
  error: { bg: 'bg-flag-soft', border: 'border-flag/20', icon: AlertCircle, iconColor: 'text-flag' },
  info: { bg: 'bg-brand-soft', border: 'border-brand/20', icon: Info, iconColor: 'text-brand' },
  success: { bg: 'bg-good-soft', border: 'border-good/20', icon: CheckCircle2, iconColor: 'text-good' },
};

export function AlertBanner({
  variant = 'error',
  message,
  onRetry,
}: {
  variant?: AlertVariant;
  message: string;
  onRetry?: () => void;
}) {
  const config = alertConfig[variant];
  const IconComponent = config.icon;

  return (
    <div
      className={cn(
        'flex items-start gap-3 rounded-card border p-4 animate-fade-in-up',
        config.bg,
        config.border
      )}
      role="alert"
    >
      <IconComponent className={cn('mt-0.5 h-5 w-5 shrink-0', config.iconColor)} aria-hidden />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-ink">{message}</p>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="shrink-0 flex items-center gap-1.5 rounded-full bg-white/80 px-3 py-1.5 text-xs font-semibold text-ink-soft shadow-sm transition-colors hover:text-brand hover:shadow-md"
        >
          <RotateCcw className="h-3 w-3" aria-hidden /> Retry
        </button>
      )}
    </div>
  );
}

// --- ExpandableCard ──────────────────────────────────────────────────────────

export function ExpandableCard({
  title,
  icon,
  badge,
  defaultExpanded = true,
  className,
  headerClassName,
  children,
}: {
  title: string;
  icon?: ReactNode;
  badge?: ReactNode;
  defaultExpanded?: boolean;
  className?: string;
  headerClassName?: string;
  children: ReactNode;
}) {
  const [expanded, setExpanded] = useState(defaultExpanded);

  return (
    <Card className={className}>
      <button
        onClick={() => setExpanded(!expanded)}
        className={cn(
          'flex w-full items-center justify-between gap-4 text-left',
          headerClassName
        )}
        aria-expanded={expanded}
      >
        <div className="flex items-center gap-2 min-w-0">
          {icon}
          <h3 className="font-display text-lg font-semibold text-ink">{title}</h3>
          {badge}
        </div>
        <ChevronDown
          className={cn(
            'h-5 w-5 shrink-0 text-ink-muted transition-transform duration-300',
            expanded && 'rotate-180'
          )}
          aria-hidden
        />
      </button>
      <div
        className="expandable-content"
        data-expanded={expanded}
      >
        <div>
          <div className="pt-4">{children}</div>
        </div>
      </div>
    </Card>
  );
}

// --- CopyButton ─────────────────────────────────────────────────────────────

export function CopyButton({ text, className }: { text: string; className?: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Silently fail if clipboard API is not available
    }
  }

  return (
    <button
      onClick={handleCopy}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-ink-soft transition-colors hover:bg-black/5 hover:text-brand',
        className
      )}
      aria-label="Copy to clipboard"
    >
      {copied ? (
        <>
          <Check className="h-3.5 w-3.5 text-good" aria-hidden /> Copied
        </>
      ) : (
        <>
          <Copy className="h-3.5 w-3.5" aria-hidden /> Copy
        </>
      )}
    </button>
  );
}

// --- MetricCard ──────────────────────────────────────────────────────────────

export function MetricCard({
  label,
  value,
  icon,
  accent = 'brand',
}: {
  label: string;
  value: string | number;
  icon: ReactNode;
  accent?: 'brand' | 'gold' | 'good' | 'flag';
}) {
  const accentClasses: Record<string, string> = {
    brand: 'bg-brand-soft text-brand',
    gold: 'bg-gold-soft text-gold-dark',
    good: 'bg-good-soft text-good',
    flag: 'bg-flag-soft text-flag',
  };

  return (
    <Card className="card-hover flex items-center gap-4">
      <div className={cn('flex h-11 w-11 shrink-0 items-center justify-center rounded-xl', accentClasses[accent])}>
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-xs font-medium text-ink-soft">{label}</p>
        <p className="font-display text-xl font-bold text-ink">{value}</p>
      </div>
    </Card>
  );
}
