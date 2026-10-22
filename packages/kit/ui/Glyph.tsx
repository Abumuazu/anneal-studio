import { type CSSProperties } from 'react';

/** The kit's glyph set. Render <GlyphSprite /> once per page, then <Glyph />. */
export const GLYPHS = {
  'g-spark': (
    <path
      d="M24 4C26 18 30 22 44 24C30 26 26 30 24 44C22 30 18 26 4 24C18 22 22 18 24 4Z"
      fill="currentColor"
    />
  ),
  'g-dots': (
    <>
      <circle cx="15" cy="15" r="8" fill="currentColor" />
      <circle cx="33" cy="15" r="8" fill="currentColor" />
      <circle cx="15" cy="33" r="8" fill="currentColor" />
      <circle cx="33" cy="33" r="8" fill="currentColor" />
    </>
  ),
  'g-arrow': (
    <path d="M13 35L33 15M17 14H34V31" fill="none" stroke="currentColor" strokeWidth="5.5" />
  ),
  'g-cursor': <path d="M12 7L38 26L27 28L33 40L27 43L21 31L13 38Z" fill="currentColor" />,
  'g-app': (
    <>
      <rect
        x="13"
        y="4"
        width="22"
        height="40"
        rx="6"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
      />
      <rect x="19" y="9" width="10" height="3.5" rx="1.75" fill="currentColor" />
      <rect x="20" y="36" width="8" height="3" rx="1.5" fill="currentColor" />
    </>
  ),
  'g-code': (
    <path
      d="M17 12L6 24L17 36M31 12L42 24L31 36"
      fill="none"
      stroke="currentColor"
      strokeWidth="5"
    />
  ),
  'g-stack': (
    <>
      <path d="M24 7L42 16L24 25L6 16Z" fill="currentColor" />
      <path
        d="M6 24L24 33L42 24M6 32L24 41L42 32"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
      />
    </>
  ),
  'g-web': (
    <>
      <rect
        x="5"
        y="8"
        width="38"
        height="28"
        rx="4"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path d="M5 16H43" stroke="currentColor" strokeWidth="4" />
      <circle cx="10.5" cy="12" r="1.6" fill="currentColor" />
      <circle cx="15.5" cy="12" r="1.6" fill="currentColor" />
      <path d="M17 43H31M24 36V43" stroke="currentColor" strokeWidth="4" />
    </>
  ),
} as const;

export type GlyphName = keyof typeof GLYPHS;

export function GlyphSprite() {
  return (
    <svg width="0" height="0" aria-hidden="true" style={{ position: 'absolute' }}>
      <defs>
        {Object.entries(GLYPHS).map(([id, shape]) => (
          <symbol key={id} id={id} viewBox="0 0 48 48">
            {shape}
          </symbol>
        ))}
      </defs>
    </svg>
  );
}

interface GlyphProps {
  name: GlyphName;
  className?: string;
  style?: CSSProperties;
}

/** A decorative glyph. Always hidden from assistive tech. */
export function Glyph({ name, className, style }: GlyphProps) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" className={className} style={style}>
      <use href={`#${name}`} />
    </svg>
  );
}
