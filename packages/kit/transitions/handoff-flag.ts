/**
 * The page hand-off flag. The departing page writes a timestamp; the
 * destination reads and clears it. A flag older than `maxAgeMs` is ignored, so
 * a stale flag from an abandoned navigation never triggers a reveal, and a
 * fresh one works on every navigation, not only the first.
 */
export interface HandoffStorage {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

export function writeHandoff(storage: HandoffStorage, key: string, now = Date.now()): void {
  try {
    storage.setItem(key, String(now));
  } catch {
    // Storage blocked: the destination simply will not play the reveal.
  }
}

/** Reads and clears the flag. True when it was written within `maxAgeMs`. */
export function consumeHandoff(
  storage: HandoffStorage,
  key: string,
  maxAgeMs: number,
  now = Date.now(),
): boolean {
  try {
    const raw = storage.getItem(key);
    if (raw === null) return false;
    storage.removeItem(key);
    const stamp = Number(raw);
    return Number.isFinite(stamp) && stamp > 0 && now - stamp >= 0 && now - stamp < maxAgeMs;
  } catch {
    return false;
  }
}

/** Card the button grows into before it fills the screen (board sizes). */
export function cardRect(
  from: { left: number; top: number; width: number; height: number },
  viewport: { width: number; height: number },
): { left: number; top: number; width: number; height: number } {
  const W = viewport.width;
  const H = viewport.height;
  const cw = Math.min(260, W * 0.5);
  const ch = Math.min(380, H * 0.62);
  const cx = Math.min(W - cw / 2 - 24, Math.max(cw / 2 + 24, from.left + from.width / 2));
  const cy = Math.min(H - ch / 2 - 24, Math.max(ch / 2 + 24, from.top + from.height / 2));
  return { left: cx - cw / 2, top: cy - ch / 2, width: cw, height: ch };
}

/** True for a plain left click that the transition may take over. */
export function isPlainClick(e: {
  button: number;
  metaKey: boolean;
  ctrlKey: boolean;
  shiftKey: boolean;
  altKey: boolean;
  defaultPrevented: boolean;
}): boolean {
  return (
    e.button === 0 && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey && !e.defaultPrevented
  );
}
