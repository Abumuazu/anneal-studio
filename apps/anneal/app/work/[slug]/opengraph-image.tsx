import { cases, requireCase } from '@/content/cases';
import { site } from '@/content/site.config';
import { OG_SIZE, ogImage } from '@/lib/og';

export const alt = site.name;
export const size = OG_SIZE;
export const contentType = 'image/png';

export function generateStaticParams() {
  return cases.map((c) => ({ slug: c.slug }));
}

/** A case's social card: its name on its stage colour. */
export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const entry = requireCase((await params).slug);
  return ogImage({ headline: entry.title, label: entry.kicker, background: entry.theme.stage });
}
