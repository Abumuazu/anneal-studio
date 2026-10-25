import { ArrowLink } from '@studio/kit/ui';
import type { Metadata } from 'next';

import { SiteChrome } from '@/components/SiteChrome';
import { approved } from '@/content/approved';

import { boardCopy } from '@/content/copy';
import { chromeCopy } from '@/content/pages';
import { primaryNav } from '@/content/site.config';

export const metadata: Metadata = {
  title: approved.missing.Title,
  description: approved.missing['Meta description'],
};

/** A missing page with the reviewed recovery links. */
export default function NotFound() {
  return (
    <SiteChrome
      variant="page"
      closingMsg={chromeCopy.closingMsgBuild}
      footerMsg={chromeCopy.footerMsg}
    >
      <section className="reveal-on-load relative pt-[136px] desk:pt-[200px] pb-24 desk:pb-[140px]">
        <div className="wrap grid items-end gap-10 desk:grid-cols-12">
          <p
            aria-hidden="true"
            className="type-display m-0 text-[clamp(120px,24vw,360px)] desk:col-span-7"
          >
            404
          </p>
          <div className="desk:col-span-4 desk:col-start-9">
            <h1 className="type-h3 text-[36px]">{approved.missing.H1}</h1>
            <p className="type-body text-grey-700">{approved.missing.Body}</p>
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
        </div>
      </section>
    </SiteChrome>
  );
}
