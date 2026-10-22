import {
  InView,
  LineMask,
  MorphTile,
  Reveal,
  ScrollSteps,
  StackCard,
  StackCards,
  StepItem,
} from '@studio/kit/motion';
import { CoverLink } from '@studio/kit/transitions';
import { ButtonLink } from '@studio/kit/ui';

import { Chrome } from '@/components/Chrome';
import { caseHref, cases } from '@/content/cases';
import { copy, site } from '@/content/site';

export default function HomePage() {
  const [a, b, c] = copy.hero.lines;
  return (
    <Chrome>
      <section data-msg={copy.hero.msg} className="reveal-on-load relative pt-[200px] pb-[140px]">
        <div className="wrap">
          <h1 className="type-display m-0 text-[clamp(64px,11vw,176px)]">
            <span aria-hidden="true">
              <LineMask line={0}>{a}</LineMask>
              <LineMask line={1}>
                <span className="text-grey-600">{b}</span>
                <MorphTile
                  glyphs={['g-spark', 'g-code', 'g-app', 'g-stack']}
                  background="var(--color-accent)"
                  color="var(--color-on-accent)"
                />
              </LineMask>
              <LineMask line={2}>{c}</LineMask>
            </span>
            <span className="sr-only">{copy.hero.lines.join(' ')}</span>
          </h1>
          <Reveal as="p" step={2} className="type-lead mt-12 mb-0 max-w-[620px] text-grey-700">
            {copy.hero.lead}
          </Reveal>
          <Reveal step={3} className="mt-10">
            <ButtonLink
              href={site.contactHref}
              handoff
              bg="var(--color-ink)"
              fg="var(--color-panel)"
            >
              {copy.cta}
            </ButtonLink>
          </Reveal>
        </div>
      </section>

      <InView as="section" id="work" data-msg={copy.work.msg} className="relative pb-40">
        <div className="wrap">
          <Reveal as="h2" className="type-h2 mt-0 mb-14 text-[clamp(44px,5.4vw,80px)]">
            {copy.work.heading}
          </Reveal>
          <StackCards top={24} className="gap-6">
            {cases.map((entry) => (
              <StackCard key={entry.slug} innerClassName="overflow-hidden rounded-[32px]">
                <CoverLink
                  href={caseHref(entry.slug)}
                  data-cursor={copy.labels.viewCase}
                  className="block p-8 desk:p-12"
                  style={{ background: entry.colour, color: 'var(--color-on-accent)' }}
                >
                  <span className="type-label">{entry.kicker}</span>
                  <h3 className="type-display mt-6 mb-0 text-[clamp(56px,7vw,112px)]">
                    {entry.title}
                  </h3>
                  <p className="type-lead mt-5 mb-0 max-w-[560px]">{entry.line}</p>
                </CoverLink>
              </StackCard>
            ))}
          </StackCards>
        </div>
      </InView>

      <InView
        as="section"
        id="process"
        data-msg={copy.process.msg}
        className="relative bg-panel py-40"
      >
        <div className="wrap grid items-start gap-6 desk:grid-cols-12">
          <h2 className="type-h2 m-0 text-[clamp(44px,5.4vw,80px)] desk:sticky desk:top-[120px] desk:col-span-5">
            <LineMask>{copy.process.heading}</LineMask>
          </h2>
          <ScrollSteps
            count={copy.process.steps.length}
            className="desk:col-span-6 desk:col-start-7"
          >
            {copy.process.steps.map((s, i) => (
              <StepItem
                key={s.title}
                index={i}
                className="py-8 text-text-dim transition-colors duration-[600ms] data-[active=true]:text-ink"
              >
                <div className="type-display text-[80px]" aria-hidden="true">
                  0{i + 1}
                </div>
                <h3 className="type-h3 mt-4 mb-0 text-[30px]">{s.title}</h3>
                <p className="type-body mt-3 mb-0">{s.body}</p>
              </StepItem>
            ))}
          </ScrollSteps>
        </div>
      </InView>
    </Chrome>
  );
}
