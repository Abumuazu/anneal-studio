import { outbox } from '@/lib/integrations/memory';

import { sendBrief } from './brief';

vi.mock('server-only', () => ({}));

function form(fields: Record<string, string>): FormData {
  const f = new FormData();
  for (const [k, v] of Object.entries(fields)) f.set(k, v);
  return f;
}

const valid = {
  offer: 'Mobile MVP',
  stage: 'Live product',
  timing: 'As soon as possible',
  name: 'Ada Obi',
  email: 'ada@example.com',
  heard: 'LinkedIn',
  currency: 'NGN',
  utm_source: 'linkedin',
  website: '',
};

describe('sendBrief', () => {
  beforeEach(() => {
    process.env.INTEGRATIONS = 'memory';
    const o = outbox();
    o.briefs.length = 0;
    o.mail.length = 0;
  });
  afterEach(() => {
    delete process.env.INTEGRATIONS;
  });

  it('stores the brief and emails the studio', async () => {
    expect(await sendBrief(null, form(valid))).toEqual({ ok: true });
    const [brief] = outbox().briefs;
    expect(brief).toMatchObject({ offer: 'Mobile MVP', name: 'Ada Obi', utm_source: 'linkedin' });
    expect(brief?.company).toBeUndefined();
    const [mail] = outbox().mail;
    expect(mail?.subject).toBe('Brief: Mobile MVP · Ada Obi');
    expect(mail?.replyTo).toBe('ada@example.com');
    expect(mail?.text).toContain('Timing: As soon as possible');
  });

  it('rejects answers that are not on the form', async () => {
    expect(await sendBrief(null, form({ ...valid, stage: 'Somewhere' }))).toEqual({
      ok: false,
      invalid: true,
    });
    expect(await sendBrief(null, form({ ...valid, email: 'nope' }))).toMatchObject({ ok: false });
    expect(await sendBrief(null, form({ ...valid, name: ' ' }))).toMatchObject({ ok: false });
  });

  it('lets the optional steps be skipped', async () => {
    const { offer: _o, stage: _s, timing: _t, heard: _h, ...rest } = valid;
    expect(await sendBrief(null, form(rest))).toEqual({ ok: true });
  });

  it('keeps nothing from a bot that fills the honeypot', async () => {
    expect(await sendBrief(null, form({ ...valid, website: 'spam' }))).toEqual({
      ok: false,
      invalid: true,
    });
    expect(outbox().briefs).toHaveLength(0);
  });

  it('never reports success with nothing set up', async () => {
    delete process.env.INTEGRATIONS;
    const errors = vi.spyOn(console, 'error').mockImplementation(() => undefined);
    expect(await sendBrief(null, form(valid))).toEqual({ ok: false });
    errors.mockRestore();
  });
});
