import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

const RADII = ['0', '50%', '26%', '50% 0 50% 0'];

/** The mark on ink, for home screens. */
export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        background: '#0b0b0c',
      }}
    >
      <div style={{ display: 'flex', flexWrap: 'wrap', width: 96, height: 96, gap: 12 }}>
        {RADII.map((r) => (
          <div key={r} style={{ width: 42, height: 42, background: '#ffffff', borderRadius: r }} />
        ))}
      </div>
    </div>,
    size,
  );
}
