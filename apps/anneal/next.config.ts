import createMDX from '@next/mdx';
import type { NextConfig } from 'next';

const config: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // The kit ships TypeScript source; Next compiles it with the app.
  transpilePackages: ['@studio/kit'],
  experimental: {
    optimizePackageImports: ['gsap'],
  },
  headers() {
    return Promise.resolve([
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains' },
        ],
      },
    ]);
  },
};

// Case studies are MDX files under content/cases, imported by the case route.
const withMDX = createMDX({ extension: /\.mdx$/ });

export default withMDX(config);
