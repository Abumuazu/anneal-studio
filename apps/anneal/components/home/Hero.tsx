import { MorphTile, TypingLine } from '@studio/kit/motion';
import { ArrowLink, ButtonLink } from '@studio/kit/ui';
import { type CSSProperties } from 'react';

import { boardCopy, copy } from '@/content/copy';
import { site } from '@/content/site.config';

import { HeroMotion } from './HeroMotion';

const delay = (s: number) => ({ '--hw-delay': `${s}s` }) as CSSProperties;
const fade = (s: number) => ({ '--hf-delay': `${s}s` }) as CSSProperties;

/** Home hero: three headline rows with morphing tiles, labels, the typing line and the lead. */
export function Hero() {
  const [row1, row2, row3] = boardCopy.heroRows;
  return (
    <section
      data-nav-after=""
      data-msg={copy['home.msg.1']}
      className="hero sticky top-0 z-[1] overflow-hidden bg-ground"
    >
      <HeroMotion>
        <h1 className="sr-only">{boardCopy.heroH1}</h1>
        <div
          aria-hidden="true"
          className="type-display absolute inset-x-[var(--spacing-gutter-sm)] top-[clamp(110px,17vh,156px)] text-ink desk:inset-x-[var(--spacing-gutter)]"
        >
          <div data-hero-row="" className="hero-row">
            <span className="hw" style={delay(0)}>
              <span>{row1}</span>
            </span>
            <span data-hero-tile="1" className="inline-flex">
              <MorphTile
                glyphs={['g-spark', 'g-code', 'g-app', 'g-cursor']}
                background="var(--color-ink)"
                color="var(--color-panel)"
              />
            </span>
          </div>
          <div data-hero-row="" className="hero-row">
            <span data-hero-tile="2" className="inline-flex">
              <MorphTile
                glyphs={['g-dots', 'g-stack', 'g-arrow', 'g-spark']}
                phase={1}
                background="var(--color-ink)"
                color="var(--color-panel)"
                style={{ marginLeft: 0 }}
              />
            </span>
            <span className="hw" style={delay(0.09)}>
              <span className="text-grey-550">{row2}</span>
            </span>
          </div>
          <div data-hero-row="" className="hero-row">
            <span className="hw" style={delay(0.18)}>
              <span>{row3}</span>
            </span>
            <span data-hero-tile="3" className="inline-flex">
              <MorphTile
                glyphs={['g-arrow', 'g-app', 'g-cursor', 'g-dots']}
                phase={2}
                background="var(--color-accent)"
                color="var(--color-on-accent)"
              />
            </span>
          </div>
        </div>

        <ul
          className="hfade type-label absolute top-[186px] right-[var(--spacing-gutter)] m-0 hidden list-none grid-cols-[auto_auto] gap-x-10 gap-y-2.5 p-0 text-grey-600 desk:grid"
          style={fade(0.5)}
        >
          {boardCopy.heroLabels.map((l) => (
            <li key={l}>{l}</li>
          ))}
        </ul>

        <div
          className="hfade absolute right-[var(--spacing-gutter)] bottom-[92px] hidden w-[500px] desk:block"
          style={fade(0.62)}
        >
          <TypingLine
            rowClassName="border-b border-ink/15 pb-3.5"
            prefix={boardCopy.heroAskPrefix}
            prefixClassName="text-[22px] font-medium text-grey-600"
            textClassName="text-[22px] font-medium leading-[30px] text-ink"
            answerClassName="type-label mt-3 mb-[26px] h-4 text-grey-600"
            items={[
              { text: copy['hero.ask.1'], answer: copy['hero.ans.1'] },
              { text: copy['hero.ask.2'], answer: copy['hero.ans.2'] },
              { text: copy['hero.ask.3'], answer: copy['hero.ans.3'] },
            ]}
          />
          <p className="type-lead m-0 text-[20px]">{boardCopy.heroLead}</p>
          <div className="mt-[30px] flex items-center gap-[26px]">
            <ButtonLink href={site.startHref} handoff>
              {boardCopy.workWithUs}
            </ButtonLink>
            <ArrowLink href="#ways" arrow="↓">
              {boardCopy.seePrices}
            </ArrowLink>
          </div>
        </div>

        <div
          className="hfade type-label absolute right-[var(--spacing-gutter-sm)] bottom-8 left-[var(--spacing-gutter-sm)] flex items-center justify-between text-grey-600 desk:right-[var(--spacing-gutter)] desk:left-[var(--spacing-gutter)]"
          style={fade(0.74)}
        >
          <span className="whitespace-nowrap">{boardCopy.heroFoot}</span>
          <span className="whitespace-nowrap">
            {boardCopy.scroll}{' '}
            <span className="bob" aria-hidden="true">
              ↓
            </span>
          </span>
          {/* Three items wrap on phones; keep two there. */}
          <span className="hidden sm:inline">{boardCopy.cities}</span>
        </div>
      </HeroMotion>
    </section>
  );
}
