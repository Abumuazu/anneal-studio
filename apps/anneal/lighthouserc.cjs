/**
 * Lighthouse budget (CLAUDE.md): LCP under 2.5s, CLS under 0.05, TBT under
 * 200ms. Mobile emulation (Moto G Power, slow 4G, 4x CPU), median of 3 runs.
 *
 * Throttling is applied in the browser ("devtools"), not simulated. Lantern's
 * simulation builds its model from an unthrottled trace, and against a
 * localhost server that trace runs every script before first paint, so it
 * charges all page JS to LCP: about 2.8s simulated against about 1.4s measured
 * under real throttling for the same build. Spec question in the M1 PR.
 *
 * Reports are written to disk (and uploaded as a CI artifact), never to public
 * storage.
 */
const PORT = 3200;
const base = `http://localhost:${PORT}`;

module.exports = {
  ci: {
    collect: {
      startServerCommand: `pnpm next start -p ${PORT}`,
      startServerReadyPattern: 'Ready',
      // A manual diagnostic can measure only the affected routes. Default CI
      // still measures every route with the same three runs and budgets.
      url:
        process.env.LHCI_FOCUS === 'launch'
          ? [base + '/', base + '/work', base + '/work/wisp']
          : [
              `${base}/`,
              `${base}/work`,
              `${base}/work/wisp`,
              `${base}/work/naira-crypto-exchange`,
              `${base}/work/jewellery-marketplace`,
              `${base}/services`,
              `${base}/products`,
              `${base}/studio`,
              `${base}/privacy`,
              `${base}/start`,
              `${base}/kitchen-sink`,
            ],
      numberOfRuns: 3,
      settings: {
        throttlingMethod: 'devtools',
      },
    },
    assert: {
      assertions: {
        'largest-contentful-paint': [
          'error',
          { maxNumericValue: 2500, aggregationMethod: 'median-run' },
        ],
        'cumulative-layout-shift': [
          'error',
          { maxNumericValue: 0.05, aggregationMethod: 'median-run' },
        ],
        'total-blocking-time': ['error', { maxNumericValue: 200, aggregationMethod: 'median-run' }],
      },
    },
    upload: {
      target: 'filesystem',
      outputDir: '.lighthouseci/reports',
    },
  },
};
