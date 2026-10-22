import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

import { pickOnColor } from '@studio/kit/lib';
import { ImageResponse } from 'next/og';

import { site } from '@/content/site.config';

export const OG_SIZE = { width: 1200, height: 630 };

const font = (file: string) => readFile(join(process.cwd(), 'assets/fonts', file));

/** The four-cell mark: square, circle, rounded, leaf. */
function Mark({ size, color }: { size: number; color: string }) {
  const cell = size * 0.44;
  const radii = ['0', '50%', '26%', '50% 0 50% 0'];
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', width: size, height: size, gap: size * 0.12 }}>
      {radii.map((r) => (
        <div key={r} style={{ width: cell, height: cell, background: color, borderRadius: r }} />
      ))}
    </div>
  );
}

/** A social card: the mark and wordmark on top, a large headline below, a small label. */
export async function ogImage({
  headline,
  label,
  background = '#0b0b0c',
}: {
  headline: string;
  label?: string;
  background?: string;
}) {
  const fg = pickOnColor(background, '#0b0b0c', '#ffffff');
  const [condensed, expanded] = await Promise.all([
    font('SpecialGothicCondensedOne-Regular.ttf'),
    font('SpecialGothicExpandedOne-Regular.ttf'),
  ]);
  return new ImageResponse(
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '100%',
        height: '100%',
        padding: 64,
        background,
        color: fg,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
        <Mark size={44} color={fg} />
        <div style={{ fontFamily: 'Expanded', fontSize: 34, letterSpacing: '-0.025em' }}>
          {site.name.split(' ')[0]?.toUpperCase()}
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        {label ? (
          <div style={{ fontFamily: 'Expanded', fontSize: 22, opacity: 0.7 }}>
            {label.toUpperCase()}
          </div>
        ) : null}
        <div
          style={{
            fontFamily: 'Condensed',
            fontSize: 132,
            lineHeight: 0.86,
            textTransform: 'uppercase',
            maxWidth: 1000,
          }}
        >
          {headline}
        </div>
      </div>
    </div>,
    {
      ...OG_SIZE,
      fonts: [
        { name: 'Condensed', data: condensed, weight: 400, style: 'normal' },
        { name: 'Expanded', data: expanded, weight: 400, style: 'normal' },
      ],
    },
  );
}
