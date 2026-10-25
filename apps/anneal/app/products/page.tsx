import { approved } from '@/content/approved';
import { InView, LineMask, Reveal } from '@studio/kit/motion';
import { ButtonLink, Tag } from '@studio/kit/ui';
import type { Metadata } from 'next';
import Link from 'next/link';

import { SiteChrome } from '@/components/SiteChrome';
import { VentureTiles } from '@/components/VentureTiles';
import { PageHero } from '@/components/pages/PageHero';
import { Tracks } from '@/components/pages/Tracks';
import { WaitlistSection } from '@/components/pages/WaitlistSection';
import { boardCopy, copy, lines } from '@/content/copy';
import { chromeCopy, productsCopy as pc } from '@/content/pages';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: approved.meta.Products.title,
  description: approved.meta.Products.description,
  path: '/products',
});

export default function ProductsPage() {
  const [next1, next2] = lines(copy['products.next.h2'], [2]);
  return (
    <SiteChrome
      variant="page"
      closingMsg={chromeCopy.closingMsgBuild}
      footerMsg={chromeCopy.footerMsg}
    >
      <PageHero
        lines={[copy['products.h1.1'], copy['products.h1.2'], copy['products.h1.3']]}
        glyphs={['g-code', 'g-stack', 'g-spark', 'g-dots']}
        tile={{ background: 'var(--color-accent)', color: 'var(--color-on-accent)' }}
        msg={pc.msg.hero}
        size="text-[clamp(64px,10.4vw,164px)]"
      >
        <Reveal as="p" step={2} className="type-lead mt-14 mb-0 max-w-[680px] text-grey-700">
          {copy['products.lead']}
        </Reveal>
      </PageHero>

      <InView as="section" data-msg={pc.msg.built} className="relative bg-panel py-24 desk:py-40">
        <div className="wrap">
          <Reveal as="h2" step={1} className="type-h2 mt-0 mb-14 text-[clamp(44px,5.4vw,80px)]">
            {copy['products.ven.h2']}
          </Reveal>
          <Reveal step={2}>
            <VentureTiles
              variant="page"
              tiles={['raum', 'centiiv', 'clekey', 'tools']}
              lines={{
                raum: copy['work.rows.4.line'],
                centiiv: copy['work.rows.5.line'],
                clekey: copy['work.rows.6.line'],
                tools: copy['home.ven.tools.line'],
              }}
            />
          </Reveal>
        </div>
      </InView>

      <InView as="section" data-msg={pc.msg.fit} className="relative py-24 desk:py-40">
        <div className="wrap">
          <Reveal as="h2" step={1} className="type-h2 mt-0 mb-16 text-[clamp(44px,5.4vw,80px)]">
            {copy['products.fit.h2']}
          </Reveal>
          <Tracks
            titleSize="text-4xl"
            cards={([1, 2, 3] as const).map((n) => ({
              top: (
                <Tag
                  bg={n === 3 ? 'var(--color-accent)' : undefined}
                  color={n === 3 ? 'var(--color-on-accent)' : undefined}
                >
                  0{n}
                </Tag>
              ),
              title: copy[`products.fit.${n}.t`],
              body: copy[`products.fit.${n}.x`],
              dark: n === 3,
            }))}
          />
        </div>
      </InView>

      <InView as="section" data-msg={pc.msg.next} className="relative bg-panel py-24 desk:py-40">
        <div className="wrap grid items-start gap-6 desk:grid-cols-12">
          <h2 className="type-h2 m-0 text-[clamp(44px,5.4vw,80px)] desk:col-span-5">
            <span aria-hidden="true">
              <LineMask line={0}>{next1}</LineMask>
              <LineMask line={1}>
                <span className="text-grey-600">{next2}</span>
              </LineMask>
            </span>
            <span className="sr-only">{copy['products.next.h2']}</span>
          </h2>
          <div className="flex flex-col gap-5 desk:col-span-6 desk:col-start-7">
            <Reveal className="rounded-[28px] bg-ground p-9">
              <div className="flex items-center justify-between gap-4">
                <h3 className="type-h3 m-0 text-[32px]">{pc.nextTools}</h3>
                <Tag bg="var(--color-accent)" color="var(--color-on-accent)">
                  {boardCopy.ventures.tools.tag}
                </Tag>
              </div>
              <p className="type-body mt-4 mb-0 text-grey-700">{copy['products.next.tools.x']}</p>
            </Reveal>
            <Reveal step={1} className="rounded-[28px] bg-ink p-9 text-panel">
              <div className="flex items-center justify-between gap-4">
                <h3 className="type-h3 m-0 text-[32px]">{pc.nextVentures}</h3>
                <Tag bg="rgb(255 255 255 / 0.14)">{pc.notOpenYet}</Tag>
              </div>
              <p className="type-body mt-4 mb-0 text-grey-300">
                {copy['products.next.ventures.x']}
              </p>
            </Reveal>
          </div>
        </div>
      </InView>

      <WaitlistSection
        source="products"
        msg={pc.msg.wait}
        lines={[copy['products.wait.h2.1'], copy['products.wait.h2.2']]}
        lead={copy['products.wait.x']}
        note={
          <>
            {copy['products.wait.note']}{' '}
            <Link href="/privacy" className="underline">
              {boardCopy.privacy}
            </Link>
          </>
        }
      />

      <InView as="section" data-msg={pc.msg.close} className="relative py-24 desk:py-40">
        <div className="wrap grid items-end gap-6 desk:grid-cols-12">
          <Reveal
            as="h2"
            step={1}
            className="type-h2 m-0 text-[clamp(44px,5.4vw,80px)] desk:col-span-7"
          >
            {copy['products.close.h2']}
          </Reveal>
          <Reveal
            step={2}
            className="flex flex-col items-start gap-[18px] desk:col-span-4 desk:col-start-9"
          >
            <p className="type-body m-0 text-grey-700">{copy['products.close.x']}</p>
            <ButtonLink href="/services">{pc.seeWhatWeBuild}</ButtonLink>
          </Reveal>
        </div>
      </InView>
    </SiteChrome>
  );
}
