import { AutoStepButton, AutoSteps, InView, Reveal } from '@studio/kit/motion';
import { type ReactNode } from 'react';

import { WispFlowPhone } from '@/components/mockups/WispFlowPhone';

import { flowSteps } from './Blocks';

/** Stage timings and the step each stage belongs to (CaseWispV6 gD and stepOf). */
const DURATIONS = [2400, 2800, 3200, 3000, 3800, 2800, 3600] as const;
const STEP_OF = [0, 0, 1, 2, 3, 4, 4] as const;

/**
 * "Follow one meeting from start to minutes": five steps that play on their
 * own beside one phone, and jump when picked.
 */
export function WispFlow({
  msg,
  heading,
  children,
}: {
  msg: string;
  heading: string;
  children: ReactNode;
}) {
  const steps = flowSteps(children, 'WispFlow');
  return (
    <InView as="section" data-msg={msg} className="relative bg-panel py-[150px]">
      <AutoSteps
        durations={DURATIONS}
        stepOf={STEP_OF}
        className="wrap grid items-center gap-16 desk:grid-cols-12 desk:gap-6"
      >
        <div className="desk:col-span-5">
          <Reveal as="h2" className="type-h2 mt-0 mb-10 text-[clamp(40px,4.6vw,70px)]">
            {heading}
          </Reveal>
          <div className="flex flex-col gap-2">
            {steps.map((s, i) => (
              <AutoStepButton key={s.title} index={i} className="wflow-step">
                <span className="wflow-n type-display text-[40px]" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="flex min-w-0 flex-col gap-1.5">
                  <span className="type-h3 text-2xl">{s.title}</span>
                  <span className="wflow-x type-body text-base">{s.body}</span>
                </span>
              </AutoStepButton>
            ))}
          </div>
        </div>
        <div className="flex justify-center desk:col-span-6 desk:col-start-7">
          <div className="wflow-pad" aria-hidden="true">
            <WispFlowPhone />
          </div>
        </div>
      </AutoSteps>
    </InView>
  );
}
