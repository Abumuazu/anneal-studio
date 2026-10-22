import { InView, LineMask, Reveal, ScrollSteps, StepItem, WordLight } from '@studio/kit/motion';
import { ArrowLink, LiveClock, Tag, ZoneName } from '@studio/kit/ui';
import type { Metadata } from 'next';
import Image from 'next/image';

import { SiteChrome } from '@/components/SiteChrome';
import { VentureTiles } from '@/components/VentureTiles';
import { PageHero } from '@/components/pages/PageHero';
import { Tracks } from '@/components/pages/Tracks';
import { WaitlistSection } from '@/components/pages/WaitlistSection';
import { boardCopy, copy } from '@/content/copy';
import { chromeCopy, studioCopy as st } from '@/content/pages';
import { site } from '@/content/site.config';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Studio',
  description: copy['studio.lead'],
  path: '/studio',
});

const PRINCIPLES = [1, 2, 3, 4] as const;

export default function StudioPage() {
  const [lagos, barcelona] = site.cities;
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

      <InView as="section" data-msg={st.msg.team} className="relative py-24 desk:py-40">
        <div className="wrap">
          <div className="grid items-end gap-6 desk:grid-cols-12">
            <Reveal
              as="h2"
              step={1}
              className="type-h2 m-0 text-[clamp(44px,5.4vw,80px)] desk:col-span-7"
            >
              {copy['studio.team.h2']}
            </Reveal>
            <Reveal
              as="p"
              step={2}
              className="type-body m-0 text-grey-700 desk:col-span-4 desk:col-start-9"
            >
              {copy['studio.team.x']}
            </Reveal>
          </div>
          <ul className="mt-9 grid max-w-[340px] list-none p-0 desk:mt-16">
            <Reveal as="li" className="overflow-hidden rounded-3xl bg-panel">
              <div className="relative h-[340px] bg-grey-150">
                <Image
                  src="/images/team-muazu-abu.jpg"
                  alt={st.founder.name}
                  fill
                  sizes="340px"
                  className="object-cover object-[50%_22%]"
                />
              </div>
              <div className="p-3.5 desk:p-[22px]">
                <h3 className="type-h3 m-0 text-[16px] desk:text-[22px]">{st.founder.name}</h3>
                <p className="type-label mt-2 mb-0 text-grey-600">{st.founder.role}</p>
              </div>
            </Reveal>
          </ul>
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
          <Reveal as="h2" step={1} className="type-h2 mt-0 mb-14 text-[clamp(44px,5.4vw,80px)]">
            {copy['studio.loc.h2']}
          </Reveal>
          <div className="grid gap-5 desk:grid-cols-2">
            <Reveal className="rounded-[28px] bg-panel p-10">
              <div className="type-label text-grey-600">{st.lagosZone}</div>
              <div className="type-display mt-[30px] text-[clamp(120px,14vw,220px)]">
                <LiveClock timeZone={lagos.timeZone} />
              </div>
              <div className="type-display-wide mt-5 text-[30px]">{lagos.name}</div>
            </Reveal>
            <Reveal step={1} className="rounded-[28px] bg-ink p-10 text-panel">
              <div className="type-label text-grey-400">
                {barcelona.name} ·{' '}
                <ZoneName timeZone={barcelona.timeZone} fallback={barcelona.zone} />
              </div>
              <div className="type-display mt-[30px] text-[clamp(120px,14vw,220px)]">
                <LiveClock timeZone={barcelona.timeZone} />
              </div>
              <div className="type-display-wide mt-5 text-[30px]">{barcelona.name}</div>
            </Reveal>
          </div>
        </div>
      </InView>
    </SiteChrome>
  );
}
