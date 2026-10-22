import {
  ExpandGroup,
  ExpandItem,
  ExpandPanel,
  ExpandTrigger,
  InView,
  LineMask,
} from '@studio/kit/motion';
import { Glyph, type GlyphName, Tag } from '@studio/kit/ui';
import { type CSSProperties } from 'react';

import { type CopyKey, copy, list } from '@/content/copy';

type Key = 'site' | 'ai' | 'web' | 'mobile';

interface Block {
  key: Key;
  glyph: GlyphName;
  /** Wide blocks span both columns and lay their copy out in three columns. */
  wide: boolean;
  surface: string;
  numClass: string;
  bodyClass: string;
  tagBg: string;
  dark?: boolean;
}

// Surfaces and greys from HomeV6 (b1 to b4).
const BLOCKS: Block[] = [
  {
    key: 'site',
    glyph: 'g-web',
    wide: true,
    surface: 'bg-panel text-ink',
    numClass: 'text-grey-600',
    bodyClass: 'text-grey-700',
    tagBg: 'var(--color-grey-100)',
  },
  {
    key: 'ai',
    glyph: 'g-spark',
    wide: false,
    surface: 'bg-grey-150 text-ink',
    numClass: 'text-grey-600',
    bodyClass: 'text-grey-700',
    tagBg: 'var(--color-grey-50)',
  },
  {
    key: 'web',
    glyph: 'g-code',
    wide: false,
    surface: 'bg-grey-300 text-ink',
    numClass: 'text-grey-700',
    bodyClass: 'text-grey-800',
    tagBg: '#d6d6d6',
  },
  {
    key: 'mobile',
    glyph: 'g-app',
    wide: true,
    surface: 'bg-ink text-panel',
    numClass: 'text-grey-400',
    bodyClass: 'text-grey-300',
    tagBg: 'var(--color-grey-800)',
    dark: true,
  },
];

const k = (key: Key, part: string) => `home.build.${key}.${part}` as CopyKey;

/** "Four things we build": one block open at a time; hover opens, click toggles. */
export function Builds() {
  return (
    <InView
      as="section"
      id="services"
      data-msg={copy['home.msg.2']}
      at={0.82}
      className="relative z-[3] bg-ground"
    >
      <div className="wrap pt-[88px] pb-8 desk:pt-[120px] desk:pb-16">
        <h2 className="type-h2 m-0 text-[clamp(44px,5.4vw,80px)]">{copy['home.build.h2']}</h2>
      </div>
      <ExpandGroup hoverOpens defaultOpen={0} className="grid desk:grid-cols-2">
        {BLOCKS.map((b, i) => (
          <ExpandItem
            key={b.key}
            index={i}
            className={`${b.surface} ${b.wide ? 'desk:col-span-2' : ''}`}
          >
            <h3 className="m-0">
              <ExpandTrigger className="build-trigger box-border flex min-h-[92px] w-full cursor-pointer items-center gap-3.5 border-0 bg-transparent px-5 py-[18px] text-left text-inherit desk:min-h-[124px] desk:gap-6 desk:px-10 desk:py-7">
                <span
                  className="build-tile"
                  style={
                    {
                      '--tile-bg': b.dark ? 'var(--color-panel)' : 'var(--color-ink)',
                      '--tile-fg': b.dark ? 'var(--color-ink)' : 'var(--color-panel)',
                    } as CSSProperties
                  }
                >
                  <Glyph name={b.glyph} className="h-[56%] w-[56%]" />
                </span>
                <span className={`type-label min-w-[22px] desk:min-w-[54px] ${b.numClass}`}>
                  0{i + 1}
                </span>
                <span className="type-display text-[42px] desk:text-[clamp(36px,4.4vw,64px)]">
                  <LineMask>{copy[k(b.key, 'name')]}</LineMask>
                </span>
                <span className="build-go ml-auto" aria-hidden="true">
                  ↗
                </span>
              </ExpandTrigger>
            </h3>
            <ExpandPanel
              className={`grid grid-cols-1 gap-y-3.5 px-5 pb-8 desk:grid-cols-12 desk:gap-x-6 desk:gap-y-[18px] desk:px-0 desk:pr-10 desk:pb-[52px] ${b.wide ? 'desk:pl-[124px]' : 'desk:pl-10'}`}
            >
              <p
                className={`type-h3 m-0 ${b.wide ? 'text-[24px] desk:text-[34px] desk:col-span-5' : 'text-[24px] desk:text-[30px] desk:col-span-12'}`}
              >
                {copy[k(b.key, 'promise')]}
              </p>
              <p
                className={`type-body m-0 ${b.bodyClass} ${b.wide ? 'desk:col-span-4' : 'desk:col-span-10'}`}
              >
                {copy[k(b.key, 'body')]}
              </p>
              <div
                className={`flex flex-wrap gap-2 ${b.wide ? 'content-start desk:col-span-3' : 'items-center desk:col-span-12'}`}
              >
                {list(k(b.key, 'tags')).map((t) => (
                  <Tag key={t} bg={b.tagBg}>
                    {t}
                  </Tag>
                ))}
                <span
                  className={`type-label opacity-80 max-desk:mt-1 max-desk:w-full ${b.wide ? 'mt-2.5 w-full' : 'ml-2.5'}`}
                >
                  {copy[k(b.key, 'time')]}
                </span>
              </div>
            </ExpandPanel>
          </ExpandItem>
        ))}
      </ExpandGroup>
    </InView>
  );
}
