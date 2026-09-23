import { expect, test } from '@playwright/test'

const cases = [
  ['/en', 'en', null, null],
  ['/fa', 'fa', null, null],
  ['/en/map/BEH1', 'en', '[data-testid="semantic-selected-summary"] .app-canonical-id', 'BEH1'],
  ['/fa/map/BEH1', 'fa', '[data-testid="semantic-selected-summary"] .app-canonical-id', 'BEH1'],
  ['/en/behaviours/BEH1', 'en', '.behaviour-detail__identity .app-canonical-id', 'BEH1'],
  ['/fa/context/CTX2', 'fa', '.context-detail__identity .app-canonical-id', 'CTX2'],
  ['/en/presentations/PRESENTATION_COMBINED', 'en', '.presentation-detail__identity .app-canonical-id', 'PRESENTATION_COMBINED'],
  ['/fa/evidence/EVID_GOAL_MANAGEMENT', 'fa', '.evidence-detail__identity .app-canonical-id', 'EVID_GOAL_MANAGEMENT'],
  ['/en/methodology', 'en', null, null],
  ['/fa/about', 'fa', null, null],
] as const

for (const [route, locale, selector, id] of cases) {
  test(`fresh static navigation ${route}`, async ({ page }) => {
    const errors: string[] = []
    const failedAssets: string[] = []
    page.on('pageerror', error => errors.push(error.message))
    page.on('response', response => {
      if (response.url().includes('/_nuxt/') && !response.ok()) failedAssets.push(`${response.status()} ${response.url()}`)
    })
    const response = await page.goto(route)
    expect(response?.status()).toBe(200)
    await expect(page.locator('.app-shell')).toHaveAttribute('data-hydrated', 'true')
    await expect(page.locator('.app-shell')).toHaveAttribute('data-locale', locale)
    if (selector && id) await expect(page.locator(selector)).toHaveText(id)
    expect(errors).toEqual([])
    expect(failedAssets).toEqual([])
  })
}

test('invalid route has static fallback and functional recovery', async ({ page }) => {
  const response = await page.goto('/en/map/beh1')
  expect(response?.status()).toBe(404)
  await expect(page.locator('.app-shell')).toHaveAttribute('data-hydrated', 'true')
  await expect(page.locator('.app-shell__nav a[href="/en/map"]')).toBeVisible()
})

test('static cache policy applies to documents and asset classes', async ({ request }) => {
  const html = await request.get('/en/map/BEH1')
  expect(html.headers()['cache-control']).toBe('public, max-age=0, must-revalidate')
  const body = await html.text()
  const js = body.match(/\/_nuxt\/(?:[A-Za-z0-9_-]{8}|[^"' /]+\.[A-Za-z0-9_-]{8})\.js/)?.[0]
  const css = body.match(/\/_nuxt\/[^"' ]+\.[A-Za-z0-9_-]{8}\.css/)?.[0]
  expect(js).toBeTruthy()
  expect(css).toBeTruthy()
  expect((await request.get(js!)).headers()['cache-control']).toBe('public, max-age=31536000, immutable')
  expect((await request.get(css!)).headers()['cache-control']).toBe('public, max-age=31536000, immutable')
  expect((await request.get('/favicon.svg')).headers()['cache-control']).toBe('public, max-age=0, must-revalidate')
})
