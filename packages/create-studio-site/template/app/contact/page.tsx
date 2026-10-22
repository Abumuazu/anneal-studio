import { LineMask, Reveal } from '@studio/kit/motion';
import { ButtonLink } from '@studio/kit/ui';
import type { Metadata } from 'next';

import { Chrome } from '@/components/Chrome';
import { copy, site } from '@/content/site';

export const metadata: Metadata = {
  title: `Contact · ${site.name}`,
  description: copy.contact.lead,
};

/** A simple contact page. Swap in a booking card or brief form as the site needs. */
export default function ContactPage() {
  const [a, b] = copy.contact.lines;
  return (
    <Chrome>
      <section data-msg={copy.contact.msg} className="reveal-on-load relative pt-[200px] pb-40">
        <div className="wrap">
          <h1 className="type-display m-0 text-[clamp(64px,10vw,156px)]">
            <span aria-hidden="true">
              <LineMask line={0}>{a}</LineMask>
              <LineMask line={1}>
                <span className="text-grey-600">{b}</span>
              </LineMask>
            </span>
            <span className="sr-only">{copy.contact.lines.join(' ')}</span>
          </h1>
          <Reveal as="p" step={2} className="type-lead mt-12 mb-0 max-w-[560px] text-grey-700">
            {copy.contact.lead}
          </Reveal>
          <Reveal step={3} className="mt-10">
            <ButtonLink
              href={`mailto:${site.email}`}
              bg="var(--color-accent)"
              fg="var(--color-on-accent)"
            >
              {site.email}
            </ButtonLink>
          </Reveal>
        </div>
      </section>
    </Chrome>
  );
}
