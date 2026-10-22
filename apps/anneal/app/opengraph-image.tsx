import { boardCopy } from '@/content/copy';
import { site } from '@/content/site.config';
import { OG_SIZE, ogImage } from '@/lib/og';

export const alt = site.name;
export const size = OG_SIZE;
export const contentType = 'image/png';

/** The site's default social card: the Home headline. */
export default function Image() {
  return ogImage({ headline: boardCopy.heroH1, label: boardCopy.cities });
}
