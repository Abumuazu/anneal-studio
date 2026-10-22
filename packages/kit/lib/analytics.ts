/**
 * Custom events for a privacy-friendly analytics script that exposes
 * `window.plausible(name, { props })` (Plausible, or anything with the same
 * call). Does nothing when the script is not on the page.
 */
type Props = Readonly<Record<string, string | number | boolean>>;

interface WithAnalytics {
  plausible?: (event: string, options?: { props?: Props }) => void;
}

export function track(event: string, props?: Props): void {
  if (typeof window === 'undefined') return;
  const fn = (window as Window & WithAnalytics).plausible;
  if (typeof fn !== 'function') return;
  fn(event, props ? { props } : undefined);
}

/**
 * Inline script that queues events fired before the analytics script loads.
 * Put it in <head> next to the script tag.
 */
export const analyticsQueue =
  'window.plausible=window.plausible||function(){(window.plausible.q=window.plausible.q||[]).push(arguments)}';
