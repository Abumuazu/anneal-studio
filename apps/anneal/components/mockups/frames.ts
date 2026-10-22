/**
 * Device sizes from the boards. A phone screen is always drawn on a 390 x 844
 * canvas; the frame size and scale change per placement.
 */
export interface PhoneSize {
  width: number;
  height: number;
  padding: number;
  radius: number;
  screenRadius: number;
  scale: number;
}

/** A phone size as the boards write it: outer box, corner radius and canvas scale. */
export function phone(
  width: number,
  height: number,
  radius: number,
  scale: number,
  padding = 10,
): PhoneSize {
  return { width, height, padding, radius, screenRadius: radius - padding, scale };
}

export interface BrowserSize {
  width: number;
  height: number;
  radius: number;
  scale: number;
}
