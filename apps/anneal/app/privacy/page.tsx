import { InView, LineMask, Reveal } from '@studio/kit/motion';
import { ScrollSpyNav } from '@studio/kit/sections';
import type { Metadata } from 'next';

import { SiteChrome } from '@/components/SiteChrome';
import { REGISTERED_ADDRESS_PLACEHOLDER, privacyCopy as pc } from '@/content/appendix';
import { chromeCopy } from '@/content/pages';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Privacy',
  description: pc.lead,
  path: '/privacy',
});

/** Shows the address placeholder dimmed, as on the board, so it is hard to miss before launch. */
function Body({ text }: { text: string }) {
  const [before, after] = text.split(REGISTERED_ADDRESS_PLACEHOLDER);
  if (after === undefined) return <>{text}</>;
  return (
    <>
      {before}
      <mark className="bg-grey-100 px-1 text-grey-600">{REGISTERED_ADDRESS_PLACEHOLDER}</mark>
      {after}
    </>
  );
}

export default function PrivacyPage() {
  const toc = pc.sections.map((s, i) => ({ id: `p${i + 1}`, label: s.title }));
  return (
    <SiteChrome variant="page" closingMsg={pc.msg.closing} footerMsg={chromeCopy.footerMsg}>
      <section
        data-msg={pc.msg.hero}
        className="reveal-on-load relative pt-[136px] desk:pt-[200px] pb-20"
      >
        <div className="wrap">
          <Reveal className="inline-flex h-[38px] items-center gap-2.5 rounded-full bg-ink px-4 text-panel">
            <span className="type-label">{pc.banner}</span>
          </Reveal>
          <h1 className="type-display mt-[30px] mb-0 text-[clamp(80px,14vw,220px)]">
            <LineMask>{pc.title}</LineMask>
          </h1>
          <div className="mt-[30px] grid items-end gap-6 desk:grid-cols-12">
            <Reveal as="p" step={1} className="type-lead m-0 text-grey-700 desk:col-span-7">
              {pc.lead}
            </Reveal>
            <Reveal
              as="p"
              step={2}
              className="type-label m-0 text-grey-600 desk:col-span-3 desk:col-start-10 desk:text-right"
            >
              {pc.date}
            </Reveal>
          </div>
        </div>
      </section>

      <section className="relative bg-panel pt-[100px] pb-24 desk:pb-[140px]">
        <div className="wrap grid items-start gap-6 desk:grid-cols-12">
          <ScrollSpyNav
            items={toc}
            label={pc.tocLabel}
            className="hidden desk:sticky desk:top-[110px] desk:col-span-4 desk:flex"
          />
          <div className="desk:col-span-7 desk:col-start-6">
            {pc.sections.map((s, i) => (
              <InView key={s.title} id={`p${i + 1}`} className="scroll-mt-28 pb-14">
                <Reveal>
                  <div className="type-label text-grey-600" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <h2 className="type-h3 mt-3 mb-0 text-4xl">{s.title}</h2>
                  {s.body.map((p) => (
                    <p key={p} className="type-body mt-4 mb-0 text-grey-700">
                      <Body text={p} />
                    </p>
                  ))}
                  {'list' in s ? (
                    <ul className="mt-4 mb-0 flex list-none flex-col gap-3 p-0">
                      {s.list.map((item) => (
                        <li key={item} className="type-body flex gap-3.5 text-grey-700">
                          <span aria-hidden="true" className="text-accent">
                            ◆
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </Reveal>
              </InView>
            ))}
          </div>
        </div>
      </section>
    </SiteChrome>
  );
}
