import {
  InView,
  LineMask,
  MorphTile,
  Parallax,
  Reveal,
  StackCard,
  StackCards,
} from '@studio/kit/motion';
import { ArrowLink, Tag } from '@studio/kit/ui';
import Link from 'next/link';
import { type ReactNode } from 'react';

import { ExchangePortfolio } from '@/components/mockups/ExchangePortfolio';
import { ExchangeSwap } from '@/components/mockups/ExchangeSwap';
import { JewelleryOffer } from '@/components/mockups/JewelleryOffer';
import { JewelleryProduct } from '@/components/mockups/JewelleryProduct';
import { JewellerySprite } from '@/components/mockups/JewellerySprite';
import { WispLockScreen } from '@/components/mockups/WispLockScreen';
import { WispOnboarding } from '@/components/mockups/WispOnboarding';
import { boardCopy, copy } from '@/content/copy';

interface CaseDef {
  n: 1 | 2 | 3;
  href: string;
  /** Card colours from HomeV6. */
  bg: string;
  fg: string;
  kicker: string;
  index: string;
  lead: string;
  tagBg: string;
  tagFg?: string;
  factBg: string;
  factFg: string;
  linkBg: string;
  linkFg: string;
  /** Visual column span on desktop. */
  visual: string;
  phones: ReactNode;
}

const CASES: CaseDef[] = [
  {
    n: 1,
    href: '/work/wisp',
    bg: '#00ff5a',
    fg: '#0c1a12',
    kicker: 'rgb(12 26 18 / 0.62)',
    index: 'rgb(12 26 18 / 0.5)',
    lead: 'rgb(12 26 18 / 0.78)',
    tagBg: 'rgb(12 26 18 / 0.1)',
    factBg: 'rgb(12 26 18 / 0.12)',
    factFg: '#0c1a12',
    linkBg: '#0c1a12',
    linkFg: '#00ff5a',
    visual: 'desk:col-start-7 desk:col-span-6',
    phones: (
      <>
        <Parallax mode="enter" distance={120} rotate={-4} className="absolute top-5 left-[4%]">
          <WispOnboarding />
        </Parallax>
        <Parallax mode="enter" distance={260} rotate={5} className="absolute top-[130px] left-1/2">
          <WispLockScreen />
        </Parallax>
      </>
    ),
  },
  {
    n: 2,
    href: '/work/naira-crypto-exchange',
    bg: 'var(--color-ink)',
    fg: 'var(--color-panel)',
    kicker: 'var(--color-grey-400)',
    index: '#6e6e6e',
    lead: 'var(--color-grey-300)',
    tagBg: 'var(--color-grey-850)',
    tagFg: 'var(--color-panel)',
    factBg: 'var(--color-grey-850)',
    factFg: 'var(--color-grey-400)',
    linkBg: 'var(--color-panel)',
    linkFg: 'var(--color-ink)',
    visual: 'desk:col-start-7 desk:col-span-6',
    phones: (
      <>
        <Parallax mode="enter" distance={120} rotate={-4} className="absolute top-2.5 left-[2%]">
          <ExchangePortfolio />
        </Parallax>
        <Parallax mode="enter" distance={260} rotate={5} className="absolute top-[120px] left-1/2">
          <ExchangeSwap />
        </Parallax>
      </>
    ),
  },
  {
    n: 3,
    href: '/work/jewellery-marketplace',
    bg: 'var(--color-panel)',
    fg: 'var(--color-ink)',
    kicker: 'var(--color-grey-600)',
    index: '#949494',
    lead: 'var(--color-grey-700)',
    tagBg: 'var(--color-grey-100)',
    factBg: 'var(--color-grey-100)',
    factFg: 'var(--color-grey-600)',
    linkBg: 'var(--color-ink)',
    linkFg: 'var(--color-panel)',
    visual: 'desk:col-start-6 desk:col-span-7',
    phones: (
      <>
        <Parallax mode="enter" distance={90} rotate={-4} className="absolute top-10 left-0">
          <JewelleryProduct />
        </Parallax>
        <Parallax mode="enter" distance={280} rotate={5} className="absolute top-[200px] right-0">
          <JewelleryOffer />
        </Parallax>
      </>
    ),
  },
];

/** "Products where the details mattered." with the three stacked case cards. */
export function Cases() {
  return (
    <section
      id="work"
      data-msg={copy['home.msg.3']}
      className="relative z-[3] bg-ground pt-40 pb-10"
    >
      <JewellerySprite />
      <InView at={0.82} className="wrap grid items-end gap-6 desk:grid-cols-12">
        <h2 className="type-display m-0 text-[clamp(56px,9.4vw,144px)] desk:col-span-9">
          {/* The deck line, split across three masked lines. Read once, from the sr-only copy. */}
          <span aria-hidden="true">
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
          </span>
          <span className="sr-only">{copy['home.work.h2']}</span>
        </h2>
        <Reveal step={2} className="pb-3.5 desk:col-span-3">
          <p className="type-body m-0 text-grey-700">{copy['home.work.intro']}</p>
          <ArrowLink href="/work" className="mt-5">
            {boardCopy.allWork}
          </ArrowLink>
        </Reveal>
      </InView>

      <StackCards
        top={24}
        scaleTo={0.93}
        shadeTo={0.55}
        className="mx-auto mt-24 max-w-[1520px] gap-6 px-6"
      >
        {CASES.map((c) => {
          const facts = boardCopy.cases[c.n - 1];
          return (
            <StackCard
              key={c.n}
              className="case-card"
              innerClassName="overflow-hidden rounded-[32px]"
            >
              <Link
                href={c.href}
                data-cursor={boardCopy.viewCase}
                className="case-link"
                style={{ background: c.bg, color: c.fg }}
              >
                <div className="grid h-full grid-cols-1 gap-y-6 px-[22px] py-7 desk:grid-cols-12 desk:gap-x-6 desk:px-12 desk:py-11">
                  <div className="flex min-h-0 flex-col desk:col-span-5">
                    <div className="flex items-baseline justify-between">
                      <span className="type-label" style={{ color: c.kicker }}>
                        0{c.n} · {copy[`home.work.case${c.n}.kicker`]}
                      </span>
                      <span
                        className="type-display text-[44px]"
                        style={{ color: c.index }}
                        aria-hidden="true"
                      >
                        0{c.n}/03
                      </span>
                    </div>
                    <h3 className="type-display mt-7 mb-0 text-[clamp(64px,6.6vw,104px)]">
                      {copy[`home.work.case${c.n}.title`]}
                    </h3>
                    <p className="type-lead mt-[22px] mb-0 max-w-[460px]" style={{ color: c.lead }}>
                      {copy[`home.work.case${c.n}.line`]}
                    </p>
                    <div className="mt-[22px] flex flex-wrap gap-2">
                      {facts?.tags.map((t) => (
                        <Tag key={t} bg={c.tagBg} color={c.tagFg}>
                          {t}
                        </Tag>
                      ))}
                    </div>
                    <div className="mt-8 desk:mt-auto">
                      {facts?.facts.map((f, i) => (
                        <div key={f} className="flex items-center gap-3.5 py-3.5">
                          <span
                            className="inline-flex h-[34px] w-[34px] flex-none items-center justify-center rounded-[10px] font-mono text-[11px]"
                            style={{ background: c.factBg, color: c.factFg }}
                            aria-hidden="true"
                          >
                            {String.fromCharCode(65 + i)}
                          </span>
                          <span className="text-[17px] font-medium">{f}</span>
                        </div>
                      ))}
                      <span
                        className="vlink mt-[18px]"
                        style={{ background: c.linkBg, color: c.linkFg }}
                      >
                        {boardCopy.viewCase}{' '}
                        <span className="arrow" aria-hidden="true">
                          ↗
                        </span>
                      </span>
                    </div>
                  </div>
                  <div
                    aria-hidden="true"
                    className={`relative h-[520px] overflow-hidden desk:h-auto desk:overflow-visible ${c.visual}`}
                  >
                    {c.phones}
                  </div>
                </div>
              </Link>
            </StackCard>
          );
        })}
      </StackCards>
    </section>
  );
}
