import {
  ClipIn,
  ExpandGroup,
  ExpandItem,
  ExpandPanel,
  ExpandTrigger,
  FlexTile,
  FlexTiles,
  HorizontalTrack,
  InView,
  LineMask,
  Marquee,
  MorphTile,
  Parallax,
  Reveal,
  ScrollSteps,
  StackCard,
  StackCards,
  StepItem,
  TrackCounter,
  TrackItem,
  TypingLine,
  WordLight,
  Zoom,
} from '@studio/kit/motion';
import {
  ArrowLink,
  ButtonLink,
  CurrencySwitch,
  GLYPHS,
  Glyph,
  type GlyphName,
  LiveClock,
  MotionToggle,
  PillLink,
  Price,
  Tag,
} from '@studio/kit/ui';
import type { Metadata } from 'next';
import { type ReactNode } from 'react';

import { Mark } from '@/components/Mark';
import { SiteChrome } from '@/components/SiteChrome';
import { chromeCopy } from '@/content/pages';
import { ExchangeSwap } from '@/components/mockups/ExchangeSwap';
import { WispOnboarding } from '@/components/mockups/WispOnboarding';
import { boardCopy, copy } from '@/content/copy';
import { CURRENCY_COOKIE, currencyOptions } from '@/content/currency';
import { priceValues } from '@/content/prices';
import { site } from '@/content/site.config';

export const metadata: Metadata = {
  title: 'Kitchen sink · Anneal Studio',
  robots: { index: false, follow: false },
};

/*
 * Every kit primitive on one page, for review and for visual tests. Section
 * titles are component names (developer labels, not site copy). Demo content
 * comes from the copy deck.
 */

function Demo({
  id,
  name,
  note,
  dark = false,
  children,
}: {
  id: string;
  name: string;
  note: string;
  dark?: boolean;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      data-msg={name}
      aria-labelledby={`${id}-title`}
      className={dark ? 'bg-ink py-24 text-panel' : 'py-24'}
    >
      <div className="wrap">
        <div className="mb-10 flex flex-wrap items-baseline justify-between gap-4 border-b border-current/15 pb-4">
          <h2 id={`${id}-title`} className="type-h3 text-[28px]">
            {name}
          </h2>
          <p className={`type-label ${dark ? 'text-grey-400' : 'text-grey-600'}`}>{note}</p>
        </div>
        {children}
      </div>
    </section>
  );
}

const swatches = [
  ['ground', 'bg-ground'],
  ['ink', 'bg-ink'],
  ['panel', 'bg-panel'],
  ['accent', 'bg-accent'],
  ['grey-150', 'bg-grey-150'],
  ['grey-300', 'bg-grey-300'],
  ['grey-400', 'bg-grey-400'],
  ['grey-600', 'bg-grey-600'],
  ['grey-700', 'bg-grey-700'],
] as const;

const steps = [1, 2, 3, 4, 5] as const;
const principles = [1, 2, 3, 4] as const;
const cases = [
  { title: copy['home.work.case1.title'], bg: 'bg-[#00ff5a]', fg: 'text-[#0c1a12]' },
  { title: copy['home.work.case2.title'], bg: 'bg-ink', fg: 'text-panel' },
  { title: copy['home.work.case3.title'], bg: 'bg-panel', fg: 'text-ink' },
];

export default function KitchenSinkPage() {
  return (
    <SiteChrome variant="page" closingMsg={copy['home.msg.8']} footerMsg={chromeCopy.footerMsg}>
      <div className="wrap pt-36 pb-10">
        <h1 className="type-display text-[clamp(64px,10vw,156px)]">Kitchen sink</h1>
      </div>

      <div className="sticky top-3 z-30 flex justify-center">
        <MotionToggle label="Reduced motion" className="shadow-lg" />
      </div>

      <Demo id="tokens" name="Tokens" note="design/README.md brand tokens">
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-5 desk:grid-cols-9">
          {swatches.map(([name, cls]) => (
            <div key={name}>
              <div className={`${cls} h-20 rounded-2xl border border-ink/10`} />
              <p className="type-label mt-2 text-grey-600">{name}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 space-y-6">
          <p className="type-display text-[96px]">{copy['home.price.site.name']}</p>
          <p className="type-display-wide text-[54px]">{boardCopy.brand}</p>
          <p className="type-h2 text-[56px]">{copy['home.proc.h2']}</p>
          <p className="type-h3 text-[32px]">{copy['home.studio.p.2.t']}</p>
          <p className="type-lead max-w-[640px]">{copy['start.lead']}</p>
          <p className="type-body max-w-[640px] text-grey-700">{copy['home.work.intro']}</p>
          <p className="type-label text-grey-600">{copy['hero.ans.1']}</p>
        </div>
      </Demo>

      <Demo
        id="ui"
        name="UI"
        note="ButtonLink, ArrowLink, PillLink, Tag, Price, CurrencySwitch, Glyph, Mark, LiveClock"
      >
        <div className="flex flex-wrap items-center gap-6">
          <ButtonLink href="#ui">{boardCopy.workWithUs}</ButtonLink>
          <ButtonLink href="#ui" size="sm">
            {copy['home.price.site.name']}
          </ButtonLink>
          <ArrowLink href="#ui">{copy['closing.cta2']}</ArrowLink>
          <PillLink href="#ui">{boardCopy.workWithUs}</PillLink>
          <Tag>{copy['home.proc.1.name']}</Tag>
          <Tag bg="var(--color-panel)">{copy['home.proc.2.name']}</Tag>
        </div>
        <div className="mt-10 flex flex-wrap items-end gap-10">
          <div>
            <p className="type-label text-grey-600">{copy['home.price.site.name']}</p>
            <p className="mt-2 flex items-baseline gap-2.5">
              <span className="type-label text-grey-600">{boardCopy.from}</span>
              <Price values={priceValues('website')} className="type-display-wide text-[30px]" />
            </p>
          </div>
          <CurrencySwitch
            options={currencyOptions}
            cookie={CURRENCY_COOKIE}
            label={boardCopy.currencyGroup}
          />
        </div>
        <div className="mt-10 flex flex-wrap items-center gap-6">
          {(Object.keys(GLYPHS) as GlyphName[]).map((g) => (
            <span
              key={g}
              className="inline-flex h-14 w-14 items-center justify-center bg-ink text-panel"
            >
              <Glyph name={g} className="h-[56%] w-[56%]" />
            </span>
          ))}
          <Mark size={56} live />
          <span className="type-display text-[56px]">
            <LiveClock timeZone={site.cities[0].timeZone} />
          </span>
        </div>
      </Demo>

      <Demo id="reveal" name="InView + Reveal + LineMask" note="rv and ml, 0.9 of the viewport">
        <InView className="type-display text-[clamp(56px,9.4vw,144px)]">
          <LineMask line={0}>Products where</LineMask>
          <LineMask line={1}>
            <span className="text-grey-550">the details</span>
            <MorphTile
              glyphs={['g-code', 'g-spark', 'g-stack', 'g-app']}
              phase={1}
              background="var(--color-ink)"
              color="var(--color-panel)"
            />
          </LineMask>
          <LineMask line={2}>mattered.</LineMask>
        </InView>
        <InView className="mt-12 grid gap-4 desk:grid-cols-3">
          {principles.slice(0, 3).map((n, i) => (
            <Reveal key={n} step={(i + 1) as 1 | 2 | 3} className="rounded-3xl bg-panel p-8">
              <p className="type-h3 text-2xl">{copy[`home.studio.p.${n}.t`]}</p>
              <p className="type-body mt-3 text-grey-700">{copy[`home.studio.p.${n}.x`]}</p>
            </Reveal>
          ))}
        </InView>
      </Demo>

      <Demo id="typing" name="TypingLine" note="three examples, paused off screen">
        <TypingLine
          className="max-w-[500px]"
          prefix={boardCopy.heroAskPrefix}
          prefixClassName="text-[22px] font-medium text-grey-600"
          textClassName="text-[22px] font-medium"
          answerClassName="type-label mt-3 mb-6 text-grey-600"
          items={[
            { text: copy['hero.ask.1'], answer: copy['hero.ans.1'] },
            { text: copy['hero.ask.2'], answer: copy['hero.ans.2'] },
            { text: copy['hero.ask.3'], answer: copy['hero.ans.3'] },
          ]}
        />
      </Demo>

      <Demo id="words" name="WordLight" note="data-words, lit by scroll">
        <div className="rounded-[32px] bg-panel p-12">
          <WordLight
            text={copy['home.studio.statement']}
            className="type-h2 max-w-[900px] text-[clamp(32px,3.4vw,50px)] leading-[1.12]"
          />
        </div>
      </Demo>

      <Demo id="parallax" name="Parallax" note="data-par, desktop only">
        <div className="relative h-[520px] overflow-hidden rounded-[32px] bg-panel">
          <Parallax distance={160} className="absolute top-24 left-[10%]">
            <MorphTile
              glyphs={['g-spark']}
              background="var(--color-ink)"
              color="var(--color-panel)"
              style={{ fontSize: 160 }}
            />
          </Parallax>
          <Parallax distance={-120} rotate={6} className="absolute top-40 left-[45%]">
            <MorphTile
              glyphs={['g-app']}
              phase={1}
              background="var(--color-accent)"
              color="var(--color-on-accent)"
              style={{ fontSize: 200 }}
            />
          </Parallax>
          <Parallax distance={260} mode="enter" rotate={-4} className="absolute top-20 right-[8%]">
            <MorphTile
              glyphs={['g-code']}
              phase={2}
              background="var(--color-grey-700)"
              color="var(--color-panel)"
              style={{ fontSize: 140 }}
            />
          </Parallax>
        </div>
      </Demo>

      <ClipIn className="bg-ink text-panel" data-msg="ClipIn">
        <div className="wrap py-32">
          <p className="type-label text-grey-400">ClipIn · data-clip, desktop only</p>
          <p className="type-h2 mt-6 text-[clamp(40px,4.6vw,68px)]">{copy['home.proc.h2']}</p>
        </div>
      </ClipIn>

      <Demo id="zoom" name="Zoom" note="data-zoom, desktop only">
        <div className="relative h-[420px] overflow-hidden rounded-[32px]">
          <Zoom className="absolute inset-0 flex items-center justify-center bg-accent text-on-accent">
            <Mark size={180} live cycle={3.2} />
          </Zoom>
        </div>
      </Demo>

      <Demo id="stack" name="StackCards" note="sticky stack, under 1300px tall">
        <StackCards top={24} className="gap-6">
          {cases.map((c, i) => (
            <StackCard
              key={c.title}
              className="h-[clamp(420px,70vh,640px)]"
              innerClassName={`${c.bg} ${c.fg} overflow-hidden rounded-[32px] p-12`}
              data-cursor={boardCopy.viewCase}
            >
              <span className="type-label">0{i + 1}/03</span>
              <h3 className="type-display mt-7 text-[clamp(64px,6.6vw,104px)]">{c.title}</h3>
            </StackCard>
          ))}
        </StackCards>
      </Demo>

      <HorizontalTrack
        label={copy['home.proc.h2']}
        count={steps.length}
        itemWidth={420}
        gap={20}
        padding={40}
        data-msg={copy['home.proc.h2']}
        className="bg-ink text-panel"
        header={
          <div className="wrap flex w-full flex-wrap items-end justify-between gap-6 pt-16 pb-9">
            <h2 className="type-h2 text-[clamp(40px,4.6vw,68px)]">{copy['home.proc.h2']}</h2>
            <span className="type-display text-[64px]">
              <TrackCounter />
              <span className="text-grey-500">/05</span>
            </span>
          </div>
        }
      >
        {steps.map((n, i) => (
          <TrackItem
            key={n}
            index={i}
            className="flex h-[clamp(300px,calc(100svh-290px),480px)] w-[300px] flex-none flex-col rounded-3xl bg-grey-900 p-7 transition-colors duration-500 data-[active=true]:bg-panel data-[active=true]:text-ink desk:w-[420px]"
          >
            <span className="type-display text-[120px] leading-[0.78] opacity-40">0{n}</span>
            <div className="mt-auto flex items-baseline justify-between gap-3">
              <span className="type-h3 text-4xl">{copy[`home.proc.${n}.name`]}</span>
              <span className="type-label opacity-60">{copy[`home.proc.${n}.time`]}</span>
            </div>
            <p className="type-body mt-3 text-[17px] opacity-70">{copy[`home.proc.${n}.line`]}</p>
          </TrackItem>
        ))}
      </HorizontalTrack>

      <Demo id="steps" name="ScrollSteps" note="one principle lit at a time, desktop only">
        <ScrollSteps
          count={principles.length}
          className="max-w-[620px] rounded-[32px] bg-panel px-12"
        >
          {principles.map((n, i) => (
            <StepItem
              key={n}
              index={i}
              className="py-10 text-text-dim transition-colors duration-500 data-[active=true]:text-ink"
            >
              <div className="type-display text-[96px]">0{n}</div>
              <div className="type-h3 mt-4 text-[32px]">{copy[`home.studio.p.${n}.t`]}</div>
              <p className="type-body mt-3">{copy[`home.studio.p.${n}.x`]}</p>
            </StepItem>
          ))}
        </ScrollSteps>
      </Demo>

      <Demo id="marquee" name="Marquee" note="speed follows scroll velocity" dark>
        <div className="type-display-wide -mx-[var(--spacing-gutter-sm)] overflow-hidden desk:-mx-[var(--spacing-gutter)] text-[clamp(40px,6vw,96px)]">
          <Marquee direction={-1}>{copy['closing.m1']}</Marquee>
          <Marquee direction={1} className="text-grey-500">
            {copy['closing.m2']}
          </Marquee>
        </div>
      </Demo>

      <Demo id="cursor" name="CursorLabel" note="data-cursor, fine pointers only">
        <div
          data-cursor={boardCopy.viewCase}
          className="flex h-72 items-center justify-center rounded-[32px] bg-panel"
        >
          <span className="type-display text-[64px]">{copy['home.work.case1.title']}</span>
        </div>
      </Demo>

      <Demo id="expand" name="ExpandGroup" note="one open at a time; hover opens, click toggles">
        <ExpandGroup hoverOpens defaultOpen={0} className="flex flex-col gap-2">
          {principles.map((n, i) => (
            <ExpandItem key={n} index={i} className="rounded-3xl bg-panel">
              <h3 className="m-0">
                <ExpandTrigger className="type-h3 w-full cursor-pointer border-0 bg-transparent px-8 py-6 text-left text-2xl text-inherit">
                  {copy[`home.studio.p.${n}.t`]}
                </ExpandTrigger>
              </h3>
              <ExpandPanel className="px-8 pb-6">
                <p className="type-body m-0 text-grey-700">{copy[`home.studio.p.${n}.x`]}</p>
              </ExpandPanel>
            </ExpandItem>
          ))}
        </ExpandGroup>
      </Demo>

      <Demo id="flex" name="FlexTiles" note="hover or focus widens a tile">
        <FlexTiles className="flex flex-col gap-4 desk:h-[320px] desk:flex-row">
          {(['site', 'ai', 'web'] as const).map((key, i) => (
            <FlexTile
              key={key}
              index={i}
              className="flex-tile flex items-end rounded-[28px] bg-ink p-8 text-panel"
            >
              <a href="#flex" className="type-display text-[48px]">
                {copy[`home.build.${key}.name`]}
              </a>
            </FlexTile>
          ))}
        </FlexTiles>
      </Demo>

      <Demo id="frames" name="PhoneFrame + BrowserFrame" note="scaled product shots, decorative">
        <div aria-hidden="true" className="flex flex-wrap gap-10">
          <WispOnboarding />
          <ExchangeSwap />
        </div>
      </Demo>

      <Demo
        id="handoff"
        name="HandoffLink"
        note="Work with us morph, then the destination lifts it away"
      >
        <div className="flex flex-wrap items-center gap-6">
          <ButtonLink href={site.startHref} handoff>
            {boardCopy.workWithUs}
          </ButtonLink>
          <PillLink href="/kitchen-sink" handoff>
            {boardCopy.workWithUs}
          </PillLink>
        </div>
        <p className="type-label mt-6 text-grey-600">
          The pill targets this page, to check the arrival plays without a route change. The footer
          below holds PhysicsTiles and StretchWordmark; the closing above it holds Marquee and
          ClipIn.
        </p>
      </Demo>
    </SiteChrome>
  );
}
