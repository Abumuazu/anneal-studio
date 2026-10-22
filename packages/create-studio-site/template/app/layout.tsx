import { bootScript } from '@studio/kit/boot';
import { CursorLabel, MotionProvider } from '@studio/kit/motion';
import { FloatingNav } from '@studio/kit/sections';
import { HandoffLink, HandoffProvider } from '@studio/kit/transitions';
import { GlyphSprite } from '@studio/kit/ui';
import type { Metadata } from 'next';
import { type ReactNode } from 'react';

import { Mark } from '@/components/Mark';
import { copy, site } from '@/content/site';

import { fontVariables } from './fonts';
import './globals.css';

export const metadata: Metadata = { title: site.name, description: copy.hero.lead };

const boot = bootScript({
  motionKey: site.storage.motion,
  currency: { cookie: 'currency', codes: ['USD'], fallback: 'USD' },
  handoff: { key: site.storage.handoff, maxAgeMs: 6000 },
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    // The boot script sets data-motion and data-handoff before hydration.
    <html lang="en" className={fontVariables} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: boot }} />
      </head>
      <body id="top">
        <GlyphSprite />
        <MotionProvider storageKey={site.storage.motion}>
          <HandoffProvider
            storageKey={site.storage.handoff}
            overlay={<Mark name={site.name} size={120} />}
          >
            {children}
            <FloatingNav
              label={copy.labels.quickNav}
              mark={<Mark name={site.name} size={18} />}
              cta={
                <HandoffLink href={site.contactHref} className="fnav-cta">
                  {copy.cta}
                </HandoffLink>
              }
            />
            <CursorLabel className="glass text-panel" />
          </HandoffProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
