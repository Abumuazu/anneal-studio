import { bootScript } from '@studio/kit/boot';
import { analyticsQueue } from '@studio/kit/lib';
import { CursorLabel, MotionProvider } from '@studio/kit/motion';
import { FloatingNav } from '@studio/kit/sections';
import { HandoffLink, HandoffProvider } from '@studio/kit/transitions';
import { CurrencyStyles, GlyphSprite } from '@studio/kit/ui';
import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { type ReactNode } from 'react';

import { Analytics } from '@/components/Analytics';
import { Mark } from '@/components/Mark';
import { boardCopy } from '@/content/copy';
import { CURRENCY_COOKIE, DEFAULT_CURRENCY } from '@/content/currency';
import { CURRENCIES } from '@/content/prices';
import { site } from '@/content/site.config';
import { siteUrl } from '@/lib/seo';

import { fontVariables } from './fonts';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: siteUrl(),
  title: site.name,
  description: boardCopy.heroLead,
  openGraph: { siteName: site.name, type: 'website' },
  twitter: { card: 'summary_large_image' },
};

export const viewport: Viewport = {
  themeColor: '#d9d9d9',
};

/** Plausible loads only when a domain is set (production). No cookies, no personal data. */
const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
const plausibleSrc = process.env.NEXT_PUBLIC_PLAUSIBLE_SRC ?? 'https://plausible.io/js/script.js';

const boot = bootScript({
  motionKey: site.storage.motion,
  currency: { cookie: CURRENCY_COOKIE, codes: CURRENCIES, fallback: DEFAULT_CURRENCY },
  handoff: { key: site.storage.handoff, maxAgeMs: site.handoffMaxAgeMs },
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    // The boot script sets data-motion, data-currency and data-handoff before
    // hydration, so the server markup legitimately differs on <html>.
    <html lang="en" className={fontVariables} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: boot }} />
        <CurrencyStyles codes={CURRENCIES} fallback={DEFAULT_CURRENCY} />
        {plausibleDomain ? <script dangerouslySetInnerHTML={{ __html: analyticsQueue }} /> : null}
      </head>
      <body id="top">
        <GlyphSprite />
        <MotionProvider storageKey={site.storage.motion}>
          <HandoffProvider
            storageKey={site.storage.handoff}
            maxAgeMs={site.handoffMaxAgeMs}
            overlay={
              <>
                <Mark size={120} live cycle={3.2} />
                <span className="type-label text-xs">{boardCopy.workWithUs}</span>
              </>
            }
          >
            {children}
            <FloatingNav
              label={boardCopy.quickNav}
              mark={<Mark size={18} className="text-panel" />}
              cta={
                <HandoffLink href={site.startHref} className="fnav-cta">
                  {boardCopy.workWithUs}
                </HandoffLink>
              }
            />
            <CursorLabel className="glass text-panel" />
            <Analytics />
          </HandoffProvider>
        </MotionProvider>
        {plausibleDomain ? (
          <Script src={plausibleSrc} data-domain={plausibleDomain} strategy="afterInteractive" />
        ) : null}
      </body>
    </html>
  );
}
