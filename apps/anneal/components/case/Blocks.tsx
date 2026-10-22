import {
  CaseBrief,
  CaseBuiltWith,
  CaseFeatures,
  CaseHeader,
  CasePrinciple,
  CaseQuestions,
  CaseTags,
  NextCase,
} from '@studio/kit/sections';
import { type ReactNode } from 'react';

import { caseLabels } from '@/content/appendix';
import { caseHref, requireCase } from '@/content/cases';
import { boardCopy } from '@/content/copy';
import { caseCopy } from '@/content/pages';

import { childrenOf, plainText } from './text';

/*
 * The building blocks a case MDX file is written with. Copy goes in the file,
 * word for word from the deck or the appendix (content/cases.test.ts checks
 * it); labels, links and colours come from here.
 */

interface CaseHeroProps {
  slug: string;
  msg: string;
  lines: string[];
  meta: { client: string; sector: string; platform: string; did: string; year?: string };
}

export function CaseHero({ slug, msg, lines, meta }: CaseHeroProps) {
  const entry = requireCase(slug);
  const labels = caseLabels.meta;
  return (
    <CaseHeader
      msg={msg}
      crumb={{ href: '/work', label: boardCopy.nav.work, rest: entry.crumb }}
      lines={lines}
      meta={[
        { label: labels.client, value: meta.client },
        { label: labels.sector, value: meta.sector },
        { label: labels.platform, value: meta.platform },
        { label: labels.did, value: meta.did },
        ...(meta.year ? [{ label: labels.year, value: meta.year }] : []),
      ]}
    />
  );
}

export function Brief({
  msg,
  width,
  children,
}: {
  msg: string;
  width?: 'wide' | 'narrow';
  children: ReactNode;
}) {
  return <CaseBrief msg={msg} width={width} text={plainText(children, 'Brief')} />;
}

/** One question inside `Questions`: the title, then the answer as its text. */
export function Question(_props: { title: string; children: ReactNode }): ReactNode {
  throw new Error('<Question> only works inside <Questions>.');
}

export function Questions({
  msg,
  heading,
  children,
}: {
  msg: string;
  heading: string;
  children: ReactNode;
}) {
  const items = childrenOf(children, Question, 'Questions').map((q) => ({
    title: q.props.title,
    body: plainText(q.props.children, `Question "${q.props.title}"`),
  }));
  return <CaseQuestions msg={msg} heading={heading} items={items} />;
}

/** The principle: either `lines` as the board breaks them, or one sentence as text. */
export function Principle({
  msg,
  lines,
  dim,
  children,
}: {
  msg: string;
  lines?: string[];
  dim?: number[];
  children?: ReactNode;
}) {
  if (lines) return <CasePrinciple msg={msg} lines={lines} dim={dim} />;
  return <CasePrinciple msg={msg} text={plainText(children, 'Principle')} />;
}

/** One card inside `Features`. */
export function Feature(_props: { title: string; children: ReactNode }): ReactNode {
  throw new Error('<Feature> only works inside <Features>.');
}

export function Features({
  msg,
  heading,
  stack,
  children,
}: {
  msg: string;
  heading: string;
  /** "A · B · C": shown as tags under the grid (Wisp). */
  stack?: string;
  children: ReactNode;
}) {
  const items = childrenOf(children, Feature, 'Features').map((f) => ({
    title: f.props.title,
    body: plainText(f.props.children, `Feature "${f.props.title}"`),
  }));
  const after = stack ? (
    <CaseTags
      items={stack.split(' · ')}
      bg="var(--color-panel)"
      label={caseLabels.builtWith}
      className="mt-10"
    />
  ) : undefined;
  return <CaseFeatures msg={msg} heading={heading} items={items} after={after} />;
}

export function BuiltWith({
  msg,
  heading,
  children,
}: {
  msg: string;
  heading: string;
  children: ReactNode;
}) {
  return (
    <CaseBuiltWith
      msg={msg}
      heading={heading}
      items={plainText(children, 'BuiltWith').split(' · ')}
    />
  );
}

/** The link to the next case. Its label and title come from the registry. */
export function Next({ slug, msg, flush }: { slug: string; msg: string; flush?: boolean }) {
  const next = requireCase(slug);
  return (
    <NextCase
      href={caseHref(next.slug)}
      label={`${caseCopy.nextProject} · ${next.crumb}`}
      title={next.title}
      msg={msg}
      cursor={caseCopy.nextCursor}
      flush={flush}
    />
  );
}

/** One step inside `WispFlow` or `MoneyFlow`: the title, then its line as text. */
export function FlowStep(_props: { title: string; children: ReactNode }): ReactNode {
  throw new Error('<FlowStep> only works inside a flow.');
}

export function flowSteps(children: ReactNode, where: string) {
  return childrenOf(children, FlowStep, where).map((s) => ({
    title: s.props.title,
    body: plainText(s.props.children, `FlowStep "${s.props.title}"`),
  }));
}
