import { PinnedSteps, StepItem } from '@studio/kit/motion';
import { type ReactNode } from 'react';

import {
  MoneyFlowPhone,
  type MoneyHold,
  type MoneyState,
} from '@/components/mockups/MoneyFlowPhone';

import { flowSteps } from './Blocks';

/**
 * "Hold on offer. Charge on yes.": pins while four steps advance with the
 * scroll, and the phone and the card chip follow the current step. On small
 * screens and with reduced motion every step shows and the phone shows the
 * last state.
 */
export function MoneyFlow({
  msg,
  heading,
  states,
  holds,
  children,
}: {
  msg: string;
  heading: string;
  /** Phone state per step. */
  states: MoneyState[];
  /** Card chip per step. */
  holds: MoneyHold[];
  children: ReactNode;
}) {
  const steps = flowSteps(children, 'MoneyFlow');
  return (
    <PinnedSteps
      count={steps.length}
      data-msg={msg}
      className="bg-panel"
      frameClassName="flex items-center py-20"
    >
      <div className="wrap grid w-full items-center gap-6 desk:grid-cols-12">
        <div className="desk:col-span-6">
          <h2 className="type-h2 mt-5 mb-9 text-[clamp(40px,4.6vw,70px)]">{heading}</h2>
          <ol className="m-0 flex list-none flex-col gap-1.5 p-0">
            {steps.map((s, i) => (
              <li key={s.title}>
                <StepItem index={i} className="mflow-step">
                  <span className="mflow-n type-display text-[56px]" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="type-h3 m-0 text-[26px]">{s.title}</h3>
                    <p className="mflow-x type-body mt-1.5 mb-0 text-[16.5px]">{s.body}</p>
                  </div>
                </StepItem>
              </li>
            ))}
          </ol>
        </div>
        <div className="relative hidden h-[560px] desk:col-span-5 desk:col-start-8 desk:block">
          <MoneyFlowPhone states={states} holds={holds} />
        </div>
      </div>
    </PinnedSteps>
  );
}
