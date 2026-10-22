import { ClipIn } from '@studio/kit/motion';
import { Closing, GlassFooter, SiteHeader } from '@studio/kit/sections';
import {
  ArrowLink,
  ButtonLink,
  CurrencySwitch,
  LiveClock,
  PillLink,
  ZoneName,
} from '@studio/kit/ui';
import Link from 'next/link';
import { type ReactNode } from 'react';

import { boardCopy, copy } from '@/content/copy';
import { CURRENCY_COOKIE, currencyOptions } from '@/content/currency';
import { primaryNav, site } from '@/content/site.config';

import { Mark } from './Mark';
import { footerTiles } from './tiles';

const [lagos, barcelona] = site.cities;

function Clocks() {
  return (
    <>
      Lagos <LiveClock timeZone={lagos.timeZone} /> · Barcelona{' '}
      <LiveClock timeZone={barcelona.timeZone} />
    </>
  );
}

function Header() {
  return (
    <SiteHeader
      brand={
        <>
          <Mark size={24} />
          <span className="type-display-wide text-[19px]">{boardCopy.brand}</span>
        </>
      }
      links={primaryNav}
      navLabel={boardCopy.primaryNav}
      meta={<Clocks />}
      cta={
        <PillLink href={site.startHref} handoff>
          {boardCopy.workWithUs}
        </PillLink>
      }
    />
  );
}

const closingRows = [
  { text: copy['closing.m1'] },
  { text: copy['closing.m2'], muted: true },
  { text: copy['closing.m3'] },
];

/** Home: a pill trails the pointer, with the clocks and the call link below. */
function HomeClosing({ msg }: { msg: string }) {
  return (
    <Closing
      id="contact"
      rows={closingRows}
      msg={msg}
      follower={
        <ButtonLink
          href={site.startHref}
          handoff
          size="xxl"
          bg="var(--color-accent)"
          fg="var(--color-on-accent)"
          fill="var(--color-panel)"
          fillFg="var(--color-ink)"
        >
          {boardCopy.workWithUs}
        </ButtonLink>
      }
    >
      <div className="wrap type-label mt-[90px] flex flex-wrap justify-between gap-6 text-grey-400">
        <span>
          <Clocks />
        </span>
        <ArrowLink href={site.startHref} handoff className="type-label text-panel">
          {copy['closing.cta2']}
        </ArrowLink>
      </div>
    </Closing>
  );
}

/** Inner pages: a large button and the call link. */
function PageClosing({ msg }: { msg: string }) {
  return (
    <Closing id="contact" rows={closingRows} msg={msg} size="compact">
      <div className="wrap mt-14 flex flex-wrap items-center gap-7">
        <ButtonLink
          href={site.startHref}
          handoff
          size="xl"
          bg="var(--color-accent)"
          fg="var(--color-on-accent)"
          fill="var(--color-panel)"
          fillFg="var(--color-ink)"
        >
          {boardCopy.workWithUs}
        </ButtonLink>
        <ArrowLink href={site.startHref} handoff className="text-grey-300">
          {copy['closing.cta2']}
        </ArrowLink>
      </div>
    </Closing>
  );
}

function Footer({ msg }: { msg: string }) {
  return (
    <GlassFooter
      msg={msg}
      navLabel={boardCopy.footerNav}
      links={primaryNav}
      middle={
        <div className="grid grid-cols-2 gap-3.5">
          {site.cities.map((city) => (
            <div
              key={city.name}
              className="glass rounded-[22px] p-[22px] [--glass-bg:rgb(255_255_255/0.06)]"
            >
              <div className="type-display text-[76px]">
                <LiveClock timeZone={city.timeZone} />
              </div>
              <div className="type-label mt-3.5 text-grey-400">
                {city.name} ·{' '}
                {city.zone === 'WAT' ? (
                  city.zone
                ) : (
                  <ZoneName timeZone={city.timeZone} fallback={city.zone} />
                )}
              </div>
            </div>
          ))}
        </div>
      }
      aside={
        <div className="flex flex-col items-start gap-3">
          <span className="type-label text-grey-400">{boardCopy.sayHello}</span>
          <a href={`mailto:${site.email}`} className="type-h3 text-2xl">
            {site.email}
          </a>
          <span className="type-body text-base text-grey-300">{boardCopy.socials}</span>
          <CurrencySwitch
            className="mt-2"
            options={currencyOptions}
            cookie={CURRENCY_COOKIE}
            label={boardCopy.currencyGroup}
            tone="dark"
            prefix={<span className="type-label mr-1.5 text-grey-400">{boardCopy.pricesIn}</span>}
          />
          <ButtonLink
            href={site.startHref}
            handoff
            size="md"
            className="mt-3.5"
            bg="var(--color-panel)"
            fg="var(--color-ink)"
          >
            {boardCopy.workWithUs}
          </ButtonLink>
        </div>
      }
      playground={{ tiles: footerTiles, hint: copy['footer.hint'] }}
      wordmark={{ text: 'ANNEAL', label: boardCopy.brand, widthRatio: 5.2 }}
      legal={
        <>
          <span>{boardCopy.copyright}</span>
          <span>{boardCopy.madeIn}</span>
          <Link href="/privacy">{boardCopy.privacy}</Link>
          <a href="#top" className="text-panel">
            {boardCopy.backToTop}
          </a>
        </>
      }
    />
  );
}

interface SiteChromeProps {
  variant: 'home' | 'page';
  /** Floating nav messages for the closing section and the footer (they differ per page). */
  closingMsg: string;
  footerMsg: string;
  children: ReactNode;
}

/**
 * Header, page content, then the closing section with the glass footer sliding
 * over it. The closing differs on Home (a pointer-following pill).
 */
export function SiteChrome({ variant, closingMsg, footerMsg, children }: SiteChromeProps) {
  return (
    <>
      <Header />
      <main id="main">{children}</main>
      <ClipIn className="relative z-[3] bg-ink">
        {variant === 'home' ? <HomeClosing msg={closingMsg} /> : <PageClosing msg={closingMsg} />}
        <Footer msg={footerMsg} />
      </ClipIn>
    </>
  );
}
