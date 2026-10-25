import { expect, test } from '@playwright/test';

import { collectErrors } from './helpers';

const PAGES = [
  { path: '/services', h1: 'Four things we build, start with one.' },
  { path: '/products', h1: 'Building products of our own.' },
  { path: '/studio', h1: 'Close to the product. Committed to its progress.' },
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

test('the footer links to the active social profiles', async ({ page }) => {
  await page.goto('/');
  const socials = page.getByRole('navigation', { name: 'Social profiles' });
  await expect(socials.getByRole('link', { name: 'LinkedIn' })).toHaveAttribute(
    'href',
    'https://linkedin.com/in/muazu',
  );
  await expect(socials.getByRole('link', { name: 'X' })).toHaveAttribute(
    'href',
    'https://x.com/muazudev',
  );
  await expect(socials.getByRole('link', { name: 'Instagram' })).toHaveCount(0);
});

test.describe('services', () => {
  test('the FAQ opens one answer at a time', async ({ page, isMobile }) => {
    test.skip(isMobile, 'keyboard flow');
    await page.goto('/services');
    const first = page.getByRole('button', { name: 'What does a technical partner actually do?' });
    const second = page.getByRole('button', {
      name: 'Do we have to commit to a monthly partnership?',
    });
    await expect(first).toHaveAttribute('aria-expanded', 'true');
    await second.focus();
    await page.keyboard.press('Enter');
    await expect(second).toHaveAttribute('aria-expanded', 'true');
    await expect(first).toHaveAttribute('aria-expanded', 'false');
  });

  test('commercial terms are scoped in the proposal without public fees', async ({ page }) => {
    await page.goto('/services');
    await expect(page.locator('[data-price]')).toHaveCount(0);
    await expect(page.getByRole('group', { name: 'Currency' })).toHaveCount(0);
    await expect(page.getByText('Half to start', { exact: false })).toHaveCount(0);
    await expect(page.getByText('Mobile MVP is paid in three parts.')).toHaveCount(0);
    for (const name of [
      'How a quote works',
      'What we agree before we start',
      'From first conversation to working product',
    ]) {
      await expect(page.getByRole('heading', { name })).toHaveCount(0);
    }
  });

  test('jump links reach each service', async ({ page }) => {
    await page.goto('/services');
    await page.getByRole('link', { name: 'Product improvement', exact: true }).click();
    await expect(page.locator('#improvement')).toBeInViewport();
  });
});

test.describe('waitlist', () => {
  test('confirms only once the address is stored', async ({ page }) => {
    await page.goto('/products');
    const field = page.getByRole('textbox', { name: 'Email address' });
    await field.fill('not-an-email');
    await page.getByRole('button', { name: 'Keep me updated' }).click();
    await expect(
      page.getByText(
        'We will write when there is an update on Anneal tools or future venture opportunities.',
      ),
    ).toHaveCount(0);
    await field.fill('hello@example.com');
    await page.getByRole('button', { name: 'Keep me updated' }).click();
    await expect(
      page.getByText(
        'We will write when there is an update on Anneal tools or future venture opportunities.',
      ),
    ).toBeVisible();
  });
});

test.describe('privacy', () => {
  test('the contents follow the section in view', async ({ page, isMobile }) => {
    test.skip(isMobile, 'the contents are hidden on small screens');
    await page.goto('/privacy');
    const nav = page.locator('main').getByRole('navigation', { name: 'On this page' });
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
  test('keeps the founder and team profiles unpublished', async ({ page }) => {
    await page.goto('/studio');
    await expect(page.getByRole('heading', { name: 'Muazu Abu' })).toHaveCount(0);
    await expect(page.getByRole('img', { name: 'Muazu Abu' })).toHaveCount(0);
    for (const name of ['Camila Reyes', 'Mateus Oliveira', 'Jonas Weber']) {
      await expect(page.getByRole('heading', { name })).toHaveCount(0);
    }
  });
});
