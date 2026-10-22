import { cardRect, consumeHandoff, isPlainClick, writeHandoff } from './handoff-flag';

describe('hand-off flag', () => {
  beforeEach(() => sessionStorage.clear());

  it('is consumed once when fresh', () => {
    writeHandoff(sessionStorage, 'k', 1000);
    expect(consumeHandoff(sessionStorage, 'k', 6000, 3000)).toBe(true);
    expect(consumeHandoff(sessionStorage, 'k', 6000, 3000)).toBe(false);
  });

  it('works on every navigation, not only the first', () => {
    for (let i = 1; i <= 3; i++) {
      writeHandoff(sessionStorage, 'k', 10000 * i);
      expect(consumeHandoff(sessionStorage, 'k', 6000, 10000 * i + 500)).toBe(true);
    }
  });

  it('ignores and clears a stale or malformed flag', () => {
    writeHandoff(sessionStorage, 'k', 1000);
    expect(consumeHandoff(sessionStorage, 'k', 6000, 9000)).toBe(false);
    expect(sessionStorage.getItem('k')).toBeNull();
    sessionStorage.setItem('k', 'yes');
    expect(consumeHandoff(sessionStorage, 'k', 6000)).toBe(false);
  });
});

describe('cardRect', () => {
  it('centres the card on the button, kept 24px inside the viewport', () => {
    const r = cardRect(
      { left: 1300, top: 20, width: 140, height: 44 },
      { width: 1440, height: 900 },
    );
    expect(r.width).toBe(260);
    expect(r.height).toBe(380);
    expect(r.left + r.width).toBeLessThanOrEqual(1440 - 24);
    expect(r.top).toBeGreaterThanOrEqual(24);
  });

  it('shrinks on small screens', () => {
    const r = cardRect({ left: 10, top: 700, width: 120, height: 42 }, { width: 390, height: 500 });
    expect(r.width).toBe(195);
    expect(r.height).toBeCloseTo(500 * 0.62);
    expect(r.left).toBeGreaterThanOrEqual(24);
  });
});

describe('isPlainClick', () => {
  const base = {
    button: 0,
    metaKey: false,
    ctrlKey: false,
    shiftKey: false,
    altKey: false,
    defaultPrevented: false,
  };
  it('accepts a plain left click only', () => {
    expect(isPlainClick(base)).toBe(true);
    expect(isPlainClick({ ...base, metaKey: true })).toBe(false);
    expect(isPlainClick({ ...base, button: 1 })).toBe(false);
    expect(isPlainClick({ ...base, defaultPrevented: true })).toBe(false);
  });
});
