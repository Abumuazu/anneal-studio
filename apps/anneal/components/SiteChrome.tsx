import { ClipIn } from '@studio/kit/motion';
import { Closing, GlassFooter, SiteHeader } from '@studio/kit/sections';
import { ArrowLink, ButtonLink, PillLink } from '@studio/kit/ui';
import Link from 'next/link';
import { Children, Suspense, type ReactNode } from 'react';

import { boardCopy, copy } from '@/content/copy';
import { approved } from '@/content/approved';
import { footerNav, primaryNav, site } from '@/content/site.config';

import { Mark } from './Mark';
import { footerRestTiles, footerTiles } from './tiles';

function Header() {
  return (
    <SiteHeader
      brand={
        <>
          <Mark size={24} />
          <span className="type-display-wide text-[17px] desk:text-[19px]">{boardCopy.brand}</span>
        </>
      }
      links={primaryNav}
      navLabel={boardCopy.primaryNav}
      menu={{
        ...boardCopy.menu,
        openLabel: boardCopy.menu.open,
        closeLabel: boardCopy.menu.close,
        cta: (
          <ButtonLink
            href={site.startHref}
            handoff
            className="w-full justify-center"
            bg="var(--color-accent)"
            fg="var(--color-on-accent)"
            fill="var(--color-panel)"
            fillFg="var(--color-ink)"
          >
            {boardCopy.workWithUs}
          </ButtonLink>
        ),
      }}
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
        // Touch screens have no pointer to follow; they get the button below instead.
        <span className="max-desk:hidden">
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
        </span>
      }
    >
      <div className="wrap type-label mt-12 flex flex-col gap-2.5 text-grey-400 desk:mt-[90px] desk:flex-row desk:flex-wrap desk:justify-between desk:gap-6">
        <ButtonLink
          href={site.startHref}
          handoff
          size="xl"
          className="w-full justify-center tracking-normal normal-case max-desk:order-1 desk:hidden"
          bg="var(--color-accent)"
          fg="var(--color-on-accent)"
          fill="var(--color-panel)"
          fillFg="var(--color-ink)"
        >
          {boardCopy.workWithUs}
        </ButtonLink>
        <ArrowLink
          href="/start#brief"
          handoff
          className="type-label text-panel max-desk:order-2 max-desk:justify-center desk:order-2"
        >
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
      <div className="wrap mt-12 flex flex-col items-stretch gap-2.5 desk:mt-14 desk:flex-row desk:flex-wrap desk:items-center desk:gap-7">
        <ButtonLink
          href={site.startHref}
          handoff
          size="xl"
          className="max-desk:w-full max-desk:justify-center"
          bg="var(--color-accent)"
          fg="var(--color-on-accent)"
          fill="var(--color-panel)"
          fillFg="var(--color-ink)"
        >
          {boardCopy.workWithUs}
        </ButtonLink>
        <ArrowLink href="/start#brief" handoff className="text-grey-300 max-desk:justify-center">
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
      links={footerNav}
      middle={
        <p className="type-lead m-0 max-w-[440px] text-grey-300">
          {approved.shared['Footer closing'].split('\n\n')[1]}
        </p>
      }
      aside={
        <div className="flex flex-col items-start gap-3">
          <span className="type-label text-grey-400">{boardCopy.sayHello}</span>
          <a href={`mailto:${site.email}`} className="type-h3 text-2xl">
            {site.email}
          </a>
          <nav
            aria-label="Social profiles"
            className="type-body flex gap-2 text-base text-grey-300"
          >
            {site.socials.map((social, index) => (
              <span key={social.href}>
                {index > 0 && (
                  <span aria-hidden="true" className="mr-2">
                    ·
                  </span>
                )}
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white"
                >
                  {social.label}
                </a>
              </span>
            ))}
          </nav>
          <ButtonLink
            href={site.startHref}
            handoff
            size="md"
            className="mt-3.5 max-desk:h-14 max-desk:w-full max-desk:justify-center"
            bg="var(--color-panel)"
            fg="var(--color-ink)"
          >
            {boardCopy.workWithUs}
          </ButtonLink>
        </div>
      }
      playground={{ tiles: footerTiles, hint: copy['footer.hint'], restTiles: footerRestTiles }}
      wordmark={{ text: 'ANNEAL', label: boardCopy.brand, widthRatio: 5.2 }}
      legal={
        <>
          <span>{boardCopy.copyright}</span>
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
      <Suspense fallback={null}>
        <Header />
      </Suspense>
      <main id="main">
        {/* Keep server-rendered sections visible while React hydrates them independently. */}
        {Children.map(children, (child) => (
          <Suspense fallback={null}>{child}</Suspense>
        ))}
      </main>
      <Suspense fallback={null}>
        <ClipIn className="relative z-[3] bg-ink">
          {variant === 'home' ? <HomeClosing msg={closingMsg} /> : <PageClosing msg={closingMsg} />}
          <Footer msg={footerMsg} />
        </ClipIn>
      </Suspense>
    </>
  );
}
