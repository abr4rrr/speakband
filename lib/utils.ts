export type ClassValue = string | false | null | undefined;

/** Joins truthy class names with a space. A tiny stand-in for clsx. */
export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(' ');
}

/** Formats a band score for display, e.g. 6 -> "6.0", 6.5 -> "6.5". */
export function formatBand(score: number | null | undefined): string {
  if (score === null || score === undefined || Number.isNaN(score)) return '—';
  return score.toFixed(1);
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}
