import { currencyCss } from './currency-store';

interface PriceProps {
  /** Formatted amount per currency code, e.g. { USD: "$100", EUR: "€90" }. */
  values: Readonly<Record<string, string>>;
  className?: string;
}

/**
 * Renders every currency's amount; CSS shows only the active one. Static
 * pages therefore show the visitor's currency on first paint with no shift.
 */
export function Price({ values, className }: PriceProps) {
  return (
    <span className={className}>
      {Object.entries(values).map(([code, text]) => (
        <span key={code} data-price={code}>
          {text}
        </span>
      ))}
    </span>
  );
}

/** Put once in <head>. Hides the prices of every currency but the active one. */
export function CurrencyStyles({
  codes,
  fallback,
}: {
  codes: readonly string[];
  fallback: string;
}) {
  return <style>{currencyCss(codes, fallback)}</style>;
}
