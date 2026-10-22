import { LineMask, MorphTile } from '@studio/kit/motion';
import { type GlyphName } from '@studio/kit/ui';
import { type ReactNode } from 'react';

interface PageHeroProps {
  /** Three headline lines, word for word from the deck. The middle one is dimmed and carries a tile. */
  lines: readonly [string, string, string];
  glyphs: readonly GlyphName[];
  tile: { background: string; color: string };
  msg: string;
  size: string;
  children?: ReactNode;
}

/** Inner-page hero: a masked three-line headline with a morphing tile, then the lead. Reveals on load. */
export function PageHero({ lines, glyphs, tile, msg, size, children }: PageHeroProps) {
  const [a, b, c] = lines;
  return (
    <section
      data-msg={msg}
      className="reveal-on-load relative pt-[136px] desk:pt-[200px] pb-16 desk:pb-[120px]"
    >
      <div className="wrap">
        <h1 className={`type-display m-0 ${size}`}>
          <span aria-hidden="true">
            <LineMask line={0}>{a}</LineMask>
            <LineMask line={1}>
              <span className="text-grey-550">{b}</span>
              <MorphTile glyphs={glyphs} background={tile.background} color={tile.color} />
            </LineMask>
            <LineMask line={2}>{c}</LineMask>
          </span>
          <span className="sr-only">{`${a} ${b} ${c}`}</span>
        </h1>
        {children}
      </div>
    </section>
  );
}
