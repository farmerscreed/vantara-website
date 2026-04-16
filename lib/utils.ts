// Tiny utilities shared across components.

/** Join class names, ignoring falsy values. */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

/** Format integers with thousands separators. */
export function formatNumber(n: number): string {
  return new Intl.NumberFormat("en-US").format(n);
}
