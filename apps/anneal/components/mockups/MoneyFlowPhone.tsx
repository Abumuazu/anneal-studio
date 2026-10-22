'use client';

// Ported from design/v6/CaseJewelleryV6.dc.html (the pinned "how the money moves" phone).
import { useSteps } from '@studio/kit/motion';

import { moneyFlowLabels } from '@/content/appendix';

export interface MoneyState {
  title: string;
  line: string;
  button: string;
}

export interface MoneyHold {
  amount: string;
  status: string;
}

/** Status panel colours and card chip offsets per step, from the board. */
const LOOK = [
  { bg: '#ffffff', fg: '#0b0b0c', lift: 30 },
  { bg: '#ffffff', fg: '#0b0b0c', lift: 0 },
  { bg: '#0b0b0c', fg: '#ffffff', lift: -10 },
  { bg: '#3ddc84', fg: '#0b0b0c', lift: -24 },
] as const;

/** The offer phone and the buyer's card chip, following the current money flow step. */
export function MoneyFlowPhone({ states, holds }: { states: MoneyState[]; holds: MoneyHold[] }) {
  const { active, count, scrubbing } = useSteps();
  const i = scrubbing ? active : count - 1;
  const state = states[i];
  const hold = holds[i];
  const look = LOOK[i] ?? LOOK[LOOK.length - 1];
  if (!state || !hold || !look) return null;
  return (
    <>
      <div className="mflow-phone">
        <div className="mflow-screen">
          <span className="mflow-notch" aria-hidden="true" />
          <div className="font-text text-sm font-semibold">{moneyFlowLabels.item}</div>
          <div className="jwimg mt-3 h-[120px] rounded-[14px]" aria-hidden="true">
            <svg viewBox="0 0 200 200" className="h-24 w-24">
              <use href="#jw-ring" />
            </svg>
          </div>
          <div className="type-label mt-4 text-[9px] text-grey-600">{moneyFlowLabels.offer}</div>
          <div className="type-display-wide mt-2 text-[26px]">₦420,000</div>
          <div className="mflow-state" style={{ background: look.bg, color: look.fg }}>
            <div className="font-text text-[13.5px] font-semibold">{state.title}</div>
            <div className="mt-1 font-text text-[11.5px] opacity-75">{state.line}</div>
          </div>
          <div className="mt-auto flex h-[46px] items-center justify-center rounded-full bg-ink text-panel">
            <span className="font-text text-[13px] font-semibold">{state.button}</span>
          </div>
        </div>
      </div>
      <div className="mflow-hold glass-light" style={{ transform: `translateY(${look.lift}px)` }}>
        <div className="type-label text-[9.5px] text-grey-600">{moneyFlowLabels.card}</div>
        <div className="mt-2 font-text text-xl font-semibold tracking-[-0.02em]">{hold.amount}</div>
        <div className="mt-1 font-text text-xs text-grey-700">{hold.status}</div>
      </div>
    </>
  );
}
