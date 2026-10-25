import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { type CSSProperties } from 'react';

import { approved } from '@/content/approved';

import { SiteChrome } from '@/components/SiteChrome';
import { caseBySlug, caseHref, cases } from '@/content/cases';
import { chromeCopy } from '@/content/pages';
import { pageMetadata } from '@/lib/seo';

interface Params {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return cases.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const entry = caseBySlug((await params).slug);
  if (!entry) return {};
  const meta =
    approved.meta[entry.title as 'Wisp' | 'Naira to crypto exchange' | 'Jewellery marketplace'];
  return pageMetadata({
    title: meta.title,
    description: meta.description,
    path: caseHref(entry.slug),
  });
}

export default async function CasePage({ params }: Params) {
  const entry = caseBySlug((await params).slug);
  if (!entry) notFound();
  const { default: Content } = await entry.load();
  const theme = {
    '--case-dark': entry.theme.dark,
    '--case-dark-muted': entry.theme.darkMuted,
  } as CSSProperties;
  return (
    <SiteChrome variant="page" closingMsg={entry.closingMsg} footerMsg={chromeCopy.footerMsg}>
      <div style={theme}>
        <Content />
      </div>
    </SiteChrome>
  );
}
