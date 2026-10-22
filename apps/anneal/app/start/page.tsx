import { InView, LineMask, Reveal } from '@studio/kit/motion';
import type { Metadata } from 'next';

import { SiteChrome } from '@/components/SiteChrome';
import { Booking, BookingZone } from '@/components/start/Booking';
import { BriefForm } from '@/components/start/BriefForm';
import { startCopy as st } from '@/content/appendix';
import { copy, lines } from '@/content/copy';
import { chromeCopy } from '@/content/pages';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Start',
  description: copy['start.lead'],
  path: '/start',
});

export default function StartPage() {
  const [first, second] = lines(copy['start.h1'], [3]);
  return (
    <SiteChrome
      variant="page"
      closingMsg={st.msg.close}
      footerMsg={chromeCopy.footerMsg}
      showCurrencySwitch={false}
    >
      <section
        data-msg={st.msg.hero}
        className="reveal-on-load relative pt-[136px] desk:pt-[200px] pb-20"
      >
        <div className="wrap grid items-end gap-6 desk:grid-cols-12">
          <h1 className="type-display m-0 text-[clamp(64px,10vw,156px)] desk:col-span-8">
            <span aria-hidden="true">
              <LineMask line={0}>{first}</LineMask>
              <LineMask line={1}>
                <span className="text-grey-550">{second}</span>
              </LineMask>
            </span>
            <span className="sr-only">{copy['start.h1']}</span>
          </h1>
          <Reveal
            as="p"
            step={2}
            className="type-lead mt-0 mb-2.5 text-grey-700 desk:col-span-4 desk:col-start-9"
          >
            {copy['start.lead']}
          </Reveal>
        </div>
      </section>

      <InView as="section" className="relative pb-16 desk:pb-[120px]">
        <div className="wrap grid items-stretch gap-5 desk:grid-cols-[5fr_7fr]">
          <Reveal
            data-msg={st.msg.booking}
            className="flex min-h-[680px] flex-col gap-[26px] rounded-[28px] bg-ink p-6 text-panel sm:p-9"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <h2 className="type-h3 m-0 text-[32px]">{st.booking.title}</h2>
              <BookingZone />
            </div>
            <Booking />
          </Reveal>
          <Reveal
            step={1}
            data-msg={st.msg.brief}
            className="flex min-h-[680px] flex-col rounded-[28px] bg-panel p-6 sm:p-9"
          >
            <BriefForm />
          </Reveal>
        </div>

        <div className="wrap mt-[100px]">
          <Reveal as="h2" className="type-label m-0 font-medium text-grey-600">
            {st.next.title}
          </Reveal>
          <ol className="mt-[26px] mb-0 grid list-none gap-5 p-0 desk:grid-cols-3">
            {st.next.steps.map((s, i) => (
              <Reveal
                as="li"
                key={s.title}
                step={i as 0 | 1 | 2}
                className={`stp ${i === 2 ? 'bg-ink text-panel' : 'bg-panel'}`}
              >
                <div
                  className={`type-display text-[96px] ${i === 2 ? 'text-accent' : ''}`}
                  aria-hidden="true"
                >
                  0{i + 1}
                </div>
                <h3 className="type-h3 mt-5 mb-0 text-[26px]">{s.title}</h3>
                <p
                  className={`type-body mt-2.5 mb-0 ${i === 2 ? 'text-grey-300' : 'text-grey-700'}`}
                >
                  {s.body}
                </p>
              </Reveal>
            ))}
          </ol>
        </div>
      </InView>
    </SiteChrome>
  );
}
