import { InView, Parallax, Reveal } from '@studio/kit/motion';
import { ArrowLink, ButtonLink, Glyph } from '@studio/kit/ui';
import { type CSSProperties } from 'react';

import { approved } from '@/content/approved';
import { copy } from '@/content/copy';

const CARDS = [
  { key: 'site', glyph: 'g-web', height: 560 },
  { key: 'ai', glyph: 'g-spark', height: 600 },
  { key: 'web', glyph: 'g-code', height: 640 },
  { key: 'mobile', glyph: 'g-app', height: 680 },
] as const;

/** The original staircase cards, with scoped offers and no public prices. */
export function Pricing() {
  const h = approved.home;
  return (
    <InView
      as="section"
      id="ways"
      data-msg={copy['home.msg.6']}
      at={0.82}
      className="relative z-[3] bg-ground py-24 desk:py-40"
    >
      <div className="wrap">
        <div className="grid items-end gap-6 desk:grid-cols-12">
          <Reveal
            as="h2"
            className="type-display m-0 text-[64px] desk:col-span-7 desk:text-[clamp(64px,8vw,120px)]"
          >
            {h['Project heading'].split('\n\n')[0]}
          </Reveal>
          <Reveal
            as="p"
            step={2}
            className="type-body m-0 text-grey-700 desk:col-span-4 desk:col-start-9 desk:pb-3"
          >
            {h['Project heading'].split('\n\n')[1]}
          </Reveal>
        </div>
        <div className="mt-7 grid items-stretch gap-3 desk:mt-16 desk:grid-cols-4 desk:items-end desk:gap-4">
          {CARDS.map((c, i) => {
            const offer = approved.services.offers[i];
            if (!offer) return null;
            const dark = c.key === 'mobile';
            return (
              <Parallax key={c.key} mode="enter" distance={50 + i * 80}>
                <article
                  data-event="service_link_opened"
                  data-event-offer={offer.name}
                  className={`way desk:min-h-[520px] ${dark ? 'bg-ink text-panel' : 'bg-panel text-ink'}`}
                  style={{ '--way-h': `${c.height}px` } as CSSProperties}
                >
                  <span
                    className={`way-tile ${dark ? 'bg-accent text-on-accent' : 'bg-ink text-panel'}`}
                  >
                    <Glyph name={c.glyph} className="h-[56%] w-[56%]" />
                  </span>
                  <h3 className="type-display mt-7 mb-0 text-[52px] desk:mt-auto desk:text-[58px]">
                    {offer.name}
                  </h3>
                  <p
                    className={`type-body mt-4 mb-0 text-[15px] ${dark ? 'text-grey-300' : 'text-grey-700'}`}
                  >
                    {copy[`home.build.${c.key}.promise`]} {copy[`home.build.${c.key}.body`]}
                  </p>
                  <ArrowLink href={`/services#${offer.id}`} className="mt-5">
                    {h['Capabilities link']}
                  </ArrowLink>
                  <ButtonLink
                    href="/start"
                    handoff
                    size="sm"
                    className="mt-[22px] self-start max-desk:self-stretch max-desk:justify-center"
                    bg={dark ? 'var(--color-panel)' : 'var(--color-ink)'}
                    fg={dark ? 'var(--color-ink)' : 'var(--color-panel)'}
                  >
                    {offer.Action}
                  </ButtonLink>
                </article>
              </Parallax>
            );
          })}
        </div>
        <Reveal className="mt-4 rounded-3xl bg-ink p-6 text-panel desk:rounded-[28px] desk:p-11">
          <div className="grid items-start gap-6 desk:grid-cols-12">
            <div className="desk:col-span-5">
              <h3 className="type-display m-0 text-[52px] desk:text-[68px]">
                {h['Partnership heading'].split('\n\n')[0]}
              </h3>
              {h['Partnership heading']
                .split('\n\n')
                .slice(1)
                .map((text) => (
                  <p key={text} className="type-body mt-5 mb-0 text-grey-300">
                    {text}
                  </p>
                ))}
              <ButtonLink
                href="/start"
                handoff
                className="mt-7"
                bg="var(--color-accent)"
                fg="var(--color-on-accent)"
              >
                {h['Partnership action']}
              </ButtonLink>
            </div>
            <ul className="m-0 grid list-none gap-3 p-0 desk:col-span-6 desk:col-start-7 desk:grid-cols-2">
              {h['Partnership details'].split(' / ').map((item) => (
                <li key={item} className="type-body rounded-[20px] bg-grey-900 p-6 text-[18px]">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
        <div className="mt-12 desk:mt-20">
          <Reveal as="h3" className="type-display m-0 max-w-[900px] text-[clamp(48px,6vw,88px)]">
            {h['Capabilities heading'].split('\n\n')[0]}
          </Reveal>
          <Reveal as="p" className="type-body mt-6 max-w-[680px] text-grey-700">
            {h['Capabilities heading'].split('\n\n')[1]}
          </Reveal>
          <div className="mt-8 grid gap-3 desk:grid-cols-3">
            {approved.services.capabilities.map((c, i) => (
              <Reveal
                key={c.id}
                step={i as 0 | 1 | 2}
                className="flex h-full flex-col rounded-[22px] bg-panel p-7 desk:p-8"
              >
                <h4 className="type-display m-0 text-[40px] leading-[0.98] desk:text-[clamp(36px,3.1vw,48px)]">
                  {c.name}
                </h4>
                <p className="type-body mt-6 mb-0 text-[17px] text-grey-700">{c.home}</p>
                <ArrowLink href={`/services#${c.id}`} className="mt-auto self-start pt-8">
                  {h['Capabilities link']}
                </ArrowLink>
              </Reveal>
            ))}
          </div>
        </div>
        <Reveal className="mt-10 rounded-[22px] bg-panel p-7">
          <h3 className="type-display m-0 text-[36px] desk:text-[44px]">
            {h['Ownership heading'].split('\n\n')[0]}
          </h3>
          <p className="type-body mt-3 mb-0 max-w-[780px] text-grey-700">
            {h['Ownership heading'].split('\n\n')[1]}
          </p>
        </Reveal>
      </div>
    </InView>
  );
}
