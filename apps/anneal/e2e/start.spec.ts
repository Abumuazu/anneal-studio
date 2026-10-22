import { type Page, expect, test } from '@playwright/test';

import { collectErrors } from './helpers';

interface Outbox {
  bookings: { start: string; email: string; timeZone: string }[];
  briefs: Record<string, string>[];
  mail: { to: string; subject: string; text: string; replyTo?: string }[];
  waitlist: { email: string; source: string }[];
}

/** Records analytics calls the way Plausible's queue would receive them. */
async function captureEvents(page: Page) {
  await page.addInitScript(() => {
    const w = window as Window & { events?: unknown[]; plausible?: unknown };
    w.events = [];
    w.plausible = (name: string, opts?: { props?: unknown }) => w.events?.push([name, opts?.props]);
  });
  return () =>
    page.evaluate(() => (window as Window & { events?: [string, unknown][] }).events ?? []);
}

const outbox = async (page: Page) =>
  (await (await page.request.get('/api/outbox')).json()) as Outbox;

test.describe('start', () => {
  test('books a slot and sends a brief end to end', async ({ page, isMobile }) => {
    const errors = collectErrors(page);
    const events = await captureEvents(page);
    const tag = `e2e-${Date.now().toString(36)}`;
    await page.goto(`/start?utm_source=linkedin&utm_campaign=${tag}`);
    await expect(
      page.getByRole('heading', { level: 1, name: 'Tell us what you are building.' }),
    ).toBeAttached();

    // Booking: a day, a time, an email. Projects run in parallel against one
    // in-memory calendar, so each starts on its own day and takes a free time.
    const booking = page.locator('form', { has: page.getByLabel('3. Your email') });
    const days = page.getByRole('group', { name: '1. Pick a day' }).getByRole('radio');
    // Ten weekdays; a day whose times are all taken drops out.
    await expect(days.first()).toBeVisible();
    const times = page.getByRole('group', { name: '2. Pick a time' }).getByRole('radio');
    const offset = test.info().project.name.length;
    for (let i = 0; i < 10; i++) {
      await days
        .nth((offset + i) % 10)
        .locator('..')
        .click();
      if ((await times.count()) > 0) break;
    }
    await times.last().locator('..').click();
    await booking.getByLabel('3. Your email').fill(`${tag}@example.com`);
    const confirm = booking.getByRole('button', {
      name: /^Confirm \w{3} \d{1,2} \w{3}, \d{2}:\d{2}$/,
    });
    await confirm.click();
    await expect(page.getByText('A calendar invite is on its way.')).toBeVisible();
    await expect(page.locator(':focus')).toContainText('A calendar invite is on its way.');

    // Brief: four steps, keyboard friendly.
    await page
      .getByRole('radio', { name: /Mobile MVP/ })
      .locator('..')
      .click();
    const sketch = page.getByText('Your brief so far').locator('..');
    await expect(sketch).toContainText('Mobile MVP', { useInnerText: true });
    await page.getByRole('button', { name: 'Continue' }).click();
    await expect(page.getByRole('heading', { name: 'Where is it today?' })).toBeFocused();
    await page.getByRole('radio', { name: 'Live product' }).locator('..').click();
    await page.getByRole('button', { name: 'Continue' }).click();
    await page.getByRole('radio', { name: 'As soon as possible' }).locator('..').click();
    await page
      .getByLabel('What budget are you considering? (optional)')
      .fill('₦5,000,000 to ₦7,000,000');
    await page.getByRole('button', { name: 'Continue' }).click();
    await expect(page.getByRole('heading', { name: 'About you' })).toBeFocused();
    await page.getByLabel('Name', { exact: true }).fill('Ada Obi');
    await page.getByLabel('Email', { exact: true }).fill(`${tag}@example.com`);
    await page.getByLabel('Company or project (optional)').fill('Obi Labs');
    await page.getByRole('radio', { name: 'A referral' }).locator('..').click();
    await expect(sketch).toContainText('Mobile MVP · live product · as soon as possible', {
      useInnerText: true,
    });
    await page.getByRole('button', { name: 'Send brief' }).click();
    await expect(page.getByText('Thanks. It is with us.')).toBeVisible();
    await expect(page.getByText('Done', { exact: true })).toBeVisible();

    const sent = await outbox(page);
    const booked = sent.bookings.find((b) => b.email === `${tag}@example.com`);
    expect(booked?.start).toMatch(/T\d{2}:\d{2}:00\.000Z$/);
    const brief = sent.briefs.find((b) => b.utm_campaign === tag);
    expect(brief).toMatchObject({
      offer: 'Mobile MVP',
      stage: 'Live product',
      timing: 'As soon as possible',
      name: 'Ada Obi',
      company: 'Obi Labs',
      budget: '₦5,000,000 to ₦7,000,000',
      heard: 'A referral',
      utm_source: 'linkedin',
      landing: '/start',
    });
    const mail = sent.mail.find((m) => m.replyTo === `${tag}@example.com`);
    expect(mail?.subject).toBe('Brief: Mobile MVP · Ada Obi');

    const names = (await events()).map(([n]) => n);
    expect(names).toEqual(
      expect.arrayContaining(['call_booked', 'brief_started', 'offer_chosen', 'brief_sent']),
    );
    if (!isMobile) expect(errors).toEqual([]);
  });

  test('the brief needs a name and an email before it sends', async ({ page }) => {
    await page.goto('/start');
    for (let i = 0; i < 3; i++) await page.getByRole('button', { name: 'Continue' }).click();
    await page.getByRole('button', { name: 'Send brief' }).click();
    await expect(page.getByLabel('Name', { exact: true })).toBeFocused();
    await expect(page.getByText('Thanks. It is with us.')).toHaveCount(0);
  });

  test('the brief asks for a client budget without showing starting prices', async ({ page }) => {
    await page.goto('/start');
    const brief = page.locator('form', { has: page.locator('input[name="offer"]') });
    await expect(brief.getByRole('radio', { name: 'Web MVP' })).toBeVisible();
    await expect(brief.getByText(/from [₦$€]/i)).toHaveCount(0);
    await expect(brief.getByText('Prices in')).toHaveCount(0);
    await brief.getByRole('button', { name: 'Continue' }).click();
    await brief.getByRole('button', { name: 'Continue' }).click();
    await expect(brief.getByLabel('What budget are you considering? (optional)')).toBeVisible();
  });
});

test.describe('analytics', () => {
  // Still pages: nothing moves under the clicks, and links navigate plainly.
  test.use({ reducedMotion: 'reduce' });

  test('price cards, currency, waitlist and case views send their events', async ({ page }) => {
    const events = await captureEvents(page);
    await page.goto('/');
    await page
      .getByRole('group', { name: 'Currency' })
      .first()
      .getByRole('button', { name: 'EUR €' })
      .click();
    const card = page.locator('[data-event="price_card_click"]').first();
    await card.getByRole('link').click();
    await page.waitForURL('**/start');
    expect(await events()).toEqual(
      expect.arrayContaining([
        ['currency_changed', { currency: 'EUR' }],
        ['price_card_click', { offer: 'website' }],
      ]),
    );

    await page.goto('/products');
    await page.getByRole('textbox', { name: 'Email address' }).fill('wait@example.com');
    await page.getByRole('button', { name: 'Join the waitlist' }).click();
    await expect.poll(async () => (await events()).map(([n]) => n)).toContain('waitlist_joined');

    await page.goto('/work/wisp');
    await expect.poll(async () => await events()).toContainEqual(['case_opened', { case: 'wisp' }]);
  });
});
