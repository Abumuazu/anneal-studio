import { InView, Reveal } from '@studio/kit/motion';

import { VentureTiles } from '@/components/VentureTiles';
import { boardCopy, copy } from '@/content/copy';

/** "We build our own, too." Four tiles; the hovered or focused one widens. */
export function Ventures() {
  return (
    <InView
      as="section"
      id="ventures"
      data-msg={copy['home.msg.4']}
      at={0.82}
      className="relative z-[3] bg-ground pt-[140px] pb-[170px]"
    >
      <div className="wrap">
        <div className="grid items-end gap-6 desk:grid-cols-12">
          <Reveal
            as="h2"
            step={1}
            className="type-h2 m-0 text-[clamp(44px,5.4vw,80px)] desk:col-span-8"
          >
            {copy['home.ven.h2']}
          </Reveal>
          <Reveal
            as="p"
            step={2}
            className="type-body m-0 text-grey-700 desk:col-span-4 desk:col-start-9"
          >
            {boardCopy.ventures.intro}
          </Reveal>
        </div>
        <VentureTiles
          variant="home"
          tiles={['raum', 'centiiv', 'clekey', 'tools']}
          lines={{
            raum: copy['home.ven.raum.line'],
            centiiv: copy['home.ven.centiiv.line'],
            clekey: copy['home.ven.clekey.line'],
            tools: copy['home.ven.tools.line'],
          }}
          className="mt-16"
        />
      </div>
    </InView>
  );
}
