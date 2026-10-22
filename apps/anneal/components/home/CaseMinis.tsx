// Compact product widgets shown inside the Home case cards on phones, from
// design/v6/HomeMobileV6.dc.html. Decorative product imagery with sample data,
// hidden from assistive tech; the card's text carries the content.
import { type CSSProperties } from 'react';

const sans: CSSProperties = { fontFamily: 'var(--font-text)' };

/** Exchange: a coin row with its live chart and Buy and Sell. */
export function ExchangeMini() {
  return (
    <div
      aria-hidden="true"
      className="mt-[22px] rounded-[22px] bg-grey-900 px-[18px] pt-[18px] pb-3.5 desk:hidden"
    >
      <div className="flex items-center gap-3">
        <span
          className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#f7931a] text-lg font-bold text-panel"
          style={sans}
        >
          ₿
        </span>
        <div className="flex flex-col gap-0.5">
          <span className="text-base font-semibold" style={sans}>
            Bitcoin
          </span>
          <span className="type-label text-[10px] text-grey-400">BTC · Live</span>
        </div>
        <span className="type-label ml-auto text-[#3ddc84]">+2.4%</span>
      </div>
      <svg viewBox="0 0 300 90" width="100%" height="90" className="mt-3 block">
        <path
          d="M0 70 L20 64 L40 68 L60 52 L80 58 L100 44 L120 50 L140 36 L160 42 L180 30 L200 38 L220 22 L240 28 L260 16 L280 20 L300 8"
          fill="none"
          stroke="#f7931a"
          strokeWidth="3"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </svg>
      <div className="mt-3 grid grid-cols-2 gap-2">
        <span
          className="flex h-11 items-center justify-center rounded-full bg-panel text-[15px] font-semibold text-ink"
          style={sans}
        >
          Buy
        </span>
        <span
          className="flex h-11 items-center justify-center rounded-full bg-grey-800 text-[15px] font-semibold text-panel"
          style={sans}
        >
          Sell
        </span>
      </div>
    </div>
  );
}

const LEVELS = [14, 28, 40, 22, 32, 12] as const;

/** Wisp: the Live Activity of a recording with the phone locked. */
export function WispMini() {
  return (
    <div
      aria-hidden="true"
      className="mt-[22px] flex items-center gap-3.5 rounded-[26px] bg-[#0c1a12] px-5 py-[18px] text-panel desk:hidden"
    >
      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <span className="type-label text-[10px] text-[#00ff5a]">Recording · Confidential</span>
        <span
          className="text-[44px] leading-none font-medium tracking-[-0.04em] tabular-nums"
          style={sans}
        >
          24:18
        </span>
        <span className="type-label text-[10px] text-[#8fa399]">Phone locked</span>
      </div>
      <div className="flex h-10 items-center gap-1">
        {LEVELS.map((h, i) => (
          <i key={i} className="block w-1 rounded-sm bg-[#ff453a]" style={{ height: h }} />
        ))}
      </div>
      <span className="inline-flex h-11 w-11 flex-none items-center justify-center rounded-full bg-[#ff453a]">
        <svg viewBox="0 0 24 24" width="18" height="18">
          <rect x="6" y="6" width="12" height="12" rx="2" fill="#fff" />
        </svg>
      </span>
    </div>
  );
}

/** Jewellery: an offer on a ring, held on the card until the seller says yes. */
export function JewelleryMini() {
  return (
    <div aria-hidden="true" className="desk:hidden">
      <div className="mt-[22px] flex items-center gap-3.5 rounded-[22px] bg-[#f4efe7] p-4">
        <span className="inline-flex h-[84px] w-[84px] flex-none items-center justify-center rounded-[18px] bg-[#fffdf9] text-[#c9963a]">
          <svg viewBox="0 0 200 200" width="64" height="64">
            <ellipse
              cx="100"
              cy="118"
              rx="64"
              ry="50"
              fill="none"
              stroke="currentColor"
              strokeWidth="11"
            />
            <path d="M84 60L100 40L116 60L100 76Z" fill="currentColor" />
          </svg>
        </span>
        <div className="flex min-w-0 flex-col gap-1">
          <span className="type-label text-[10px] text-[#6b6054]">Your offer</span>
          <span className="type-display-wide text-[22px]">₦420,000</span>
          <span className="text-[13px] text-[#3a332a]" style={sans}>
            Held now, charged only on yes
          </span>
        </div>
      </div>
      <span
        className="mt-2.5 flex h-12 items-center justify-center rounded-full bg-[#1b1712] text-[15px] font-semibold text-panel"
        style={sans}
      >
        Send offer
      </span>
    </div>
  );
}
