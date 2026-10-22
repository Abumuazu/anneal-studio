import { defineConfig, devices } from '@playwright/test';

const PORT = Number(process.env.PORT ?? 3100);
const baseURL = `http://localhost:${PORT}`;

/**
 * Smoke and accessibility run in Chromium and WebKit (iOS Safari is a known
 * risk for pinned sections). Visual snapshots run in Chromium only, at the
 * four widths the spec names. Baselines are per platform: CI compares against
 * the linux set, which the "Update visual baselines" workflow generates.
 */
export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [['github'], ['html', { open: 'never' }]] : [['list']],
  snapshotPathTemplate: '{testDir}/__snapshots__/{platform}/{testFilePath}/{arg}{ext}',
  expect: {
    toHaveScreenshot: { maxDiffPixelRatio: 0.002, animations: 'disabled', caret: 'hide' },
  },
  use: {
    baseURL,
    trace: 'retain-on-failure',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] }, testIgnore: /visual\.spec/ },
    { name: 'webkit', use: { ...devices['Desktop Safari'] }, testIgnore: /visual\.spec/ },
    { name: 'mobile-webkit', use: { ...devices['iPhone 15'] }, testMatch: /smoke\.spec/ },
    { name: 'visual', use: { ...devices['Desktop Chrome'] }, testMatch: /visual\.spec/ },
  ],
  webServer: {
    command: `pnpm next start -p ${PORT}`,
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    // In-memory booking, records and mail so the forms can be tested end to end; nothing persists.
    env: { INTEGRATIONS: 'memory' },
    timeout: 60_000,
  },
});
