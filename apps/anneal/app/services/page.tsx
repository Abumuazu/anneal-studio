import {
  ClipIn,
  ExpandGroup,
  ExpandItem,
  ExpandPanel,
  ExpandTrigger,
  InView,
  LineMask,
  MorphTile,
  Reveal,
} from '@studio/kit/motion';
import { ButtonLink, type GlyphName } from '@studio/kit/ui';
import { type ReactNode } from 'react';

import { SiteChrome } from '@/components/SiteChrome';
import { PageHero } from '@/components/pages/PageHero';
import { approved } from '@/content/approved';
import { copy } from '@/content/copy';
import { chromeCopy } from '@/content/pages';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: approved.meta.Services.title,
  description: approved.meta.Services.description,
  path: '/services',
});
const services = approved.services;
function Label({ className = '', children }: { className?: string; children: ReactNode }) {
  return <div className={`type-label mt-9 mb-3 first:mt-0 ${className}`}>{children}</div>;
}

function Rows({ items, row, num }: { items: string[]; row: string; num: string }) {
  return (
    <ol className="m-0 list-none p-0">
      {items.map((t, i) => (
        <li
          key={t}
          className={`row-nudge flex items-center gap-4 rounded-2xl px-4 py-4 desk:gap-5 desk:rounded-[20px] desk:px-6 desk:py-[22px] ${i % 2 === 0 ? row : ''}`}
        >
          <span
            className={`type-label w-6 flex-none text-[11px] desk:w-[30px] ${num}`}
            aria-hidden="true"
          >
            {String(i + 1).padStart(2, '0')}
          </span>
          <span className="text-[17px] font-medium desk:text-[20px]">{t}</span>
        </li>
      ))}
    </ol>
  );
}

function Big({
  glyph,
  phase,
  background,
  color,
}: {
  glyph: GlyphName;
  phase: number;
  background: string;
  color: string;
}) {
  return (
    <MorphTile
      glyphs={[glyph]}
      phase={phase}
      background={background}
      color={color}
      className="max-desk:!text-[72px]"
      style={{ fontSize: 154, margin: 0 }}
    />
  );
}

function ServiceSection({
  offer,
  index,
}: {
  offer: (typeof services.offers)[number];
  index: number;
}) {
  const dark = index === 3;
  return (
    <ClipIn
      id={offer.id}
      data-msg={offer.name}
      className={`relative py-24 desk:py-[150px] ${dark ? 'bg-ink text-panel' : index === 1 ? 'bg-grey-150' : index === 2 ? 'bg-grey-300' : 'bg-panel'}`}
    >
      <InView className="wrap grid items-start gap-6 desk:grid-cols-12">
        <div className="desk:sticky desk:top-[120px] desk:col-span-5">
          <div className="flex items-center gap-4">
            <Big
              glyph={offer.glyph}
              phase={index * 3}
              background={dark ? 'var(--color-accent)' : 'var(--color-ink)'}
              color={dark ? 'var(--color-on-accent)' : 'var(--color-panel)'}
            />
            <span className="type-display text-[72px] desk:text-[120px]" aria-hidden="true">
              0{index + 1}
            </span>
          </div>
          <h2 className="type-display mt-6 mb-0 text-[clamp(56px,6.4vw,96px)] desk:mt-9">
            <LineMask>{offer.name}</LineMask>
          </h2>
          <Reveal as="p" className="type-lead mt-5 max-w-[460px] text-[20px] desk:text-[22px]">
            {offer.lead}
          </Reveal>
          <Reveal
            as="p"
            className={`type-body max-w-[460px] ${dark ? 'text-grey-300' : 'text-grey-700'}`}
          >
            {offer.Timing}
          </Reveal>
          <ButtonLink
            href="/start"
            handoff
            className="mt-6"
            bg={dark ? 'var(--color-accent)' : 'var(--color-ink)'}
            fg={dark ? 'var(--color-on-accent)' : 'var(--color-panel)'}
          >
            {offer.Action}
          </ButtonLink>
        </div>
        <Reveal className="desk:col-span-6 desk:col-start-7">
          <Label>What the starting scope covers</Label>
          <Rows
            items={offer['What the starting scope covers'].split('; ')}
            row={dark ? 'bg-grey-900' : 'bg-ground'}
            num={dark ? 'text-grey-400' : 'text-grey-700'}
          />
          {'Progress' in offer && <p className="type-body mt-6">{offer.Progress}</p>}
          <Label>What we need</Label>
          <p className="type-body m-0">{offer['What we need']}</p>
          <Label>Quoted separately</Label>
          <p className={`type-body m-0 ${dark ? 'text-grey-300' : 'text-grey-700'}`}>
            {offer['Quoted separately']}
          </p>
        </Reveal>
      </InView>
    </ClipIn>
  );
}

export default function ServicesPage() {
  return (
    <SiteChrome
      variant="page"
      closingMsg={chromeCopy.closingMsgServices}
      footerMsg={chromeCopy.footerMsg}
    >
      <PageHero
        lines={[copy['services.h1.1'], copy['services.h1.2'], copy['services.h1.3']]}
        glyphs={['g-spark', 'g-app', 'g-code', 'g-arrow']}
        tile={{ background: 'var(--color-ink)', color: 'var(--color-panel)' }}
        msg="Website, AI feature, Web MVP or Mobile MVP."
        size="text-[clamp(72px,12vw,190px)]"
      >
        <div className="mt-14 grid items-end gap-6 desk:grid-cols-12">
          <Reveal as="p" className="type-lead m-0 text-grey-700 desk:col-span-6">
            {services.lead}
          </Reveal>
          <nav
            aria-label="On this page"
            className="flex flex-wrap gap-2 desk:col-span-5 desk:col-start-8 desk:justify-end"
          >
            {[
              ...services.offers.map((o) => [o.id, o.name]),
              ...services.capabilities.map((c) => [c.id, c.name]),
              ['together', 'Working together'],
              ['faq', 'Questions'],
            ].map(([id, name]) => (
              <a key={id} href={`#${id}`} className="jump">
                {name}
              </a>
            ))}
          </nav>
        </div>
      </PageHero>
      {services.offers.map((offer, index) => (
        <ServiceSection key={offer.id} offer={offer} index={index} />
      ))}
      {services.capabilities.map((c, i) => (
        <ClipIn
          key={c.id}
          id={c.id}
          data-msg={c.name}
          className={`relative py-24 desk:py-[150px] ${i === 0 ? 'bg-accent text-on-accent' : i === 1 ? 'bg-panel' : 'bg-grey-150'}`}
        >
          <InView className="wrap grid items-start gap-6 desk:grid-cols-12">
            <div className="desk:sticky desk:top-[120px] desk:col-span-5">
              <h2 className="type-display m-0 text-[clamp(52px,5.6vw,84px)]">
                <LineMask>{c.name}</LineMask>
              </h2>
              <Reveal
                as="p"
                className="type-lead mt-7 mb-0 max-w-[38ch] text-[20px] desk:text-[22px]"
              >
                {c.lead}
              </Reveal>
            </div>
            <Reveal className="desk:col-span-6 desk:col-start-7">
              <ol className="m-0 list-none p-0">
                {c['What we can work on'].split('; ').map((item, index) => (
                  <li
                    key={item}
                    className="grid grid-cols-[28px_1fr] items-baseline gap-4 border-b border-current/15 py-5 first:pt-0 last:border-0"
                  >
                    <span className="type-label" aria-hidden="true">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="type-body text-[17px] desk:text-[18px]">{item}</span>
                  </li>
                ))}
              </ol>
            </Reveal>
          </InView>
        </ClipIn>
      ))}
      <InView
        as="section"
        id="together"
        data-msg="Start with a project or ongoing work."
        className="relative py-24 desk:py-40"
      >
        <div className="wrap">
          <Reveal as="h2" className="type-display m-0 text-[clamp(56px,7vw,104px)]">
            Working together
          </Reveal>
          <div className="mt-14 grid gap-4 desk:grid-cols-2">
            {[
              {
                title: 'Defined project',
                body: services.project,
                action: 'Discuss a project',
              },
              {
                title: 'Monthly partnership',
                body: services.partnership,
                action: 'Discuss ongoing work',
              },
            ].map((e, i) => (
              <Reveal
                key={e.title}
                className={`flex flex-col rounded-3xl p-7 desk:p-10 ${i ? 'bg-ink text-panel' : 'bg-panel'}`}
              >
                <h3 className="type-display m-0 text-[48px] desk:text-[clamp(48px,4.6vw,68px)]">
                  {e.title}
                </h3>
                {e.body.split('\n\n').map((p) => (
                  <p
                    key={p}
                    className={`type-body mt-6 mb-0 max-w-[48ch] text-[17px] desk:text-[18px] ${i ? 'text-grey-300' : 'text-grey-700'}`}
                  >
                    {p}
                  </p>
                ))}
                <ButtonLink
                  href="/start"
                  handoff
                  className="mt-8 self-start desk:mt-10"
                  bg={i ? 'var(--color-accent)' : undefined}
                  fg={i ? 'var(--color-on-accent)' : undefined}
                >
                  {e.action}
                </ButtonLink>
              </Reveal>
            ))}
          </div>
        </div>
      </InView>
      <InView
        as="section"
        id="faq"
        data-msg="Questions before we begin."
        className="relative py-24 desk:py-40"
      >
        <div className="wrap grid gap-6 desk:grid-cols-12">
          <Reveal
            as="h2"
            className="type-display m-0 text-[clamp(52px,6vw,88px)] desk:sticky desk:top-[120px] desk:col-span-4"
          >
            Questions before we begin
          </Reveal>
          <ExpandGroup
            defaultOpen={0}
            className="flex flex-col gap-3 desk:col-span-7 desk:col-start-6"
          >
            {services.faq.map((faq, i) => (
              <ExpandItem
                key={faq.question}
                index={i}
                className="faq-item overflow-hidden rounded-[22px] bg-panel"
              >
                <h3 className="m-0">
                  <ExpandTrigger className="flex w-full cursor-pointer items-center gap-5 border-0 bg-transparent px-6 py-7 text-left text-inherit desk:px-8">
                    <span className="flex-1 font-text text-[19px] font-medium leading-[1.25] tracking-[-0.02em] desk:text-[22px]">
                      {faq.question}
                    </span>
                    <span className="faq-x" aria-hidden="true">
                      +
                    </span>
                  </ExpandTrigger>
                </h3>
                <ExpandPanel className="px-6 pb-[30px] desk:px-8">
                  <p className="type-body m-0 text-grey-700">{faq.answer}</p>
                </ExpandPanel>
              </ExpandItem>
            ))}
          </ExpandGroup>
        </div>
      </InView>
    </SiteChrome>
  );
}
