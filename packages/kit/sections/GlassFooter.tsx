import { type CSSProperties, type ReactNode } from 'react';

import { cx } from '../lib/cx';
import { PhysicsTiles, type TileDef } from '../motion/PhysicsTiles';
import { StretchWordmark } from '../motion/StretchWordmark';
import { FooterLink } from '../ui/Links';
import { type NavItem } from './NavLinks';

/** A tile that sits still on phones: a position in the cluster, and its tilt. */
export interface RestTile {
  size: number;
  radius: string;
  background: string;
  color: string;
  /** Glyph id from the sprite. */
  glyph: string;
  /** Distance from the left edge of the cluster, as a percentage of its width. */
  left: number;
  /** Distance from the bottom of the cluster, in px. */
  bottom: number;
  /** Tilt in degrees. */
  rotate?: number;
}

interface GlassFooterProps {
  navLabel: string;
  links: readonly NavItem[];
  /** Middle column (city clocks). */
  middle?: ReactNode;
  /** Right column (contact, currency switch, call to action). */
  aside?: ReactNode;
  playground: {
    tiles: readonly TileDef[];
    /** Visible hint and the playground's accessible name. */
    hint: string;
    /**
     * Phones show these instead of the playground: tiles you can throw have no
     * room in a narrow box, and the board keeps them still there.
     */
    restTiles?: readonly RestTile[];
  };
  wordmark: {
    text: string;
    label: string;
    widthRatio?: number;
  };
  /** Bottom row items (copyright, privacy, back to top). */
  legal: ReactNode;
  /** Floating nav message while the footer is in view. */
  msg?: string;
  className?: string;
}

/**
 * A frosted footer that slides up over the sticky closing section, with
 * throwable tiles and a full-width wordmark.
 */
export function GlassFooter({
  navLabel,
  links,
  middle,
  aside,
  playground,
  wordmark,
  legal,
  msg,
  className,
}: GlassFooterProps) {
  return (
    <footer
      data-msg={msg}
      className={cx(
        'glass relative z-[2] -mt-12 rounded-t-[28px] pt-14 pb-7 text-panel shadow-[inset_0_1px_0_rgb(255_255_255/0.1)] desk:-mt-[120px] desk:rounded-t-[32px] desk:pt-24 desk:pb-10',
        className,
      )}
      style={{ '--glass-bg': 'var(--color-glass-dark)' } as CSSProperties}
    >
      <div className="wrap">
        <div className="grid items-start gap-9 desk:grid-cols-[5fr_4fr_3fr] desk:gap-10">
          <nav aria-label={navLabel} className="flex flex-col gap-1">
            {links.map((l) => (
              <FooterLink key={l.href} href={l.href} handoff={l.handoff}>
                {l.label}
              </FooterLink>
            ))}
          </nav>
          {middle}
          {aside}
        </div>

        <div className="relative mt-16 max-desk:hidden">
          <span className="type-label absolute top-0 left-0 text-grey-400" aria-hidden="true">
            {playground.hint}
          </span>
          <PhysicsTiles tiles={playground.tiles} label={playground.hint} height={380} />
        </div>
        {playground.restTiles ? (
          <div
            aria-hidden="true"
            data-rest-tiles=""
            className="relative mt-10 h-[150px] desk:hidden"
          >
            {playground.restTiles.map((t, i) => (
              <span
                key={i}
                className="absolute flex items-center justify-center"
                style={{
                  left: `${t.left}%`,
                  bottom: t.bottom,
                  width: t.size,
                  height: t.size,
                  borderRadius: t.radius,
                  background: t.background,
                  color: t.color,
                  transform: t.rotate ? `rotate(${t.rotate}deg)` : undefined,
                }}
              >
                <svg viewBox="0 0 48 48" className="h-[48%] w-[48%]">
                  <use href={`#${t.glyph}`} />
                </svg>
              </span>
            ))}
          </div>
        ) : null}

        <StretchWordmark
          text={wordmark.text}
          label={wordmark.label}
          widthRatio={wordmark.widthRatio}
        />

        <div className="type-label mt-7 grid grid-cols-2 gap-x-3 gap-y-3.5 text-grey-400 max-desk:[&>:nth-child(even)]:text-right desk:mt-[30px] desk:flex desk:flex-wrap desk:justify-between desk:gap-5">
          {legal}
        </div>
      </div>
    </footer>
  );
}
