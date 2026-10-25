import { type CSSProperties, type ReactNode } from 'react';

import { cx } from '../lib/cx';

interface PhoneFrameProps {
  /** Outer size of the device in px. */
  width: number;
  height: number;
  /** Bezel thickness, outer corner radius and screen corner radius in px. */
  padding?: number;
  radius?: number;
  screenRadius?: number;
  /** The screen is drawn on a 390 × 844 canvas and scaled by this factor. */
  scale: number;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}

/** A phone bezel around a scaled 390 × 844 screen canvas. Decorative. */
export function PhoneFrame({
  width,
  height,
  padding = 10,
  radius = 44,
  screenRadius = 34,
  scale,
  className,
  style,
  children,
}: PhoneFrameProps) {
  return (
    <div
      className={cx('phone', className)}
      style={{ ...style, width, height, padding, borderRadius: radius }}
    >
      <div className="phone-screen" style={{ borderRadius: screenRadius }}>
        <div className="phone-canvas" style={{ transform: `scale(${scale})` }}>
          {children}
        </div>
      </div>
    </div>
  );
}

interface BrowserFrameProps {
  width: number;
  height: number;
  radius?: number;
  /** Size of the page canvas before scaling. */
  canvasWidth: number;
  canvasHeight: number;
  scale: number;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}

/** A clipped window around a scaled page canvas (desktop product shots). Decorative. */
export function BrowserFrame({
  width,
  height,
  radius = 16,
  canvasWidth,
  canvasHeight,
  scale,
  className,
  style,
  children,
}: BrowserFrameProps) {
  return (
    <div
      className={cx('browser-frame', className)}
      style={{ ...style, width, height, borderRadius: radius }}
    >
      <div
        className="browser-canvas"
        style={{ width: canvasWidth, height: canvasHeight, transform: `scale(${scale})` }}
      >
        {children}
      </div>
    </div>
  );
}
