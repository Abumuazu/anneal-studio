import { ScrollSteps, StepItem, WordLight } from '@studio/kit/motion';
import { ArrowLink } from '@studio/kit/ui';

import { boardCopy, copy } from '@/content/copy';

const PRINCIPLES = [1, 2, 3, 4] as const;

/** Studio statement lit by scroll, beside the four principles lit one at a time. */
export function Studio() {
  return (
    <section
      id="studio"
      data-msg={copy['home.msg.7']}
      className="relative z-[3] bg-panel py-24 desk:py-40"
    >
      <div className="wrap grid items-start gap-10 desk:grid-cols-12 desk:gap-6">
        <div className="desk:sticky desk:top-[120px] desk:col-span-6">
          <WordLight
            as="p"
            text={copy['home.studio.statement']}
            span="element"
            triggerClosest="section"
            className="type-h2 m-0 text-[clamp(32px,3.4vw,50px)] leading-[1.12]"
          />
          <ArrowLink href="/studio" className="mt-[18px] desk:mt-9">
            {boardCopy.aboutTheStudio}
          </ArrowLink>
        </div>
        <ScrollSteps count={PRINCIPLES.length} className="desk:col-span-5 desk:col-start-8">
          {PRINCIPLES.map((n, i) => (
            <StepItem
              key={n}
              index={i}
              className="group py-5 text-text-dim desk:py-10 transition-colors duration-[600ms] data-[active=true]:text-ink"
            >
              <div className="type-display text-[64px] desk:text-[96px]" aria-hidden="true">
                0{n}
              </div>
              <h3 className="type-h3 mt-3 mb-0 text-[26px] desk:mt-[18px] desk:text-[32px]">
                {copy[`home.studio.p.${n}.t`]}
              </h3>
              <p className="type-body mt-3 mb-0 group-data-[active=true]:text-grey-700">
                {copy[`home.studio.p.${n}.x`]}
              </p>
            </StepItem>
          ))}
        </ScrollSteps>
      </div>
    </section>
  );
}
