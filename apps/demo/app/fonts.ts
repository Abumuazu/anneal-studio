import { Geist, Geist_Mono, Oswald } from 'next/font/google';

// Self-hosted at build time. Swap for the site's own faces.
export const text = Geist({ subsets: ['latin'], variable: '--ff-text', display: 'swap' });
export const display = Oswald({
  subsets: ['latin'],
  weight: '500',
  variable: '--ff-display',
  display: 'swap',
});
export const mono = Geist_Mono({ subsets: ['latin'], variable: '--ff-mono', display: 'swap' });

export const fontVariables = [text, display, mono].map((f) => f.variable).join(' ');
