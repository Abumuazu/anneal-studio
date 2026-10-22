import { InView, LineMask, MorphTile, Reveal } from '@studio/kit/motion';
import { ButtonLink } from '@studio/kit/ui';
import type { Metadata } from 'next';

import { SiteChrome } from '@/components/SiteChrome';
import { Covers } from '@/components/work/Covers';
import { WorkIndex } from '@/components/work/WorkIndex';
import { boardCopy, copy, lines } from '@/content/copy';
import { chromeCopy, workCopy } from '@/content/pages';
import { site } from '@/content/site.config';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Work',
  description: copy['work.intro'],
  path: '/work',
});

export default function WorkPage() {
  const [first, second] = lines(copy['work.h1'], [1]);
  return (
    <SiteChrome variant="page" closingMsg={workCopy.msg.close} footerMsg={chromeCopy.footerMsg}>
      <section
        data-msg={workCopy.msg.hero}
        className="reveal-on-load relative pt-[136px] desk:pt-[200px] pb-16 desk:pb-[120px]"
      >
        <div className="wrap grid items-end gap-6 desk:grid-cols-12">
          <h1 className="type-display m-0 text-[clamp(80px,15vw,230px)] desk:col-span-8">
            <span aria-hidden="true">
              <LineMask line={0}>{first}</LineMask>
              <LineMask line={1}>
                {second}
                <MorphTile
                  glyphs={['g-app', 'g-code', 'g-spark', 'g-stack']}
                  background="var(--color-ink)"
                  color="var(--color-panel)"
                />
              </LineMask>
            </span>
            <span className="sr-only">{copy['work.h1']}</span>
          </h1>
          <Reveal
            as="p"
            step={2}
            className="type-lead mt-0 mb-[18px] text-grey-700 desk:col-span-4 desk:col-start-9"
          >
            {copy['work.intro']}
          </Reveal>
        </div>
      </section>

      <Covers />

      <WorkIndex />

      <InView as="section" data-msg={workCopy.msg.end} className="relative py-24 desk:py-[140px]">
        <div className="wrap">
          <Reveal className="relative overflow-hidden rounded-[32px] bg-panel px-6 py-12 desk:px-16 desk:py-[72px]">
            <div className="type-label text-grey-600">06 · {boardCopy.workWithUs}</div>
            <div className="mt-[22px] grid items-end gap-8 desk:grid-cols-12 desk:gap-6">
              <h2 className="type-display m-0 text-[clamp(80px,11vw,168px)] desk:col-span-7">
                {copy['work.end.t']}
              </h2>
              <div className="desk:col-span-4 desk:col-start-9">
                <p className="type-lead m-0 text-grey-700">{copy['work.end.x']}</p>
                <ButtonLink
                  href={site.startHref}
                  handoff
                  className="mt-7"
                  bg="var(--color-ink)"
                  fg="var(--color-panel)"
                  fill="var(--color-accent)"
                  fillFg="var(--color-on-accent)"
                >
                  {boardCopy.workWithUs}
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        </div>
      </InView>
    </SiteChrome>
  );
}
