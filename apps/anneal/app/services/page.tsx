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
  ScrollSteps,
  StepItem,
} from '@studio/kit/motion';
import { ArrowLink, ButtonLink, CurrencySwitch, type GlyphName, Price } from '@studio/kit/ui';
import type { Metadata } from 'next';
import { type ReactNode } from 'react';

import { PriceText } from '@/components/PriceText';
import { SiteChrome } from '@/components/SiteChrome';
import { PageHero } from '@/components/pages/PageHero';
import { type CopyKey, boardCopy, copy, lines } from '@/content/copy';
import { CURRENCY_COOKIE, currencyOptions } from '@/content/currency';
import { chromeCopy, servicesCopy as sc } from '@/content/pages';
import { type Offer, priceValues } from '@/content/prices';
import { site } from '@/content/site.config';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Services',
  description: copy['services.lead'],
  path: '/services',
});

type Key = 'site' | 'ai' | 'web' | 'mobile';

interface Theme {
  surface: string;
  /** Big index number, at least 3:1 on the surface (large text). */
  index: string;
  label: string;
  row: string;
  rowNum: string;
  not: string;
}

// Surfaces from ServicesV6 (s1 to s4). Small greys lifted to meet WCAG AA.
const THEMES: Record<Key, Theme> = {
  site: {
    surface: 'bg-panel text-ink',
    index: '#949494',
    label: 'text-grey-600',
    row: 'bg-grey-50',
    rowNum: 'text-grey-600',
    not: 'text-grey-600',
  },
  ai: {
    surface: 'bg-grey-150 text-ink',
    index: '#828282',
    label: 'text-grey-600',
    row: 'bg-grey-50',
    rowNum: 'text-grey-600',
    not: 'text-grey-600',
  },
  web: {
    surface: 'bg-grey-300 text-ink',
    index: '#616161',
    label: 'text-grey-700',
    row: 'bg-[#cdcdcd]',
    rowNum: 'text-grey-700',
    not: 'text-grey-700',
  },
  mobile: {
    surface: 'bg-ink text-panel',
    index: '#6e6e6e',
    label: 'text-grey-400',
    row: 'bg-grey-900',
    rowNum: 'text-grey-400',
    not: 'text-grey-300',
  },
};

const SERVICES: {
  id: string;
  key: Key;
  glyph: GlyphName;
  offer: Offer;
  phase: number;
  inc: number;
  needs?: boolean;
}[] = [
  { id: 's1', key: 'site', glyph: 'g-web', offer: 'website', phase: 0, inc: 8, needs: true },
  { id: 's2', key: 'ai', glyph: 'g-spark', offer: 'aiFeature', phase: 3, inc: 8 },
  { id: 's3', key: 'web', glyph: 'g-code', offer: 'webMvp', phase: 6, inc: 8 },
  { id: 's4', key: 'mobile', glyph: 'g-app', offer: 'mobileMvp', phase: 9, inc: 8 },
];

const s = (key: string) => copy[`services.${key}` as CopyKey];

function Label({ className, children }: { className: string; children: ReactNode }) {
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

function ServiceSection({ def }: { def: (typeof SERVICES)[number] }) {
  const t = THEMES[def.key];
  const dark = def.key === 'mobile';
  const n = SERVICES.indexOf(def) + 1;
  return (
    <ClipIn
      id={def.id}
      data-msg={s(`${def.key}.name`)}
      className={`relative py-24 desk:py-[150px] ${t.surface}`}
    >
      <InView className="wrap grid items-start gap-6 desk:grid-cols-12">
        <div className="desk:sticky desk:top-[120px] desk:col-span-5">
          <div className="flex items-center gap-3.5 desk:gap-5">
            <Big
              glyph={def.glyph}
              phase={def.phase}
              background={dark ? 'var(--color-accent)' : 'var(--color-ink)'}
              color={dark ? 'var(--color-on-accent)' : 'var(--color-panel)'}
            />
            <span
              className="type-display text-[72px] desk:text-[120px]"
              style={{ color: t.index }}
              aria-hidden="true"
            >
              0{n}
            </span>
          </div>
          <h2 className="type-display mt-6 mb-0 text-[clamp(56px,6.4vw,96px)] desk:mt-9">
            <LineMask>{s(`${def.key}.name`)}</LineMask>
          </h2>
          <Reveal
            as="p"
            className="type-h3 mt-4 mb-0 max-w-[460px] text-[24px] desk:mt-[22px] desk:text-[28px]"
          >
            {s(`${def.key}.promise`)}
          </Reveal>
          <Reveal step={1} className="mt-8">
            <div className="flex items-baseline gap-3">
              <span className={`type-label ${t.label}`}>{boardCopy.from}</span>
              <Price
                values={priceValues(def.offer)}
                className="type-display-wide text-[clamp(30px,3vw,44px)]"
              />
            </div>
            <div className={`type-label mt-3 ${t.label}`}>{s(`${def.key}.time`)}</div>
            <ButtonLink
              href={site.startHref}
              handoff
              className="mt-6"
              bg={dark ? 'var(--color-accent)' : 'var(--color-ink)'}
              fg={dark ? 'var(--color-on-accent)' : 'var(--color-panel)'}
              fill={dark ? 'var(--color-panel)' : undefined}
              fillFg={dark ? 'var(--color-ink)' : undefined}
            >
              {copy[`home.price.${def.key}.cta` as CopyKey]}
            </ButtonLink>
          </Reveal>
        </div>
        <Reveal className="desk:col-span-6 desk:col-start-7">
          <Label className={t.label}>{sc.labels.get}</Label>
          <Rows
            items={Array.from({ length: def.inc }, (_, i) => s(`${def.key}.inc.${i + 1}`))}
            row={t.row}
            num={t.rowNum}
          />
          {def.needs ? (
            <>
              <Label className={t.label}>{sc.labels.need}</Label>
              <p className="type-body m-0 max-w-[520px]">{s(`${def.key}.need`)}</p>
            </>
          ) : null}
          <Label className={t.label}>{sc.labels.notIncluded}</Label>
          <ul className="m-0 list-none p-0">
            {[1, 2, 3].map((i) => (
              <li key={i} className={`px-4 py-1.5 text-[16px] desk:px-6 desk:text-[17px] ${t.not}`}>
                <span aria-hidden="true">× </span>
                {s(`${def.key}.not.${i}`)}
              </li>
            ))}
          </ul>
          <Label className={t.label}>{sc.labels.bestFor}</Label>
          <p className="type-body m-0 max-w-[520px]">{s(`${def.key}.for`)}</p>
        </Reveal>
      </InView>
    </ClipIn>
  );
}

function GrowthSection() {
  const name = s('growth.name');
  const [l1, l2] = lines(name, [2]);
  const row = 'bg-[rgb(255_255_255/0.14)]';
  return (
    <ClipIn
      id="s5"
      data-msg={name}
      className="relative bg-accent py-24 desk:py-[150px] text-on-accent"
    >
      <InView className="wrap grid items-start gap-6 desk:grid-cols-12">
        <div className="desk:sticky desk:top-[120px] desk:col-span-5">
          <div className="flex items-center gap-3.5 desk:gap-5">
            <Big
              glyph="g-stack"
              phase={1.5}
              background="var(--color-ink)"
              color="var(--color-panel)"
            />
            <span className="type-display text-[72px] desk:text-[120px]" aria-hidden="true">
              05
            </span>
          </div>
          <h2 className="type-display mt-6 mb-0 text-[clamp(52px,5.6vw,84px)] leading-[0.9] desk:mt-9">
            <span aria-hidden="true">
              <LineMask line={0}>{l1}</LineMask>
              <LineMask line={1}>{l2}</LineMask>
            </span>
            <span className="sr-only">{name}</span>
          </h2>
          <Reveal
            as="p"
            className="type-h3 mt-4 mb-0 max-w-[460px] text-[24px] desk:mt-[22px] desk:text-[28px]"
          >
            {s('growth.promise')}
          </Reveal>
          <Reveal step={1} className="mt-8 flex flex-wrap gap-7">
            {(
              [
                [sc.labels.careFrom, 'care'],
                [sc.labels.growthFrom, 'growth'],
              ] as const
            ).map(([label, offer]) => (
              <div key={offer}>
                <div className="type-label">{label}</div>
                <div className="mt-2 flex items-baseline">
                  <Price values={priceValues(offer)} className="type-display-wide text-[34px]" />
                  <span className="type-label ml-2">{boardCopy.perMonth}</span>
                </div>
              </div>
            ))}
          </Reveal>
          <Reveal step={2}>
            <ButtonLink
              href={site.startHref}
              handoff
              className="mt-7"
              bg="var(--color-ink)"
              fg="var(--color-panel)"
              fill="var(--color-panel)"
              fillFg="var(--color-ink)"
            >
              {copy['home.price.growth.cta']}
            </ButtonLink>
          </Reveal>
        </div>
        <Reveal className="desk:col-span-6 desk:col-start-7">
          <Label className="">{sc.labels.care}</Label>
          <Rows items={[1, 2, 3, 4, 5].map((i) => s(`growth.care.inc.${i}`))} row={row} num="" />
          <Label className="">{sc.labels.growth}</Label>
          <Rows
            items={[1, 2, 3, 4, 5, 6].map((i) => s(`growth.growth.inc.${i}`))}
            row={row}
            num=""
          />
          <Label className="">{sc.labels.sprint}</Label>
          <p className="type-body m-0 max-w-[520px]">
            <PriceText text={s('growth.sprint')} />
          </p>
          <Label className="">{sc.labels.howItRuns}</Label>
          <p className="type-body m-0 max-w-[520px]">{s('growth.terms')}</p>
          <Label className="">{sc.labels.bestFor}</Label>
          <p className="type-body m-0 max-w-[520px]">{s('growth.for')}</p>
        </Reveal>
      </InView>
    </ClipIn>
  );
}

const FAQ_COUNT = 10;
const PROC = [1, 2, 3, 4, 5] as const;

export default function ServicesPage() {
  const [h1, h2, h3] = [s('h1.1'), s('h1.2'), s('h1.3')];
  const [close1, close2] = lines(s('close.h2'), [3]);
  return (
    <SiteChrome
      variant="page"
      closingMsg={chromeCopy.closingMsgServices}
      footerMsg={chromeCopy.footerMsg}
    >
      <PageHero
        lines={[h1, h2, h3]}
        glyphs={['g-spark', 'g-app', 'g-code', 'g-arrow']}
        tile={{ background: 'var(--color-ink)', color: 'var(--color-panel)' }}
        msg={sc.msg.hero}
        size="text-[clamp(72px,12vw,190px)]"
      >
        <div className="mt-14 grid items-end gap-6 desk:grid-cols-12">
          <div className="desk:col-span-6">
            <Reveal as="p" className="type-lead m-0 text-grey-700">
              {s('lead')}
            </Reveal>
            <Reveal step={1} className="mt-7">
              <CurrencySwitch
                options={currencyOptions}
                cookie={CURRENCY_COOKIE}
                label={boardCopy.currencyGroup}
                prefix={
                  <span className="type-label mr-1.5 text-grey-600">{boardCopy.pricesIn}</span>
                }
              />
            </Reveal>
          </div>
          <Reveal
            step={2}
            className="flex flex-wrap gap-2 desk:col-span-5 desk:col-start-8 desk:justify-end"
          >
            {[
              ['#s1', s('site.name')],
              ['#s2', s('ai.name')],
              ['#s3', s('web.name')],
              ['#s4', s('mobile.name')],
              ['#s5', sc.jump.growth],
              ['#faq', sc.jump.questions],
            ].map(([href, label]) => (
              <a key={href} href={href} className="jump">
                {label}
              </a>
            ))}
          </Reveal>
        </div>
      </PageHero>

      {SERVICES.map((def) => (
        <ServiceSection key={def.id} def={def} />
      ))}
      <GrowthSection />

      <InView as="section" data-msg={sc.msg.addons} className="relative pt-24 desk:pt-40 pb-20">
        <div className="wrap">
          <Reveal as="h2" className="type-h2 m-0 text-[clamp(44px,5.4vw,80px)]">
            {s('addons.h2')}
          </Reveal>
          <div className="mt-14 grid gap-3.5 sm:grid-cols-2 desk:grid-cols-5">
            {[1, 2, 3, 4, 5].map((i) => (
              <Reveal
                key={i}
                step={((i - 1) % 3) as 0 | 1 | 2}
                className="flex min-h-[240px] flex-col rounded-[22px] bg-panel p-[26px]"
              >
                <h3 className="type-h3 m-0 text-2xl">{s(`addons.${i}.t`)}</h3>
                <div className="type-display-wide mt-3.5 text-[26px]">
                  <PriceText text={s(`addons.${i}.price`)} />
                </div>
                <p className="type-body mt-3 mb-0 text-base text-grey-700">{s(`addons.${i}.x`)}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </InView>

      <InView as="section" data-msg={sc.msg.custom} className="relative pt-20 pb-24 desk:pb-40">
        <div className="wrap">
          <Reveal as="h2" className="type-h2 m-0 text-[clamp(44px,5.4vw,80px)]">
            {s('custom.h2')}
          </Reveal>
          <div className="mt-14 grid gap-4 desk:grid-cols-2">
            <Reveal className="flex min-h-[300px] flex-col rounded-3xl bg-panel p-9">
              <h3 className="type-h3 mt-auto mb-0 text-4xl">{s('custom.design.t')}</h3>
              <p className="type-body mt-3 mb-0 max-w-[520px] text-grey-700">
                {s('custom.design.x')}
              </p>
              <ArrowLink href={site.startHref} handoff className="mt-5">
                {s('custom.design.cta')}
              </ArrowLink>
            </Reveal>
            <Reveal
              step={1}
              className="flex min-h-[300px] flex-col rounded-3xl bg-ink p-9 text-panel"
            >
              <h3 className="type-h3 mt-auto mb-0 text-4xl">{s('custom.bigger.t')}</h3>
              <p className="type-body mt-3 mb-0 max-w-[520px] text-grey-300">
                {s('custom.bigger.x')}
              </p>
              <ButtonLink
                href={site.startHref}
                handoff
                className="mt-[22px] self-start"
                bg="var(--color-accent)"
                fg="var(--color-on-accent)"
                fill="var(--color-panel)"
                fillFg="var(--color-ink)"
              >
                {s('custom.bigger.cta')}
              </ButtonLink>
            </Reveal>
          </div>
        </div>
      </InView>

      <InView as="section" data-msg={sc.msg.money} className="relative bg-panel py-24 desk:py-40">
        <div className="wrap grid items-start gap-6 desk:grid-cols-12">
          <div className="desk:sticky desk:top-[120px] desk:col-span-4">
            <Reveal as="h2" className="type-h2 m-0 text-[clamp(44px,5vw,72px)]">
              {s('money.h2')}
            </Reveal>
          </div>
          <div className="flex flex-col gap-2.5 desk:col-span-7 desk:col-start-6">
            {[1, 2, 3, 4].map((i) => (
              <Reveal
                key={i}
                className="grid grid-cols-[60px_minmax(0,1fr)] items-center gap-6 rounded-3xl bg-grey-50 px-8 py-[30px]"
              >
                <span className="type-display text-[56px]" aria-hidden="true">
                  0{i}
                </span>
                <div>
                  <h3 className="type-h3 m-0 text-[26px]">{s(`money.${i}.t`)}</h3>
                  <p className="type-body mt-2 mb-0 text-grey-700">{s(`money.${i}.x`)}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </InView>

      <ClipIn data-msg={sc.msg.every} className="relative bg-ink py-24 desk:py-40 text-panel">
        <InView className="wrap">
          <Reveal as="h2" className="type-h2 m-0 max-w-[900px] text-[clamp(44px,5.4vw,80px)]">
            {s('every.h2')}
          </Reveal>
          <div className="mt-16 grid gap-4 desk:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => {
              const accent = i === 6;
              return (
                <Reveal
                  key={i}
                  step={((i - 1) % 3) as 0 | 1 | 2}
                  className={`flex min-h-[250px] flex-col rounded-3xl p-[30px] ${accent ? 'bg-accent text-on-accent' : 'bg-grey-900'}`}
                >
                  <div
                    className={`type-display text-[72px] ${accent ? '' : 'text-accent'}`}
                    aria-hidden="true"
                  >
                    0{i}
                  </div>
                  <h3 className="type-h3 mt-auto mb-0 text-[26px]">{s(`every.${i}.t`)}</h3>
                  <p className={`type-body mt-2.5 mb-0 ${accent ? '' : 'text-grey-300'}`}>
                    {s(`every.${i}.x`)}
                  </p>
                </Reveal>
              );
            })}
          </div>
        </InView>
      </ClipIn>

      <InView as="section" data-msg={sc.msg.process} className="relative bg-panel py-24 desk:py-40">
        <div className="wrap">
          <Reveal as="h2" className="type-h2 mt-0 mb-14 text-[clamp(44px,5.4vw,80px)]">
            {s('proc.h2')}
          </Reveal>
          <ScrollSteps count={PROC.length} className="flex flex-col gap-1.5">
            {PROC.map((n, i) => (
              <StepItem
                key={n}
                index={i}
                className="group grid grid-cols-[60px_1fr] items-center gap-6 rounded-3xl bg-grey-50 px-8 py-[30px] text-grey-600 transition-colors duration-[600ms] data-[active=true]:text-ink data-[active=true]:data-[scrubbing=true]:bg-ink data-[active=true]:data-[scrubbing=true]:text-panel desk:grid-cols-[120px_minmax(0,3fr)_minmax(0,5fr)_160px]"
              >
                <span
                  className="type-display text-[72px] group-data-[active=true]:group-data-[scrubbing=true]:text-accent"
                  aria-hidden="true"
                >
                  0{n}
                </span>
                <h3 className="type-h3 m-0 text-[34px]">{copy[`home.proc.${n}.name`]}</h3>
                <p className="type-body m-0 hidden group-data-[active=true]:text-grey-700 group-data-[active=true]:group-data-[scrubbing=true]:text-grey-300 desk:block">
                  {copy[`home.proc.${n}.line`]}
                </p>
                <span className="type-label hidden text-right group-data-[active=true]:group-data-[scrubbing=true]:text-grey-300 desk:block">
                  {copy[`home.proc.${n}.time`]}
                </span>
              </StepItem>
            ))}
          </ScrollSteps>
        </div>
      </InView>

      <InView as="section" id="faq" data-msg={sc.msg.faq} className="relative py-24 desk:py-40">
        <div className="wrap grid items-start gap-6 desk:grid-cols-12">
          <div className="desk:sticky desk:top-[120px] desk:col-span-4">
            <Reveal as="h2" className="type-h2 m-0 text-[clamp(44px,5vw,72px)]">
              {sc.faqHeading}
            </Reveal>
          </div>
          <ExpandGroup
            defaultOpen={0}
            className="flex flex-col gap-2.5 desk:col-span-7 desk:col-start-6"
          >
            {Array.from({ length: FAQ_COUNT }, (_, i) => (
              <ExpandItem
                key={i}
                index={i}
                className="faq-item overflow-hidden rounded-[22px] bg-panel"
              >
                <h3 className="m-0">
                  <ExpandTrigger className="flex w-full cursor-pointer items-center gap-5 border-0 bg-transparent px-8 py-7 text-left text-inherit">
                    <span className="type-h3 flex-1 text-2xl">{s(`faq.${i + 1}.q`)}</span>
                    <span className="faq-x" aria-hidden="true">
                      +
                    </span>
                  </ExpandTrigger>
                </h3>
                <ExpandPanel className="px-8 pb-[30px]">
                  <p className="type-body m-0 max-w-[640px] text-grey-700">
                    <PriceText text={s(`faq.${i + 1}.a`)} />
                  </p>
                </ExpandPanel>
              </ExpandItem>
            ))}
          </ExpandGroup>
        </div>
      </InView>

      <ClipIn
        data-msg={sc.msg.close}
        className="relative bg-ink pt-24 desk:pt-[170px] pb-24 desk:pb-[150px] text-panel"
      >
        <InView className="wrap">
          <h2 className="type-display-wide m-0 text-[clamp(48px,6.6vw,104px)]">
            <span aria-hidden="true">
              <LineMask line={0}>{close1}</LineMask>
              <LineMask line={1}>
                <span className="text-grey-500">{close2}</span>
              </LineMask>
            </span>
            <span className="sr-only">{s('close.h2')}</span>
          </h2>
          <Reveal as="p" className="type-lead mt-9 mb-0 max-w-[560px] text-grey-300">
            {s('close.x')}
          </Reveal>
          <Reveal step={2} className="mt-10 flex flex-wrap items-center gap-3.5">
            <ButtonLink
              href={site.startHref}
              handoff
              size="xl"
              bg="var(--color-accent)"
              fg="var(--color-on-accent)"
              fill="var(--color-panel)"
              fillFg="var(--color-ink)"
            >
              {sc.bookCall}
            </ButtonLink>
            <ArrowLink href={site.startHref} handoff className="text-grey-300">
              {sc.orSendBrief}
            </ArrowLink>
          </Reveal>
        </InView>
      </ClipIn>
    </SiteChrome>
  );
}
