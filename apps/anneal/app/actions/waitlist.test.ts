import { joinWaitlist } from './waitlist';

vi.mock('server-only', () => ({}));

function form(fields: Record<string, string>): FormData {
  const f = new FormData();
  for (const [k, v] of Object.entries(fields)) f.set(k, v);
  return f;
}

describe('joinWaitlist', () => {
  afterEach(() => {
    delete process.env.INTEGRATIONS;
  });

  it('rejects an invalid address', async () => {
    process.env.INTEGRATIONS = 'memory';
    expect(await joinWaitlist(null, form({ email: 'nope', source: 'studio' }))).toEqual({
      ok: false,
      invalid: true,
    });
  });

  it('rejects an unknown source', async () => {
    process.env.INTEGRATIONS = 'memory';
    expect((await joinWaitlist(null, form({ email: 'a@b.co', source: 'x' }))).ok).toBe(false);
  });

  it('never reports success without a store', async () => {
    expect(await joinWaitlist(null, form({ email: 'a@b.co', source: 'products' }))).toEqual({
      ok: false,
    });
  });

  it('stores a valid address', async () => {
    process.env.INTEGRATIONS = 'memory';
    expect(await joinWaitlist(null, form({ email: 'a@b.co', source: 'products' }))).toEqual({
      ok: true,
    });
  });
});
