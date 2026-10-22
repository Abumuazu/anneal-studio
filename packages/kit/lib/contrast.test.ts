import { contrastRatio, pickOnColor, relativeLuminance } from './contrast';

describe('contrast', () => {
  it('matches the WCAG reference values for black and white', () => {
    expect(relativeLuminance('#000')).toBe(0);
    expect(relativeLuminance('#ffffff')).toBeCloseTo(1, 5);
    expect(contrastRatio('#000000', '#ffffff')).toBeCloseTo(21, 5);
  });

  it('is symmetric', () => {
    expect(contrastRatio('#3366CC', '#111111')).toBeCloseTo(
      contrastRatio('#111111', '#3366CC'),
      10,
    );
  });

  it('picks the more readable foreground', () => {
    expect(pickOnColor('#FFFFFF', '#111111', '#FFFFFF')).toBe('#111111');
    expect(pickOnColor('#111111', '#111111', '#FFFFFF')).toBe('#FFFFFF');
  });

  it('rejects non-hex input', () => {
    expect(() => relativeLuminance('violet')).toThrow();
  });
});
