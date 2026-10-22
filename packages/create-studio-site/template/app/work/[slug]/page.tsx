import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { Chrome } from '@/components/Chrome';
import { caseBySlug, cases } from '@/content/cases';
import { site } from '@/content/site';

interface Params {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return cases.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const entry = caseBySlug((await params).slug);
  return entry ? { title: `${entry.title} · ${site.name}`, description: entry.line } : {};
}

export default async function CasePage({ params }: Params) {
  const entry = caseBySlug((await params).slug);
  if (!entry) notFound();
  const { default: Content } = await entry.load();
  return (
    <Chrome>
      <Content />
    </Chrome>
  );
}
