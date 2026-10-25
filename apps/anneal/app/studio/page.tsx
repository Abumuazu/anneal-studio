import { InView, LineMask, Reveal, ScrollSteps, StepItem, WordLight } from '@studio/kit/motion';
import { ArrowLink, Tag } from '@studio/kit/ui';
import type { Metadata } from 'next';

import { SiteChrome } from '@/components/SiteChrome';
import { VentureTiles } from '@/components/VentureTiles';
import { PageHero } from '@/components/pages/PageHero';
import { Tracks } from '@/components/pages/Tracks';
import { WaitlistSection } from '@/components/pages/WaitlistSection';
import { boardCopy, copy } from '@/content/copy';
import { chromeCopy, studioCopy as st } from '@/content/pages';
import { approved } from '@/content/approved';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: approved.meta.Studio.title,
  description: approved.meta.Studio.description,
  path: '/studio',
});

const PRINCIPLES = [1, 2, 3, 4] as const;

export default function StudioPage() {
  return (
    <SiteChrome
      variant="page"
      closingMsg={chromeCopy.closingMsgBuild}
      footerMsg={chromeCopy.footerMsg}
    >
      <PageHero
        lines={[copy['studio.h1.1'], copy['studio.h1.2'], copy['studio.h1.3']]}
        glyphs={['g-stack', 'g-dots', 'g-spark', 'g-code']}
        tile={{ background: 'var(--color-accent)', color: 'var(--color-on-accent)' }}
        msg={st.msg.hero}
        size="text-[clamp(64px,10.4vw,164px)]"
      >
        <Reveal as="p" step={2} className="type-lead mt-14 mb-0 max-w-[680px] text-grey-700">
          {copy['studio.lead']}
        </Reveal>
      </PageHero>

      <section data-msg={st.msg.short} className="relative bg-panel py-24 desk:py-[170px]">
        <div className="wrap grid desk:grid-cols-12">
          <WordLight
            text={copy['studio.who']}
            className="type-h2 m-0 text-[clamp(34px,3.8vw,58px)] leading-[1.12] desk:col-span-10 desk:col-start-3"
          />
        </div>
      </section>

      <InView as="section" data-msg={st.msg.what} className="relative py-24 desk:py-40">
        <div className="wrap">
          <Reveal as="h2" step={1} className="type-h2 mt-0 mb-16 text-[clamp(44px,5.4vw,80px)]">
            {copy['studio.engines.h2']}
          </Reveal>
          <Tracks
            titleSize="text-[40px]"
            cards={[
              {
                top: (
                  <>
                    <Tag>{st.now}</Tag>
                    <span className="type-label text-grey-600">01</span>
                  </>
                ),
                title: st.engines.studio,
                body: copy['studio.engines.studio.x'],
              },
              {
                top: (
                  <>
                    <Tag>{st.now}</Tag>
                    <span className="type-label text-grey-600">02</span>
                  </>
                ),
                title: st.engines.products,
                body: copy['studio.engines.products.x'],
                extra: (
                  <ArrowLink href="/products" className="mt-[18px]">
                    {boardCopy.seeProducts}
                  </ArrowLink>
                ),
              },
              {
                top: (
                  <>
                    <Tag bg="var(--color-accent)" color="var(--color-on-accent)">
                      {st.next}
                    </Tag>
                    <span className="type-label text-grey-400">03</span>
                  </>
                ),
                title: st.engines.ventures,
                body: copy['studio.engines.ventures.x'],
                dark: true,
              },
            ]}
          />
        </div>
      </InView>

      <InView as="section" data-msg={st.msg.how} className="relative bg-panel py-24 desk:py-40">
        <div className="wrap grid items-start gap-6 desk:grid-cols-12">
          <div className="desk:sticky desk:top-[120px] desk:col-span-5">
            <h2 className="type-h2 m-0 text-[clamp(44px,5.4vw,80px)]">
              <LineMask>{copy['studio.principles.h2']}</LineMask>
            </h2>
          </div>
          <ScrollSteps count={PRINCIPLES.length} className="desk:col-span-6 desk:col-start-7">
            {PRINCIPLES.map((n, i) => (
              <StepItem
                key={n}
                index={i}
                className="group py-9 text-text-dim transition-colors duration-[600ms] data-[active=true]:text-ink"
              >
                <div className="type-display text-[96px]" aria-hidden="true">
                  0{n}
                </div>
                <h3 className="type-h3 mt-[18px] mb-0 text-[32px]">
                  {copy[`home.studio.p.${n}.t`]}
                </h3>
                <p className="type-body mt-3 mb-0 group-data-[active=true]:text-grey-700">
                  {copy[`home.studio.p.${n}.x`]}
                </p>
              </StepItem>
            ))}
          </ScrollSteps>
        </div>
      </InView>

      <InView as="section" data-msg={st.msg.ventures} className="relative pt-10 pb-24 desk:pb-40">
        <div className="wrap">
          <Reveal as="h2" step={1} className="type-h2 mt-0 mb-14 text-[clamp(44px,5.4vw,80px)]">
            {copy['studio.ven.h2']}
          </Reveal>
          <Reveal step={2}>
            <VentureTiles
              variant="page"
              tiles={['raum', 'centiiv', 'clekey']}
              lines={{
                raum: copy['work.rows.4.line'],
                centiiv: copy['work.rows.5.line'],
                clekey: copy['work.rows.6.line'],
              }}
            />
          </Reveal>
        </div>
      </InView>

      <WaitlistSection
        source="studio"
        msg={st.msg.wait}
        lines={[copy['studio.wait.h2.1'], copy['studio.wait.h2.2']]}
        lead={copy['studio.wait.x']}
      />

      <InView as="section" data-msg={st.msg.where} className="relative py-24 desk:py-40">
        <div className="wrap">
          <Reveal as="h2" className="type-h2 m-0 text-[clamp(44px,5.4vw,80px)]">
            {copy['studio.loc.h2']}
          </Reveal>
          <Reveal as="p" className="type-lead mt-8 text-grey-700">
            {approved.studio['Working worldwide']}
          </Reveal>
        </div>
      </InView>
    </SiteChrome>
  );
}
