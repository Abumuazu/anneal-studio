/**
 * Live values for the Home case mockups, as functions of a seconds counter.
 * Ported from the HomeV6 board script (chartVals, gTime, lock, jwLeft). Seeded
 * and deterministic, so server and client render the same first frame.
 */

const ngn = (x: number) => '₦' + Math.round(x).toLocaleString('en-US');

/** Exchange portfolio: the historic chart is fixed; only its live tip and the balances move. */
export function exchangeValues(tk: number) {
  const LX = 356.0;
  const LY = 74.3;
  const j = Math.sin(tk * 1.9) * 5 + Math.sin(tk * 0.7 + 1) * 4 + Math.sin(tk * 4.3) * 2.2;
  const tx = 390 - 22;
  const ty = Math.max(14, Math.min(196, LY + j));
  const live = 18402550.49 * (1 + j / 2400);
  const main = Math.floor(live);
  const dec = String(Math.min(99, Math.round((live - main) * 100))).padStart(2, '0');
  const btc = 151820000 * (1 + j / 2400);
  const rate = Math.round(btc / 1408);
  return {
    tipD: `M${LX} ${LY} L${tx} ${ty.toFixed(1)}`,
    tipX: String(tx),
    tipY: ty.toFixed(1),
    pfMain: '₦' + main.toLocaleString('en-US'),
    pfDec: dec,
    pfChg: `${ngn(live * 0.0653)} (6.98%)`,
    btcVal: ngn(btc * 0.0798),
    sxRate: rate.toLocaleString('en-US'),
    sxGet: (250 / rate).toFixed(6),
    sxNgn: ngn(250 * 1408),
  };
}

/** Swap rate hold: counts 30 down to 0, then starts again. */
export function rateHold(tk: number) {
  const lock = 30 - (tk % 31);
  return { lockS: String(lock).padStart(2, '0'), lockW: `${Math.round((lock / 30) * 100)}%` };
}

/** Wisp Live Activity timer, starting at 18:39 and looping every ten minutes. */
export function recordingTime(tk: number): string {
  const t = 18 * 60 + 39 + (tk % 600);
  return `${Math.floor(t / 60)}:${String(t % 60).padStart(2, '0')}`;
}

/** Jewellery offer: time left for the seller to reply. */
export function replyCountdown(tk: number): string {
  const t = 86399 - (tk % 86400) - 1200;
  const h = Math.floor(t / 3600);
  const m = String(Math.floor((t % 3600) / 60)).padStart(2, '0');
  const s = String(t % 60).padStart(2, '0');
  return `${h}h ${m}m ${s}s`;
}

const clock = (secs: number) => `${Math.floor(secs / 60)}:${String(secs % 60).padStart(2, '0')}`;

const layer = (on: boolean, off: string) => ({ op: on ? '1' : '0', tr: on ? 'none' : off });

/** Dynamic Island size per state: width, height, radius, compact view opacity, expanded view opacity. */
const ISLAND = {
  idle: ['126px', '37px', '19px', '0', '0'],
  compact: ['236px', '37px', '19px', '1', '0'],
  expanded: ['370px', '112px', '44px', '0', '1'],
} as const;

/**
 * The Wisp capture flow phone at a given stage (CaseWispV6 pageVals): which
 * layer shows, how the others sit, the island state and the recording clock.
 * `elapsed` is seconds since recording started; the clock starts at 18:39.
 */
export function wispFlow(stage: number, elapsed: number) {
  const L0 = layer(stage === 0, 'scale(.96)');
  const L1 = layer(stage === 1, stage > 1 ? 'scale(.92)' : 'translateY(40px)');
  const L2 = layer(stage === 2, stage > 2 ? 'translateY(-100%)' : 'none');
  const L3 = layer(stage === 3 || stage === 4, stage < 3 ? 'scale(1.08)' : 'scale(.94)');
  const L5 = layer(stage === 5, 'translateY(60px)');
  const L6 = layer(stage === 6, 'translateX(60px)');
  const [iW, iH, iR, iC, iE] =
    stage === 3 ? ISLAND.compact : stage === 4 ? ISLAND.expanded : ISLAND.idle;
  return {
    gTime: clock(18 * 60 + 39 + Math.max(0, Math.floor(elapsed))),
    L0op: L0.op,
    L0tr: L0.tr,
    L1op: L1.op,
    L1tr: L1.tr,
    L2op: L2.op,
    L2tr: L2.tr,
    L3op: L3.op,
    L3tr: L3.tr,
    L5op: L5.op,
    L5tr: L5.tr,
    L6op: L6.op,
    L6tr: L6.tr,
    iW,
    iH,
    iR,
    iC,
    iE,
    gTap: stage === 0 ? 'on' : '',
    gTapOp: stage === 0 ? '1' : '0',
    gPress: stage === 4 ? 'on' : '',
    gPressOp: stage === 4 ? '1' : '0',
  };
}
