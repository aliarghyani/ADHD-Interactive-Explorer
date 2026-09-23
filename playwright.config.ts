import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  // Nuxt's development server becomes nondeterministic under this suite's
  // concurrent hydration load; keep the acceptance run serialized.
  workers: 1,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? 'github' : 'list',
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL ?? 'http://127.0.0.1:3000',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        channel: process.env.CI ? undefined : 'chrome',
      },
    },
  ],
  webServer: {
    command: process.env.PLAYWRIGHT_STATIC_ARTIFACT ? `"${process.execPath}" scripts/release/serve.mjs` : 'pnpm dev --host 127.0.0.1 --port 3000',
    url: 'http://127.0.0.1:3000/en',
    reuseExistingServer: !process.env.CI && !process.env.PLAYWRIGHT_STATIC_ARTIFACT,
    timeout: 120_000,
  },
})
