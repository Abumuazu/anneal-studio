import {
  Cormorant_Garamond,
  Geist_Mono,
  Special_Gothic,
  Special_Gothic_Condensed_One,
  Special_Gothic_Expanded_One,
} from 'next/font/google';

/*
 * Self-hosted at build time by next/font. Only the latin subset is preloaded;
 * latin-ext (which carries ₦) is still declared and loads on demand.
 * Only the condensed display face is preloaded: it sets the hero headline, the
 * LCP element. Every other face swaps in on demand.
 *
 * next/font has no fallback metrics for the Special Gothic family yet, so each
 * face names a size-adjusted Arial fallback declared in globals.css. The values
 * come from next/font's own getFallbackMetricsFromFontFile run on the latin
 * woff2 files Google serves, so the swap does not shift layout.
 */

export const text = Special_Gothic({
  subsets: ['latin'],
  weight: 'variable',
  display: 'swap',
  variable: '--ff-text',
  preload: false,
  adjustFontFallback: false,
  fallback: ['Special Gothic Fallback', 'Arial', 'sans-serif'],
});

export const display = Special_Gothic_Condensed_One({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  variable: '--ff-display',
  preload: true,
  adjustFontFallback: false,
  fallback: ['Special Gothic Condensed Fallback', 'Arial', 'sans-serif'],
});

export const displayWide = Special_Gothic_Expanded_One({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  variable: '--ff-display-wide',
  preload: false,
  adjustFontFallback: false,
  fallback: ['Special Gothic Expanded Fallback', 'Arial', 'sans-serif'],
});

export const mono = Geist_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
  variable: '--ff-mono',
  preload: false,
  // next/font's own fallback for Geist Mono is Arial at 134.6%, which sets
  // labels about 38% wider than the real face, so they wrap and then jump.
  // A monospace fallback with the same 0.6em advance keeps every line put.
  adjustFontFallback: false,
  fallback: ['Geist Mono Fallback', 'Courier New', 'monospace'],
});

/** Only for the jewellery mockup's brand ("Atelier"), as on the board. Loads when that card renders. */
export const serifMock = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['500', '600'],
  display: 'swap',
  variable: '--ff-serif-mock',
  preload: false,
});

export const fontVariables = [text, display, displayWide, mono, serifMock]
  .map((f) => f.variable)
  .join(' ');
