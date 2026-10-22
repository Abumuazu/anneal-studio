import { ClipIn, HorizontalTrack, TrackCounter, TrackItem } from '@studio/kit/motion';
import { Glyph, type GlyphName } from '@studio/kit/ui';

import { type CopyKey, boardCopy, copy } from '@/content/copy';

const STEPS: { n: 1 | 2 | 3 | 4 | 5; glyph: GlyphName }[] = [
  { n: 1, glyph: 'g-dots' },
  { n: 2, glyph: 'g-cursor' },
  { n: 3, glyph: 'g-code' },
  { n: 4, glyph: 'g-arrow' },
  { n: 5, glyph: 'g-stack' },
];

const k = (n: number, part: string) => `home.proc.${n}.${part}` as CopyKey;

/** "Five stages": pinned on desktop while the cards scroll sideways; the current card turns white. */
export function Process() {
  return (
    <ClipIn className="relative z-[3] bg-ink text-panel">
      <HorizontalTrack
        id="process"
        data-msg={copy['home.msg.5']}
        label={copy['home.proc.h2']}
        count={STEPS.length}
        itemWidth={420}
        gap={20}
        padding={40}
        className="pt-[88px] desk:py-0"
        header={
          <div className="wrap w-full">
            <div className="flex items-end justify-between gap-4 desk:flex-wrap desk:gap-6">
              <h2 className="type-h2 m-0 max-w-[250px] text-[38px] desk:max-w-none desk:text-[clamp(40px,4.6vw,68px)]">
                {copy['home.proc.h2']}
              </h2>
              <span
                className="type-display flex-none text-[48px] desk:text-[64px]"
                aria-hidden="true"
              >
                0<TrackCounter pad={1} />
                <span className="text-grey-500">/05</span>
              </span>
            </div>
          </div>
        }
      >
        {STEPS.map((s, i) => (
          <TrackItem
            key={s.n}
            index={i}
            className="group flex h-[340px] w-[286px] flex-none flex-col rounded-3xl bg-grey-900 p-6 text-panel desk:h-[460px] desk:w-[300px] desk:p-7 transition-[background-color,color] duration-[600ms] ease-[var(--ease-reveal)] data-[active=true]:bg-panel data-[active=true]:text-ink desk:h-[clamp(300px,calc(100svh-290px),480px)] desk:w-[420px]"
          >
            <div className="flex items-start justify-between">
              <span
                aria-hidden="true"
                className="font-[family-name:var(--font-display)] text-[72px] leading-[0.78] text-[#666] desk:text-[#2e2e2e] transition-colors duration-[600ms] group-data-[active=true]:text-ink desk:text-[clamp(90px,calc((100svh-290px)*0.3),144px)]"
              >
                0{s.n}
              </span>
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-grey-800 desk:h-[50px] desk:w-[50px] desk:rounded-none text-panel transition-colors duration-500 group-data-[active=true]:bg-accent group-data-[active=true]:text-on-accent">
                <Glyph name={s.glyph} className="h-[56%] w-[56%]" />
              </span>
            </div>
            <div className="mt-auto flex items-baseline justify-between gap-3">
              <h3 className="type-h3 m-0 text-[30px] desk:text-4xl">{copy[k(s.n, 'name')]}</h3>
              <span className="type-label text-grey-400 group-data-[active=true]:text-grey-700">
                {copy[k(s.n, 'time')]}
              </span>
            </div>
            <p className="type-body mt-2.5 mb-0 text-[15px] text-grey-400 group-data-[active=true]:text-grey-700 desk:mt-3 desk:text-[17px]">
              {copy[k(s.n, 'line')]}
            </p>
          </TrackItem>
        ))}
      </HorizontalTrack>
      {/* Phones swipe the cards; a hint says so (HomeMobileV6). */}
      <p className="wrap type-label m-0 mt-5 pb-24 text-grey-400 desk:hidden">
        {boardCopy.swipe} <span aria-hidden="true">→</span>
      </p>
    </ClipIn>
  );
}
