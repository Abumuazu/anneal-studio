import { MorphTile } from '@studio/kit/motion';
import { ArrowLink, ButtonLink } from '@studio/kit/ui';
import { type CSSProperties } from 'react';

import { boardCopy, copy } from '@/content/copy';
import { site } from '@/content/site.config';

import { HeroMotion } from './HeroMotion';

const delay = (s: number) => ({ '--hw-delay': `${s}s` }) as CSSProperties;
const fade = (s: number) => ({ '--hf-delay': `${s}s` }) as CSSProperties;

/** The original three looping tiles, with a compact headline and a direct invitation. */
export function Hero() {
  const [row1, row2, row3] = boardCopy.heroRows;
  return (
    <section
      aria-labelledby="hero-heading"
      data-msg={copy['home.msg.1']}
      className="hero z-[1] overflow-hidden bg-ground max-desk:relative desk:sticky desk:top-0"
    >
      <HeroMotion>
        <div className="hero-layout">
          <h1 id="hero-heading" className="hero-heading type-display text-ink">
            <span data-hero-row="" className="hero-row">
              <span className="hw" style={delay(0)}>
                <span>{row1}</span>
              </span>
              <span data-hero-tile="1" className="inline-flex" aria-hidden="true">
                <MorphTile
                  glyphs={['g-spark', 'g-code', 'g-app', 'g-cursor']}
                  background="var(--color-ink)"
                  color="var(--color-panel)"
                />
              </span>
            </span>{' '}
            <span data-hero-row="" className="hero-row">
              <span data-hero-tile="2" className="inline-flex" aria-hidden="true">
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
            </span>{' '}
            <span data-hero-row="" className="hero-row hero-row-last">
              <span className="hw" style={delay(0.18)}>
                <span>{row3}</span>
              </span>
              <span data-hero-tile="3" className="inline-flex" aria-hidden="true">
                <MorphTile
                  glyphs={['g-arrow', 'g-app', 'g-cursor', 'g-dots']}
                  phase={2}
                  background="var(--color-accent)"
                  color="var(--color-on-accent)"
                />
              </span>
            </span>
          </h1>

          <div className="hero-copy hfade" style={fade(0.5)}>
            <p className="hero-positioning type-label text-grey-600">
              {boardCopy.heroLabels.slice(0, 2).join(' · ')}
            </p>
            <p className="hero-lead type-lead">{copy['hero.lead']}</p>
            <p className="hero-partnership type-body text-grey-700">{copy['hero.partnership']}</p>
            <div className="hero-actions">
              <ButtonLink href={site.startHref} handoff>
                {copy['hero.cta']}
              </ButtonLink>
              <ArrowLink href="/work">{copy['hero.work']}</ArrowLink>
            </div>
          </div>
        </div>

        <div className="hero-foot hfade type-label text-grey-600" style={fade(0.62)}>
          <ul className="hero-services" aria-label={boardCopy.nav.services}>
            {boardCopy.heroLabels.map((label) => (
              <li key={label}>{label}</li>
            ))}
          </ul>
          <span className="hero-scroll" aria-hidden="true">
            {boardCopy.scroll} <span className="bob">↓</span>
          </span>
        </div>
      </HeroMotion>
    </section>
  );
}
