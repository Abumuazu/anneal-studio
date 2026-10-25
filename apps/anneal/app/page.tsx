import { approved } from '@/content/approved';
import { SiteChrome } from '@/components/SiteChrome';
import { Builds } from '@/components/home/Builds';
import { Cases } from '@/components/home/Cases';
import { Hero } from '@/components/home/Hero';
import { Preloader } from '@/components/home/Preloader';
import { Pricing } from '@/components/home/Pricing';
import { Process } from '@/components/home/Process';
import { Studio } from '@/components/home/Studio';
import { Ventures } from '@/components/home/Ventures';
import { copy } from '@/content/copy';
import { site } from '@/content/site.config';
import { pageMetadata, siteUrl } from '@/lib/seo';

export const metadata = pageMetadata({
  title: approved.meta.Home.title,
  description: approved.meta.Home.description,
  path: '/',
});

/** Who the studio is, for search engines. Only facts the site already states. */
function Organization() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: site.name,
    url: siteUrl().origin,
    email: site.email,
    description: approved.shared['Organisation description'],
  };
  return (
    <script
      type="application/ld+json"
      // JSON.stringify output, with "<" escaped so the copy can never close the tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  );
}

/** Home (design/v6/HomeV6.dc.html). */
export default function HomePage() {
  return (
    <SiteChrome variant="home" closingMsg={copy['home.msg.8']} footerMsg={copy['home.msg.9']}>
      <Organization />
      <Preloader />
      <Hero />
      <Builds />
      <Cases />
      <Ventures />
      <Process />
      <Pricing />
      <Studio />
    </SiteChrome>
  );
}
