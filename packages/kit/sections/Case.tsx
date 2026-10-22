import Link from 'next/link';
import { type CSSProperties, type ReactNode } from 'react';

import { cx } from '../lib/cx';
import { InView } from '../motion/InView';
import { LineMask, Reveal } from '../motion/Reveal';
import { ClipIn, Zoom } from '../motion/Scrub';
import { StackCard, StackCards } from '../motion/Stack';
import { WordLight } from '../motion/WordLight';
import { CoverLink, CoverTarget } from '../transitions/Cover';
import { Tag } from '../ui/Links';

/*
 * The case study template. Each section takes its copy as props; colours come
 * from tokens plus a few case variables a site sets on a wrapper:
 * --case-dim (dimmed headline line), --case-dark and --case-dark-muted (the
 * dark question card and its body text).
 */

type Step = 0 | 1 | 2 | 3 | 4 | 5;
const step = (i: number) => Math.min(i, 5) as Step;

/** Masked headline lines, read once by assistive tech. */
function MaskedLines({ lines, dim }: { lines: readonly string[]; dim: readonly number[] }) {
  return (
    <>
      <span aria-hidden="true">
        {lines.map((line, i) => (
          <LineMask key={line} line={i}>
            {dim.includes(i) ? <span className="case-dim">{line}</span> : line}
          </LineMask>
        ))}
      </span>
      <span className="sr-only">{lines.join(' ')}</span>
    </>
  );
}

export interface CaseMetaItem {
  label: string;
  value: string;
}

interface CaseHeaderProps {
  /** "Work / 01 · Enterprise": a link back, then where this case sits. */
  crumb: { href: string; label: string; rest: string };
  lines: readonly string[];
  /** Indexes of headline lines shown dimmed. */
  dim?: readonly number[];
  meta: readonly CaseMetaItem[];
  msg?: string;
}

/** Case hero: breadcrumb, masked headline and the facts row. Reveals on load. */
export function CaseHeader({ crumb, lines, dim = [1], meta, msg }: CaseHeaderProps) {
  return (
    <section data-msg={msg} className="reveal-on-load relative pt-[136px] desk:pt-[190px] pb-20">
      <div className="wrap">
        <Reveal className="type-label text-grey-600">
          <Link href={crumb.href} className="case-crumb">
            {crumb.label}
          </Link>{' '}
          / {crumb.rest}
        </Reveal>
        <h1 className="type-display mt-7 mb-0 text-[clamp(60px,8.6vw,132px)]">
          <MaskedLines lines={lines} dim={dim} />
        </h1>
        <dl className="mt-[72px] mb-0 grid grid-cols-2 gap-6 desk:grid-cols-5">
          {meta.map((m, i) => (
            <Reveal key={m.label} step={step(i)}>
              <dt className="type-label text-grey-600">{m.label}</dt>
              <dd className="mt-2.5 ml-0 font-text text-[17px] font-medium">{m.value}</dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}

interface CaseStageProps {
  background: string;
  /** Stage height in px on wide screens. */
  height: number;
  /** Width of the artwork canvas in px; small screens scale it to fit. */
  canvas?: number;
  /** Canvas scale below 640px and from 640px to 900px. */
  fit?: { sm: number; md: number };
  /** Classes for the canvas (how the artwork is laid out). */
  className?: string;
  children: ReactNode;
}

/**
 * The full-bleed colour stage under the case hero. It opens from a rounded
 * inset, its artwork eases out of a zoom, and it is where a work cover lands.
 * The artwork is decorative.
 */
export function CaseStage({
  background,
  height,
  canvas = 1100,
  fit = { sm: 0.36, md: 0.64 },
  className,
  children,
}: CaseStageProps) {
  const vars = {
    background,
    '--stage-h': `${height}px`,
    '--stage-w': `${canvas}px`,
    '--stage-fit-sm': fit.sm,
    '--stage-fit-md': fit.md,
  } as CSSProperties;
  return (
    <div className="relative pb-10">
      <CoverTarget>
        <ClipIn className="case-stage" style={vars}>
          <div className="case-stage-fit" aria-hidden="true">
            <Zoom className={cx('case-stage-art', className)}>{children}</Zoom>
          </div>
        </ClipIn>
      </CoverTarget>
    </div>
  );
}

interface CaseBriefProps {
  text: string;
  msg?: string;
  /** "wide" starts in column 3, "narrow" in column 4 (boards differ by case). */
  width?: 'wide' | 'narrow';
}

/** The brief, lit word by word as it scrolls through. */
export function CaseBrief({ text, msg, width = 'narrow' }: CaseBriefProps) {
  return (
    <section data-msg={msg} className="relative py-24 desk:py-[140px]">
      <div className="wrap grid desk:grid-cols-12">
        <WordLight
          text={text}
          className={cx(
            'type-h2 m-0 text-[clamp(28px,2.9vw,42px)] leading-[1.22]',
            width === 'wide'
              ? 'desk:col-span-10 desk:col-start-3'
              : 'desk:col-span-9 desk:col-start-4',
          )}
        />
      </div>
    </section>
  );
}

export interface CaseQuestion {
  title: string;
  body: string;
}

const QUESTION_TONES = ['case-q-light', 'case-q-mid', 'case-q-dark'] as const;

interface CaseQuestionsProps {
  heading: string;
  items: readonly CaseQuestion[];
  msg?: string;
}

/** Numbered question cards that stack as they pin at staggered heights. */
export function CaseQuestions({ heading, items, msg }: CaseQuestionsProps) {
  return (
    <InView as="section" data-msg={msg} className="relative pt-10 pb-24 desk:pb-40">
      <div className="wrap">
        <Reveal
          as="h2"
          step={1}
          className="type-h2 mt-0 mb-16 max-w-[980px] text-[clamp(40px,5vw,76px)]"
        >
          {heading}
        </Reveal>
        <StackCards top={110} scaleTo={0.95} shadeTo={0.25} className="gap-6">
          {items.map((q, i) => (
            <StackCard
              key={q.title}
              offset={110 + 30 * i}
              innerClassName={cx('case-q', QUESTION_TONES[i % QUESTION_TONES.length])}
            >
              <span className="type-display text-[72px] desk:text-[150px]" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="type-h3 m-0 text-[26px] desk:text-[clamp(30px,2.8vw,40px)]">
                {q.title}
              </h3>
              <p className="case-q-body type-body m-0">{q.body}</p>
            </StackCard>
          ))}
        </StackCards>
      </div>
    </InView>
  );
}

interface CasePrincipleProps {
  msg?: string;
  /** Masked lines, as the board breaks them. Without lines, `text` rises as one block. */
  lines?: readonly string[];
  dim?: readonly number[];
  text?: string;
}

/** The one-sentence principle, large, on ink. */
export function CasePrinciple({ msg, lines, dim = [], text }: CasePrincipleProps) {
  const classes =
    'type-display-wide m-0 text-[30px] leading-[1.05] desk:text-[clamp(40px,5.2vw,84px)] desk:leading-[1.02]';
  return (
    <ClipIn data-msg={msg} className="relative bg-ink py-24 desk:py-40 text-panel">
      <InView className="wrap">
        {lines ? (
          <p className={cx(classes, '[--case-dim:var(--color-grey-500)]')}>
            <MaskedLines lines={lines} dim={dim} />
          </p>
        ) : (
          <Reveal as="p" className={cx(classes, 'max-w-[1180px]')}>
            {text}
          </Reveal>
        )}
      </InView>
    </ClipIn>
  );
}

export interface CaseFeature {
  title: string;
  body: string;
}

interface CaseFeaturesProps {
  heading: string;
  items: readonly CaseFeature[];
  msg?: string;
  /** Shown under the grid, e.g. the stack as tags. */
  after?: ReactNode;
}

/** "What we built": lettered feature cards. */
export function CaseFeatures({ heading, items, msg, after }: CaseFeaturesProps) {
  return (
    <InView as="section" data-msg={msg} className="relative pt-24 desk:pt-40 pb-16 desk:pb-[120px]">
      <div className="wrap">
        <Reveal as="h2" step={1} className="type-h2 m-0 max-w-[920px] text-[clamp(40px,5vw,76px)]">
          {heading}
        </Reveal>
        <ul className="mt-16 mb-0 grid list-none gap-5 p-0 desk:grid-cols-3">
          {items.map((f, i) => (
            <Reveal as="li" key={f.title} step={step(i % 3)} className="flex">
              <div className="case-feat">
                <span className="case-feat-tile" aria-hidden="true">
                  {String.fromCharCode(65 + i)}
                </span>
                <h3 className="type-h3 mt-auto mb-0 pt-6 text-[24px] desk:pt-10 desk:text-[28px]">
                  {f.title}
                </h3>
                <p className="type-body mt-2.5 mb-0 text-[17px] text-grey-700">{f.body}</p>
              </div>
            </Reveal>
          ))}
        </ul>
        {after}
      </div>
    </InView>
  );
}

interface CaseTagsProps {
  items: readonly string[];
  /** Tag background. */
  bg?: string;
  /** Accessible name for the list, when there is no visible heading. */
  label?: string;
  className?: string;
}

/** The stack, as a row of tags. */
export function CaseTags({ items, bg, label, className }: CaseTagsProps) {
  return (
    <Reveal className={className}>
      <ul aria-label={label} className="m-0 flex list-none flex-wrap gap-2 p-0">
        {items.map((t) => (
          <li key={t}>
            <Tag bg={bg}>{t}</Tag>
          </li>
        ))}
      </ul>
    </Reveal>
  );
}

interface CaseBuiltWithProps {
  heading: string;
  items: readonly string[];
  msg?: string;
}

/** "Built with", on a white band. */
export function CaseBuiltWith({ heading, items, msg }: CaseBuiltWithProps) {
  return (
    <InView as="section" data-msg={msg} className="relative bg-panel py-24 desk:py-[110px]">
      <div className="wrap">
        <Reveal as="h2" className="type-h3 m-0 text-[32px]">
          {heading}
        </Reveal>
        <CaseTags items={items} bg="var(--color-grey-100)" className="mt-[22px]" />
      </div>
    </InView>
  );
}

interface NextCaseProps {
  href: string;
  /** Small line above the title, e.g. "Next project · 02 · Fintech". */
  label: string;
  title: string;
  msg?: string;
  /** Text for the cursor label. */
  cursor?: string;
  /** Drop the top padding when the section above already has its own. */
  flush?: boolean;
}

/** A large card linking to the next case. Ink fills it on hover; it grows into the next stage. */
export function NextCase({ href, label, title, msg, cursor, flush }: NextCaseProps) {
  return (
    <InView
      as="section"
      data-msg={msg}
      className={cx('relative pb-24 desk:pb-[140px]', !flush && 'pt-[140px]')}
    >
      <div className="wrap">
        <Reveal>
          <CoverLink href={href} className="case-next" data-cursor={cursor}>
            <span className="case-next-t type-label block text-grey-600">{label}</span>
            <span className="mt-[26px] flex items-end justify-between gap-6">
              <span className="case-next-t type-display text-[clamp(64px,9vw,140px)]">{title}</span>
              <span className="case-next-arrow" aria-hidden="true">
                ↗
              </span>
            </span>
          </CoverLink>
        </Reveal>
      </div>
    </InView>
  );
}
