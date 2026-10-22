import { calCom, nextWeekdays, studioDate, studioSlots } from './calendar';
import { resend } from './mail';
import type { Brief } from '@/lib/brief';

import { briefProperties, notion } from './records';

vi.mock('server-only', () => ({}));

/** A fetch stub that records requests and answers with `body`. */
function stubFetch(body: unknown, status = 200) {
  const calls: { url: string; init?: RequestInit; body: string }[] = [];
  const fn = (input: string | URL | Request, init?: RequestInit) => {
    const sent = typeof init?.body === 'string' ? init.body : '';
    calls.push({ url: input instanceof Request ? input.url : String(input), init, body: sent });
    return Promise.resolve(new Response(JSON.stringify(body), { status }));
  };
  return { fetch: fn, calls };
}

const header = (init: RequestInit | undefined, name: string) =>
  new Headers(init?.headers).get(name);

describe('calendar helpers', () => {
  it('uses the studio date (WAT, UTC+1)', () => {
    expect(studioDate(new Date('2026-10-21T22:30:00Z'))).toBe('2026-10-21');
    expect(studioDate(new Date('2026-10-21T23:30:00Z'))).toBe('2026-10-22');
  });

  it('lists the next weekdays, skipping weekends', () => {
    // Wednesday 21 October 2026.
    expect(nextWeekdays(new Date('2026-10-21T09:00:00Z'), 5)).toEqual([
      '2026-10-22',
      '2026-10-23',
      '2026-10-26',
      '2026-10-27',
      '2026-10-28',
    ]);
  });

  it('places the board times in WAT', () => {
    expect(studioSlots('2026-10-22')).toEqual([
      '2026-10-22T09:00:00.000Z',
      '2026-10-22T10:30:00.000Z',
      '2026-10-22T13:00:00.000Z',
      '2026-10-22T15:30:00.000Z',
    ]);
  });
});

describe('Cal.com', () => {
  it('asks for slots over the shown weekdays and keeps them per day', async () => {
    const stub = stubFetch({
      status: 'success',
      data: { '2026-10-22': [{ start: '2026-10-22T10:00:00.000+01:00' }] },
    });
    const days = await calCom('key', 42, stub.fetch).slots(new Date('2026-10-21T09:00:00Z'), 2);
    const url = new URL(stub.calls[0]?.url ?? '');
    expect(url.pathname).toBe('/v2/slots');
    expect(url.searchParams.get('eventTypeId')).toBe('42');
    expect(url.searchParams.get('start')).toBe('2026-10-22');
    expect(url.searchParams.get('end')).toBe('2026-10-23');
    expect(header(stub.calls[0]?.init, 'authorization')).toBe('Bearer key');
    expect(header(stub.calls[0]?.init, 'cal-api-version')).toBe('2024-09-04');
    expect(days).toEqual([
      { date: '2026-10-22', slots: ['2026-10-22T09:00:00.000Z'] },
      { date: '2026-10-23', slots: [] },
    ]);
  });

  it('books with the attendee and the event type', async () => {
    const stub = stubFetch({ status: 'success', data: { start: '2026-10-22T09:00:00.000Z' } });
    await calCom('key', 42, stub.fetch).book({
      start: '2026-10-22T09:00:00.000Z',
      email: 'a@b.co',
      name: 'a@b.co',
      timeZone: 'Europe/Madrid',
    });
    expect(stub.calls[0]?.url).toBe('https://api.cal.com/v2/bookings');
    expect(header(stub.calls[0]?.init, 'cal-api-version')).toBe('2024-08-13');
    expect(JSON.parse(stub.calls[0]?.body ?? '')).toEqual({
      start: '2026-10-22T09:00:00.000Z',
      eventTypeId: 42,
      attendee: { name: 'a@b.co', email: 'a@b.co', timeZone: 'Europe/Madrid', language: 'en' },
    });
  });

  it('fails when Cal.com does', async () => {
    const stub = stubFetch({ status: 'error' }, 400);
    await expect(calCom('key', 1, stub.fetch).slots(new Date(), 2)).rejects.toThrow('400');
  });
});

describe('Resend', () => {
  it('sends a plain-text email with a reply-to', async () => {
    const stub = stubFetch({ id: 'x' });
    await resend('key', 'Briefs <b@anneal.studio>', stub.fetch).send({
      to: 'hello@raum.africa',
      subject: 'Brief',
      text: 'Hi',
      replyTo: 'a@b.co',
    });
    expect(stub.calls[0]?.url).toBe('https://api.resend.com/emails');
    expect(JSON.parse(stub.calls[0]?.body ?? '')).toEqual({
      from: 'Briefs <b@anneal.studio>',
      to: ['hello@raum.africa'],
      subject: 'Brief',
      text: 'Hi',
      reply_to: 'a@b.co',
    });
  });
});

describe('Notion', () => {
  const brief: Brief = {
    name: 'Ada',
    email: 'ada@b.co',
    offer: 'Mobile MVP',
    stage: 'Live product',
    utm_source: 'linkedin',
    utm_campaign: 'launch',
    at: '2026-10-21T10:00:00.000Z',
  };

  it('maps a brief onto the database properties', () => {
    const p = briefProperties(brief);
    expect(p.Name.title[0]?.text.content).toBe('Ada');
    expect(p.Email.email).toBe('ada@b.co');
    expect(p.Offer.select).toEqual({ name: 'Mobile MVP' });
    expect(p.Timing.select).toBeNull();
    expect(p.Campaign.rich_text[0]?.text.content).toBe('linkedin / launch');
  });

  it('creates a page in the briefs database', async () => {
    const stub = stubFetch({ id: 'page' });
    await notion('token', { briefs: 'db-b', waitlist: 'db-w' }, stub.fetch).addBrief(brief);
    const body = JSON.parse(stub.calls[0]?.body ?? '') as { parent: unknown };
    expect(stub.calls[0]?.url).toBe('https://api.notion.com/v1/pages');
    expect(header(stub.calls[0]?.init, 'notion-version')).toBe('2022-06-28');
    expect(body.parent).toEqual({ database_id: 'db-b' });
  });
});
