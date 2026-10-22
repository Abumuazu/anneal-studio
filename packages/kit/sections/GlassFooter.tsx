import { type CSSProperties, type ReactNode } from 'react';

import { cx } from '../lib/cx';
import { PhysicsTiles, type TileDef } from '../motion/PhysicsTiles';
import { StretchWordmark } from '../motion/StretchWordmark';
import { FooterLink } from '../ui/Links';
import { type NavItem } from './NavLinks';

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
        'glass relative z-[2] -mt-[120px] rounded-t-[32px] pt-24 pb-10 text-panel shadow-[inset_0_1px_0_rgb(255_255_255/0.1)]',
        className,
      )}
      style={{ '--glass-bg': 'var(--color-glass-dark)' } as CSSProperties}
    >
      <div className="wrap">
        <div className="grid items-start gap-10 desk:grid-cols-[5fr_4fr_3fr]">
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

        <div className="relative mt-16">
          <span className="type-label absolute top-0 left-0 text-grey-400" aria-hidden="true">
            {playground.hint}
          </span>
          <PhysicsTiles tiles={playground.tiles} label={playground.hint} height={380} />
        </div>

        <StretchWordmark
          text={wordmark.text}
          label={wordmark.label}
          widthRatio={wordmark.widthRatio}
        />

        <div className="type-label mt-[30px] flex flex-wrap justify-between gap-5 text-grey-400">
          {legal}
        </div>
      </div>
    </footer>
  );
}
