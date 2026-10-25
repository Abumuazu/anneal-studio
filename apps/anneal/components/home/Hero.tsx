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
  const words = row2.split(' ');
  const lastWord = words.pop() ?? '';
  const firstWords = words.join(' ');
  return (
    <section
      data-msg={copy['home.msg.1']}
      className="hero z-[1] overflow-hidden bg-ground max-desk:relative desk:sticky desk:top-0"
    >
      <HeroMotion>
        <h1 className="sr-only">{boardCopy.heroH1}</h1>
        <div
          aria-hidden="true"
          className="type-display text-ink max-desk:mt-[26px] desk:absolute desk:inset-x-[var(--spacing-gutter)] desk:top-[clamp(110px,17vh,156px)]"
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
              <span className="text-grey-550">
                {firstWords}
                <span className="max-desk:hidden"> {lastWord}</span>
              </span>
            </span>
          </div>
          {/* Phones set the last word of the middle row on a line of its own. */}
          <div data-hero-row="" className="hero-row desk:hidden">
            <span className="hw" style={delay(0.13)}>
              <span className="text-grey-550">{lastWord}</span>
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
          className="hfade max-desk:mt-7 max-desk:flex max-desk:flex-1 max-desk:flex-col desk:absolute desk:right-[var(--spacing-gutter)] desk:bottom-[92px] desk:w-[500px]"
          style={fade(0.62)}
        >
          <div className="hero-ask">
            <p className="type-label m-0 mb-2 text-grey-600 desk:hidden" aria-hidden="true">
              {boardCopy.askLabel}
            </p>
            <TypingLine
              rowClassName="desk:border-b desk:border-ink/15 desk:pb-3.5"
              prefix={boardCopy.heroAskPrefix}
              prefixClassName="text-[19px] font-medium text-grey-600 desk:text-[22px]"
              textClassName="text-[19px] font-medium leading-[1.3] text-ink desk:text-[22px] desk:leading-[30px]"
              answerClassName="type-label mt-1.5 mb-0 h-4 text-grey-600 desk:mt-3 desk:mb-[26px]"
              items={[
                { text: copy['hero.ask.1'], answer: copy['hero.ans.1'] },
                { text: copy['hero.ask.2'], answer: copy['hero.ans.2'] },
                { text: copy['hero.ask.3'], answer: copy['hero.ans.3'] },
              ]}
            />
          </div>
          <p className="type-lead m-0 text-[17px] text-grey-800 max-desk:mt-[22px] desk:text-[20px] desk:text-ink">
            {boardCopy.heroLead}
          </p>
          <div className="flex items-center gap-[26px] max-desk:mt-auto max-desk:flex-col max-desk:items-stretch max-desk:gap-2 max-desk:pt-6 desk:mt-[30px]">
            <ButtonLink href={site.startHref} handoff className="max-desk:justify-center">
              {boardCopy.workWithUs}
            </ButtonLink>
            <ArrowLink href="/work" className="max-desk:justify-center">
              {boardCopy.seePrices}
            </ArrowLink>
          </div>
        </div>

        <div
          className="hfade type-label absolute right-[var(--spacing-gutter)] bottom-8 left-[var(--spacing-gutter)] hidden items-center justify-between text-grey-600 desk:flex"
          style={fade(0.74)}
        >
          <span className="whitespace-nowrap">{boardCopy.heroFoot}</span>
          <span className="whitespace-nowrap">
            {boardCopy.scroll}{' '}
            <span className="bob" aria-hidden="true">
              ↓
            </span>
          </span>
        </div>
      </HeroMotion>
    </section>
  );
}
