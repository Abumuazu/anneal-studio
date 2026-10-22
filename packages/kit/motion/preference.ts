/**
 * Reduced-motion preference as an external store. The effective value is the
 * session override if set, otherwise the OS setting. Writing an override also
 * updates `data-motion` on <html> so CSS follows immediately.
 */
export type MotionMode = 'full' | 'reduce';

const QUERY = '(prefers-reduced-motion: reduce)';
let storageKey = 'kit-motion';
const listeners = new Set<() => void>();
let mql: MediaQueryList | null = null;

function media(): MediaQueryList | null {
  if (typeof window === 'undefined') return null;
  if (!mql) {
    mql = window.matchMedia(QUERY);
    mql.addEventListener('change', () => {
      applyAttribute();
      emit();
    });
  }
  return mql;
}

function readOverride(): MotionMode | null {
  try {
    const v = window.sessionStorage.getItem(storageKey);
    return v === 'reduce' || v === 'full' ? v : null;
  } catch {
    return null;
  }
}

function applyAttribute(): void {
  document.documentElement.setAttribute('data-motion', isReduced() ? 'reduce' : 'full');
}

function emit(): void {
  for (const l of listeners) l();
}

export function configureMotionPreference(key: string): void {
  storageKey = key;
}

export function isReduced(): boolean {
  if (typeof window === 'undefined') return false;
  const o = readOverride();
  if (o) return o === 'reduce';
  return media()?.matches ?? false;
}

export function subscribeMotion(listener: () => void): () => void {
  media();
  listeners.add(listener);
  return () => listeners.delete(listener);
}

/** Sets or clears (with `null`) the session override. */
export function setMotionOverride(mode: MotionMode | null): void {
  try {
    if (mode) window.sessionStorage.setItem(storageKey, mode);
    else window.sessionStorage.removeItem(storageKey);
  } catch {
    // Storage blocked: the override lasts for this page only.
  }
  applyAttribute();
  emit();
}

export function getMotionOverride(): MotionMode | null {
  if (typeof window === 'undefined') return null;
  return readOverride();
}
