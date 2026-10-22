import { ArrowLink } from '@studio/kit/ui';
import type { Metadata } from 'next';

import { SiteChrome } from '@/components/SiteChrome';
import { boardCopy } from '@/content/copy';
import { chromeCopy } from '@/content/pages';
import { primaryNav } from '@/content/site.config';

export const metadata: Metadata = { title: `404 · ${boardCopy.studioName}` };

/**
 * Not found. The copy deck has no 404 wording yet (see the M6 PR), so the page
 * shows the status and the site's own navigation, and invents nothing.
 */
export default function NotFound() {
  return (
    <SiteChrome
      variant="page"
      closingMsg={chromeCopy.closingMsgBuild}
      footerMsg={chromeCopy.footerMsg}
    >
      <section className="reveal-on-load relative pt-[136px] desk:pt-[200px] pb-24 desk:pb-[140px]">
        <div className="wrap grid items-end gap-10 desk:grid-cols-12">
          <h1 className="type-display m-0 text-[clamp(120px,24vw,360px)] desk:col-span-7">404</h1>
          <nav aria-label={boardCopy.primaryNav} className="desk:col-span-4 desk:col-start-9">
            <ul className="m-0 flex list-none flex-col gap-1 p-0">
              {[{ href: '/', label: boardCopy.brand }, ...primaryNav].map((l) => (
                <li key={l.href}>
                  <ArrowLink
                    href={l.href}
                    arrow="↗"
                    className="type-h2 text-[clamp(32px,3.6vw,52px)]"
                  >
                    {l.label}
                  </ArrowLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>
    </SiteChrome>
  );
}
