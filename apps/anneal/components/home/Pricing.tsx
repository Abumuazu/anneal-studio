import { InView, Parallax, Reveal } from '@studio/kit/motion';
import {
  ArrowLink,
  ButtonLink,
  CurrencySwitch,
  Glyph,
  type GlyphName,
  Price,
} from '@studio/kit/ui';
import { type CSSProperties } from 'react';

import { type CopyKey, boardCopy, copy } from '@/content/copy';
import { CURRENCY_COOKIE, currencyOptions } from '@/content/currency';
import { type Offer, priceValues } from '@/content/prices';
import { site } from '@/content/site.config';

type Key = 'site' | 'ai' | 'web' | 'mobile';

const CARDS: { key: Key; offer: Offer; glyph: GlyphName; height: number; dark?: boolean }[] = [
  { key: 'site', offer: 'website', glyph: 'g-web', height: 560 },
  { key: 'ai', offer: 'aiFeature', glyph: 'g-spark', height: 600 },
  { key: 'web', offer: 'webMvp', glyph: 'g-code', height: 640 },
  { key: 'mobile', offer: 'mobileMvp', glyph: 'g-app', height: 680, dark: true },
];

const k = (key: Key, part: string) => `home.price.${key}.${part}` as CopyKey;

/** Deck lines such as "Care · from $400/mo · Fixes, updates..." hold name and description. */
function growthItem(key: CopyKey) {
  const [name = '', , desc = ''] = copy[key].split(' · ');
  return { name, desc };
}

const GROWTH: { key: CopyKey; offer: Offer; from: boolean; per: string }[] = [
  { key: 'home.price.growth.care', offer: 'care', from: true, per: boardCopy.perMonth },
  { key: 'home.price.growth.growth', offer: 'growth', from: true, per: boardCopy.perMonth },
  {
    key: 'home.price.growth.sprint',
    offer: 'featureSprint',
    from: false,
    per: boardCopy.perTwoWeeks,
  },
];

/** "Pick your build.": four cards rising in a staircase, the Growth panel and the terms. */
export function Pricing() {
  return (
    <InView
      as="section"
      id="ways"
      data-msg={copy['home.msg.6']}
      at={0.82}
      className="relative z-[3] bg-ground py-40"
    >
      <div className="wrap">
        <div className="grid items-end gap-6 desk:grid-cols-12">
          <Reveal
            as="h2"
            className="type-display m-0 text-[clamp(72px,10vw,156px)] desk:col-span-7"
          >
            {copy['home.price.h2']}
          </Reveal>
          <Reveal step={2} className="flex flex-col gap-5 pb-3 desk:col-span-4 desk:col-start-9">
            <p className="type-body m-0 text-grey-700">{copy['home.price.lead']}</p>
            <CurrencySwitch
              options={currencyOptions}
              cookie={CURRENCY_COOKIE}
              label={boardCopy.currencyGroup}
            />
          </Reveal>
        </div>

        <div className="mt-16 grid items-stretch gap-4 desk:grid-cols-4 desk:items-end">
          {CARDS.map((c, i) => (
            <Parallax key={c.key} mode="enter" distance={50 + i * 80}>
              <article
                data-event="price_card_click"
                data-event-offer={c.offer}
                className={`way min-h-[520px] ${c.dark ? 'bg-ink text-panel' : 'bg-panel text-ink'}`}
                style={{ '--way-h': `${c.height}px` } as CSSProperties}
              >
                <div className="flex items-start justify-between">
                  <span
                    className={`way-tile ${c.dark ? 'bg-accent text-on-accent' : 'bg-ink text-panel'}`}
                  >
                    <Glyph name={c.glyph} className="h-[56%] w-[56%]" />
                  </span>
                  <span className={`type-label ${c.dark ? 'text-grey-400' : 'text-grey-600'}`}>
                    {copy[k(c.key, 'time')]}
                  </span>
                </div>
                <h3 className="type-display mt-auto mb-0 text-[58px]">{copy[k(c.key, 'name')]}</h3>
                <div className="mt-3.5 flex items-baseline gap-2.5">
                  <span className={`type-label ${c.dark ? 'text-grey-400' : 'text-grey-600'}`}>
                    {boardCopy.from}
                  </span>
                  <Price values={priceValues(c.offer)} className="type-display-wide text-[30px]" />
                </div>
                <p
                  className={`type-body mt-2.5 mb-0 text-[15px] ${c.dark ? 'text-grey-300' : 'text-grey-700'}`}
                >
                  {copy[k(c.key, 'for')]}
                </p>
                <ul className="mt-[18px] mb-0 flex list-none flex-col gap-[9px] p-0 text-[15px] leading-[1.3]">
                  {[1, 2, 3, 4].map((n) => (
                    <li key={n} className="flex items-start gap-2.5">
                      <span
                        aria-hidden="true"
                        className={`-mt-px inline-flex h-5 w-5 flex-none items-center justify-center rounded-full text-[11px] ${c.dark ? 'bg-grey-800 text-panel' : 'bg-grey-100 text-ink'}`}
                      >
                        ✓
                      </span>
                      {copy[k(c.key, `inc.${n}`)]}
                    </li>
                  ))}
                </ul>
                <ButtonLink
                  href={site.startHref}
                  handoff
                  size="sm"
                  className="mt-[22px] self-start"
                  bg={c.dark ? 'var(--color-panel)' : 'var(--color-ink)'}
                  fg={c.dark ? 'var(--color-ink)' : 'var(--color-panel)'}
                >
                  {copy[k(c.key, 'cta')]}
                </ButtonLink>
              </article>
            </Parallax>
          ))}
        </div>

        <Reveal className="mt-4 rounded-[28px] bg-ink p-7 text-panel desk:p-11">
          <div className="grid items-start gap-6 desk:grid-cols-12">
            <div className="desk:col-span-4">
              <h3 className="type-display m-0 text-[clamp(44px,4.6vw,68px)] leading-[0.9]">
                {copy['home.price.growth.name']}
              </h3>
              <p className="type-body mt-[18px] mb-0 text-base text-grey-300">
                {copy['home.price.growth.lead']}
              </p>
              <ButtonLink
                href={site.startHref}
                handoff
                size="md"
                className="mt-[26px]"
                bg="var(--color-accent)"
                fg="var(--color-on-accent)"
                fill="var(--color-panel)"
                fillFg="var(--color-ink)"
              >
                {copy['home.price.growth.cta']}
              </ButtonLink>
            </div>
            <div className="grid gap-3.5 desk:col-span-7 desk:col-start-6 desk:grid-cols-3">
              {GROWTH.map((g) => {
                const item = growthItem(g.key);
                return (
                  <div key={g.key} className="rounded-[20px] bg-grey-900 p-6">
                    <h4 className="type-h3 m-0 text-2xl">{item.name}</h4>
                    <div className="mt-2.5 flex flex-wrap items-baseline gap-2">
                      {g.from ? (
                        <span className="type-label text-grey-400">{boardCopy.from}</span>
                      ) : null}
                      <Price
                        values={priceValues(g.offer)}
                        className="type-display-wide text-[26px]"
                      />
                      <span className="type-label text-grey-400">{g.per}</span>
                    </div>
                    <p className="type-body mt-3 mb-0 text-[15px] text-grey-300">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>

        <div className="mt-4 grid gap-4 desk:grid-cols-3">
          {([1, 2, 3] as const).map((n, i) => (
            <Reveal key={n} step={i as 0 | 1 | 2} className="rounded-[22px] bg-panel p-7">
              <h3 className="type-h3 m-0 text-[22px]">{copy[`home.price.terms.${n}.t`]}</h3>
              <p className="type-body mt-3 mb-0 text-base text-grey-700">
                {copy[`home.price.terms.${n}.x`]}
              </p>
              {n === 3 ? (
                <ArrowLink href={site.startHref} handoff className="mt-4">
                  {copy['services.custom.bigger.cta']}
                </ArrowLink>
              ) : null}
            </Reveal>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-7">
          <ArrowLink href="/services">{boardCopy.everythingInEachBuild}</ArrowLink>
        </div>
      </div>
    </InView>
  );
}
