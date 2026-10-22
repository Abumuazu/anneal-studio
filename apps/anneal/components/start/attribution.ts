import { ATTRIBUTION_KEYS } from '@/lib/brief-fields';

const KEY = 'anneal-attribution';

/**
 * Keeps the campaign tags and referrer of the visit's first page, so a brief
 * sent later in the session says which channel brought it.
 */
export function captureAttribution(): void {
  try {
    if (window.sessionStorage.getItem(KEY)) return;
    const params = new URLSearchParams(window.location.search);
    const found: Record<string, string> = {};
    for (const k of ATTRIBUTION_KEYS) {
      const v = params.get(k);
      if (v) found[k] = v.slice(0, 500);
    }
    if (document.referrer && !document.referrer.startsWith(window.location.origin)) {
      found.referrer = document.referrer.slice(0, 500);
    }
    found.landing = window.location.pathname;
    window.sessionStorage.setItem(KEY, JSON.stringify(found));
  } catch {
    // Storage blocked: the brief simply goes without tags.
  }
}

export function readAttribution(): Record<string, string> {
  try {
    const raw = window.sessionStorage.getItem(KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : {};
    if (!parsed || typeof parsed !== 'object') return {};
    return Object.fromEntries(
      Object.entries(parsed).filter((e): e is [string, string] => typeof e[1] === 'string'),
    );
  } catch {
    return {};
  }
}
