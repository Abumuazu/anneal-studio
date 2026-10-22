import { expect, test } from '@playwright/test';

import { collectErrors } from './helpers';

const PAGES = [
  { path: '/services', h1: 'Four things we build, start with one.' },
  { path: '/products', h1: 'Products we build for ourselves.' },
  { path: '/studio', h1: 'A product studio that builds its own, too.' },
  { path: '/privacy', h1: 'Privacy' },
];

for (const p of PAGES) {
  test(`${p.path} renders without errors`, async ({ page }) => {
    const errors = collectErrors(page);
    await page.goto(p.path);
    await expect(page.getByRole('heading', { level: 1, name: p.h1 })).toBeAttached();
    await expect(
      page.getByRole('banner').getByRole('link', { name: 'Anneal', exact: true }),
    ).toBeVisible();
    expect(errors).toEqual([]);
  });
}

test.describe('services', () => {
  test('the FAQ opens one answer at a time', async ({ page, isMobile }) => {
    test.skip(isMobile, 'keyboard flow');
    await page.goto('/services');
    const first = page.getByRole('button', { name: 'Which one should I pick?' });
    const second = page.getByRole('button', { name: 'How do I pay?' });
    await expect(first).toHaveAttribute('aria-expanded', 'true');
    await second.focus();
    await page.keyboard.press('Enter');
    await expect(second).toHaveAttribute('aria-expanded', 'true');
    await expect(first).toHaveAttribute('aria-expanded', 'false');
  });

  test('prices inside sentences follow the currency switch', async ({ page }) => {
    await page.goto('/services');
    const faq = page.locator('#faq');
    await faq.getByRole('button', { name: 'What if I do not know exactly what I need?' }).click();
    const answer = faq.locator('p', { hasText: 'Book a Discovery week for' });
    await expect(answer.locator('[data-price="USD"]')).toHaveText('$900');
    await expect(answer.locator('[data-price="USD"]')).toBeVisible();
    await page.locator('main').getByRole('button', { name: 'NGN ₦' }).first().click();
    await expect(answer.locator('[data-price="NGN"]')).toBeVisible();
    await expect(answer.locator('[data-price="NGN"]')).toHaveText('₦1,260,000');
    await expect(answer.locator('[data-price="USD"]')).toBeHidden();
  });

  test('jump links reach each service', async ({ page }) => {
    await page.goto('/services');
    await page.getByRole('link', { name: 'Growth', exact: true }).click();
    await expect(page.locator('#s5')).toBeInViewport();
  });
});

test.describe('waitlist', () => {
  test('confirms only once the address is stored', async ({ page }) => {
    await page.goto('/products');
    const field = page.getByRole('textbox', { name: 'Email address' });
    await field.fill('not-an-email');
    await page.getByRole('button', { name: 'Join the waitlist' }).click();
    await expect(
      page.getByText('You are on the list. We will write when something opens.'),
    ).toHaveCount(0);
    await field.fill('hello@example.com');
    await page.getByRole('button', { name: 'Join the waitlist' }).click();
    await expect(
      page.getByText('You are on the list. We will write when something opens.'),
    ).toBeVisible();
  });
});

test.describe('privacy', () => {
  test('the contents follow the section in view', async ({ page, isMobile }) => {
    test.skip(isMobile, 'the contents are hidden on small screens');
    await page.goto('/privacy');
    const nav = page.getByRole('navigation', { name: 'On this page' });
    await page.evaluate(() => document.getElementById('p5')?.scrollIntoView({ block: 'start' }));
    await expect(nav.locator('[aria-current="location"]')).toContainText('How long we keep it');
  });

  test('identifies the studio without a registered-address placeholder', async ({ page }) => {
    await page.goto('/privacy');
    await expect(page.getByText('Anneal Studio, led by Muazu Abu', { exact: false })).toBeVisible();
    await expect(page.getByText('[registered address]')).toHaveCount(0);
  });
});

test.describe('studio', () => {
  test('shows the confirmed founder without placeholder profiles', async ({ page }) => {
    await page.goto('/studio');
    await expect(page.getByRole('heading', { level: 3, name: 'Muazu Abu' })).toBeAttached();
    for (const name of ['Camila Reyes', 'Mateus Oliveira', 'Jonas Weber']) {
      await expect(page.getByRole('heading', { level: 3, name })).toHaveCount(0);
    }
    await expect(page.getByRole('img', { name: 'Muazu Abu' })).toBeVisible();
  });
});
