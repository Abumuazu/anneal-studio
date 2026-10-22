import { type BootConfig, bootScript } from './boot';

const cfg: BootConfig = {
  motionKey: 'm',
  currency: { cookie: 'currency', codes: ['USD', 'EUR', 'NGN'], fallback: 'USD' },
  handoff: { key: 'h', maxAgeMs: 6000 },
};

function run(): void {
  // Executes the exact string that ships in <head>, so the test covers the
  // serialised script and not just the function it came from.
  // eslint-disable-next-line @typescript-eslint/no-implied-eval, @typescript-eslint/no-unsafe-call
  new Function(bootScript(cfg))();
}

function clearCookies(): void {
  for (const c of document.cookie.split('; ')) {
    const name = c.split('=')[0];
    if (name) document.cookie = `${name}=; Max-Age=0; Path=/`;
  }
}

describe('boot script', () => {
  beforeEach(() => {
    sessionStorage.clear();
    clearCookies();
    const root = document.documentElement;
    root.removeAttribute('data-motion');
    root.removeAttribute('data-currency');
    root.removeAttribute('data-handoff');
  });

  it('defaults to full motion and the fallback currency', () => {
    run();
    expect(document.documentElement.dataset.motion).toBe('full');
    expect(document.documentElement.dataset.currency).toBe('USD');
  });

  it('honours a reduced-motion override', () => {
    sessionStorage.setItem('m', 'reduce');
    run();
    expect(document.documentElement.dataset.motion).toBe('reduce');
  });

  it('reads a valid currency cookie and ignores an unknown one', () => {
    document.cookie = 'currency=NGN; Path=/';
    run();
    expect(document.documentElement.dataset.currency).toBe('NGN');
    document.cookie = 'currency=GBP; Path=/';
    run();
    expect(document.documentElement.dataset.currency).toBe('USD');
  });

  it('marks a fresh hand-off and ignores a stale one', () => {
    sessionStorage.setItem('h', String(Date.now() - 1000));
    run();
    expect(document.documentElement.dataset.handoff).toBe('arrive');

    document.documentElement.removeAttribute('data-handoff');
    sessionStorage.setItem('h', String(Date.now() - 60000));
    run();
    expect(document.documentElement.dataset.handoff).toBeUndefined();
  });

  it('skips the hand-off overlay with reduced motion', () => {
    sessionStorage.setItem('m', 'reduce');
    sessionStorage.setItem('h', String(Date.now()));
    run();
    expect(document.documentElement.dataset.handoff).toBeUndefined();
  });
});
