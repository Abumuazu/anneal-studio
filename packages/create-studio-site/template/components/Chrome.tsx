import { ClipIn } from '@studio/kit/motion';
import { Closing, GlassFooter, SiteHeader } from '@studio/kit/sections';
import { ButtonLink, PillLink } from '@studio/kit/ui';
import { type ReactNode } from 'react';

import { copy, nav, site, tiles } from '@/content/site';

import { Mark } from './Mark';

/** Header, the page, then the sticky closing with the glass footer sliding over it. */
export function Chrome({ children }: { children: ReactNode }) {
  return (
    <>
      <SiteHeader
        brand={
          <>
            <Mark name={site.name} size={24} />
            <span className="type-display text-[22px]">{site.name}</span>
          </>
        }
        links={nav}
        navLabel={copy.labels.primaryNav}
        cta={
          <PillLink href={site.contactHref} handoff>
            {copy.cta}
          </PillLink>
        }
      />
      <main id="main">{children}</main>
      <ClipIn className="relative z-[3] bg-ink">
        <Closing rows={copy.closing.rows} msg={copy.closing.msg} size="compact">
          <div className="wrap mt-14">
            <ButtonLink
              href={site.contactHref}
              handoff
              size="xl"
              bg="var(--color-accent)"
              fg="var(--color-on-accent)"
              fill="var(--color-panel)"
              fillFg="var(--color-ink)"
            >
              {copy.cta}
            </ButtonLink>
          </div>
        </Closing>
        <GlassFooter
          msg={copy.footer.msg}
          navLabel={copy.labels.footerNav}
          links={nav}
          aside={
            <a href={`mailto:${site.email}`} className="type-h3 text-2xl">
              {site.email}
            </a>
          }
          playground={{ tiles, hint: copy.footer.hint }}
          wordmark={{ text: site.name.toUpperCase(), label: site.name }}
          legal={<span>{copy.footer.legal}</span>}
        />
      </ClipIn>
    </>
  );
}
