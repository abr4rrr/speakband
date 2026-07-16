import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

// --- Button ------------------------------------------------------------------

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  loading?: boolean;
}

const buttonVariantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-brand text-white hover:bg-brand-dark disabled:bg-brand/50',
  secondary:
    'bg-white text-ink border border-border hover:border-brand hover:text-brand disabled:opacity-50',
  ghost: 'bg-transparent text-ink hover:bg-black/5 disabled:opacity-50',
  danger: 'bg-flag text-white hover:opacity-90 disabled:opacity-50',
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
        'inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-colors disabled:cursor-not-allowed',
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

// --- Card ----------------------------------------------------------------------

export function Card({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('rounded-card border border-border bg-surface p-6 shadow-sm', className)}
      {...props}
    >
      {children}
    </div>
  );
}

// --- Badge -----------------------------------------------------------------

type BadgeVariant = 'neutral' | 'brand' | 'gold' | 'good' | 'flag';

const badgeVariantClasses: Record<BadgeVariant, string> = {
  neutral: 'bg-black/5 text-ink-soft',
  brand: 'bg-brand-soft text-brand-dark',
  gold: 'bg-gold-soft text-gold',
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

// --- Spinner ---------------------------------------------------------------

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
    <div className="mb-8">
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
