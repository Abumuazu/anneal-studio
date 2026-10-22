import { InView, Reveal } from '@studio/kit/motion';

import { WispIslandStates } from '@/components/mockups/WispIslandStates';

/** Wisp: the three Dynamic Island states on the case's dark green panel. */
export function IslandStates() {
  return (
    <InView as="section" className="relative pb-[140px]">
      <div className="wrap">
        <Reveal
          className="rounded-[32px] px-6 py-12 desk:px-12 desk:py-16"
          style={{ background: 'var(--case-dark)' }}
          aria-hidden="true"
        >
          <WispIslandStates />
        </Reveal>
      </div>
    </InView>
  );
}
