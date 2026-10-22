import createMDX from '@next/mdx';
import type { NextConfig } from 'next';

const config: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // The kit ships TypeScript source; Next compiles it with the site.
  transpilePackages: ['@studio/kit'],
  experimental: {
    optimizePackageImports: ['gsap'],
  },
};

// Case studies are MDX files under content/cases.
export default createMDX({ extension: /\.mdx$/ })(config);
