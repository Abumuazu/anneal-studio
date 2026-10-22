/**
 * The boot script runs inline in <head>, before first paint. It sets three
 * attributes on <html> that CSS keys off:
 *
 * - `data-motion="full" | "reduce"`: hidden-until-revealed states and looping
 *   animations only apply under "full". Without JS the attribute is missing, so
 *   everything renders visible and still.
 * - `data-currency="<CODE>"`: the visitor's currency from a cookie, so static
 *   pages show the right price on first paint with no layout shift.
 * - `data-handoff="arrive"`: set when a fresh page-transition flag is waiting,
 *   so the transition overlay covers the page from the very first frame.
 */
export interface BootConfig {
  /** sessionStorage key holding a motion override: "reduce" | "full". */
  motionKey: string;
  currency: {
    cookie: string;
    codes: readonly string[];
    fallback: string;
  };
  handoff: {
    /** sessionStorage key holding a timestamp written by the departing page. */
    key: string;
    maxAgeMs: number;
  };
}

/**
 * Self-contained so it can be serialised with `toString()`. No imports, no
 * closures over module scope.
 */
export function bootRuntime(cfg: BootConfig, doc: Document, win: Window): void {
  const root = doc.documentElement;
  let override: string | null = null;
  try {
    override = win.sessionStorage.getItem(cfg.motionKey);
  } catch {
    override = null;
  }
  let systemReduce = false;
  try {
    systemReduce = win.matchMedia('(prefers-reduced-motion: reduce)').matches;
  } catch {
    systemReduce = false;
  }
  const reduce = override === 'reduce' || (override !== 'full' && systemReduce);
  root.setAttribute('data-motion', reduce ? 'reduce' : 'full');

  let currency = cfg.currency.fallback;
  const pairs = doc.cookie ? doc.cookie.split('; ') : [];
  for (const pair of pairs) {
    const eq = pair.indexOf('=');
    if (eq > 0 && pair.slice(0, eq) === cfg.currency.cookie) {
      const value = decodeURIComponent(pair.slice(eq + 1));
      if (cfg.currency.codes.includes(value)) currency = value;
    }
  }
  root.setAttribute('data-currency', currency);

  if (!reduce) {
    try {
      const stamp = Number(win.sessionStorage.getItem(cfg.handoff.key));
      if (stamp && Date.now() - stamp < cfg.handoff.maxAgeMs) {
        root.setAttribute('data-handoff', 'arrive');
      }
    } catch {
      // Storage blocked: skip the arrival overlay.
    }
  }
}

/** Returns the inline script body for a <script> tag in <head>. */
export function bootScript(cfg: BootConfig): string {
  return `(${bootRuntime.toString()})(${JSON.stringify(cfg)},document,window);`;
}
