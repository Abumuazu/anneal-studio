/**
 * The current currency lives on <html data-currency>, set before first paint
 * by the boot script from a cookie. Switching writes the cookie, updates the
 * attribute (CSS shows the matching prices) and fires `kit:currency`.
 */
const ATTR = 'data-currency';
export const CURRENCY_EVENT = 'kit:currency';

export function readCurrency(): string | null {
  if (typeof document === 'undefined') return null;
  return document.documentElement.getAttribute(ATTR);
}

export function subscribeCurrency(listener: () => void): () => void {
  const mo = new MutationObserver(listener);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: [ATTR] });
  return () => mo.disconnect();
}

export function setCurrency(code: string, cookie: string, maxAgeDays = 365): void {
  const root = document.documentElement;
  if (root.getAttribute(ATTR) === code) return;
  root.setAttribute(ATTR, code);
  document.cookie = `${cookie}=${encodeURIComponent(code)}; Path=/; Max-Age=${maxAgeDays * 86400}; SameSite=Lax`;
  window.dispatchEvent(new CustomEvent(CURRENCY_EVENT, { detail: code }));
}

/**
 * CSS that shows only the active currency's prices. Before JS (or if the
 * attribute is missing), `fallback` is shown.
 */
export function currencyCss(codes: readonly string[], fallback: string): string {
  const rules = codes.map(
    (c) => `:root[data-currency="${c}"] [data-price]:not([data-price="${c}"]){display:none}`,
  );
  rules.push(
    `:root:not([data-currency]) [data-price]:not([data-price="${fallback}"]){display:none}`,
  );
  return rules.join('');
}
