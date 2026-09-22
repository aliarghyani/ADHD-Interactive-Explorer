import { mkdirSync } from 'node:fs'
import { resolve } from 'node:path'
import { expect, test, type Page } from '@playwright/test'

const reviewDirectory = resolve('artifacts/wp10-presentation-review')
mkdirSync(reviewDirectory, { recursive: true })

function reviewPath(name: string): string {
  return resolve(reviewDirectory, name)
}

function captureBrowserProblems(page: Page): string[] {
  const problems: string[] = []
  page.on('console', (message) => {
    if (message.type() === 'warning' || message.type() === 'error') problems.push(`${message.type()}: ${message.text()}`)
  })
  page.on('pageerror', (error) => problems.push(`pageerror: ${error.message}`))
  return problems
}

async function waitForHydration(page: Page): Promise<void> {
  await expect(page.locator('.app-shell')).toHaveAttribute('data-hydrated', 'true', { timeout: 15_000 })
}

test.describe('WP-10 Presentation desktop review', () => {
  test.use({ viewport: { width: 1440, height: 1000 } })

  test('reviews EN/FA indexes, peer status, historical ADD, and live navigation', async ({ page }) => {
    const problems = captureBrowserProblems(page)
    await page.goto('/en/presentations')
    await waitForHydration(page)
    await expect(page.locator('.presentation-card')).toHaveCount(3)
    await expect(page.locator('.presentation-history')).toContainText('Historical only')
    await expect(page.locator('.app-shell__nav-link--current')).toContainText('Presentations')
    await expect(page.locator('.presentation-card input')).toHaveCount(0)
    await page.screenshot({ path: reviewPath('01-en-index-desktop.png'), fullPage: true })

    await page.goto('/fa/presentations')
    await waitForHydration(page)
    await expect(page.locator('html')).toHaveAttribute('dir', 'rtl')
    await expect(page.locator('.presentation-card')).toHaveCount(3)
    await expect(page.locator('.presentation-history')).toContainText('HISTORICAL_ADD_NOTE')
    await page.screenshot({ path: reviewPath('02-fa-index-desktop.png'), fullPage: true })
    expect(problems).toEqual([])
  })

  test('reviews all three formal routes and bounded source preview', async ({ page }) => {
    const problems = captureBrowserProblems(page)
    const routes = [
      ['PRESENTATION_INATTENTIVE', 1, '03-en-inattentive.png'],
      ['PRESENTATION_HYPERACTIVE_IMPULSIVE', 1, '04-en-hyperactive-impulsive.png'],
      ['PRESENTATION_COMBINED', 2, '05-en-combined.png'],
    ] as const

    for (const [id, anchorCount, screenshot] of routes) {
      await page.goto(`/en/presentations/${id}`)
      await waitForHydration(page)
      await expect(page.locator('.presentation-anchors article')).toHaveCount(anchorCount)
      await expect(page.locator('.presentation-switcher li')).toHaveCount(3)
      await expect(page.locator('.presentation-history')).toContainText('not a fourth current presentation')
      await page.screenshot({ path: reviewPath(screenshot), fullPage: true })
    }

    await page.getByRole('button', { name: 'View source preview' }).click()
    await expect(page.locator('.presentation-source')).toHaveCount(3)
    await expect(page.locator('.presentation-sources')).toContainText('Find evidence records using this source')
    await page.screenshot({ path: reviewPath('06-en-source-preview.png'), fullPage: true })
    expect(problems).toEqual([])
  })

  test('reviews Persian detail and controlled invalid IDs', async ({ page }) => {
    const problems = captureBrowserProblems(page)
    await page.goto('/fa/presentations/PRESENTATION_COMBINED')
    await waitForHydration(page)
    await expect(page.locator('html')).toHaveAttribute('dir', 'rtl')
    await expect(page.locator('.presentation-anchors .app-canonical-id')).toHaveText(['CA1', 'CA2'])
    await page.screenshot({ path: reviewPath('07-fa-combined.png'), fullPage: true })

    await page.goto('/en/presentations/HISTORICAL_ADD_NOTE')
    await waitForHydration(page)
    await expect(page.getByRole('heading', { level: 1, name: 'Presentation not found' })).toBeVisible()
    await page.screenshot({ path: reviewPath('08-invalid-historical-route.png'), fullPage: true })
    expect(problems).toEqual([])
  })
})

test.describe('WP-10 Presentation mobile and keyboard review', () => {
  test.use({ viewport: { width: 390, height: 844 } })

  test('keeps mobile content sequential and free of horizontal overflow', async ({ page }) => {
    const problems = captureBrowserProblems(page)
    await page.goto('/en/presentations/PRESENTATION_INATTENTIVE')
    await waitForHydration(page)
    expect(await page.evaluate(() => document.body.scrollWidth - document.body.clientWidth)).toBeLessThanOrEqual(1)
    await expect(page.locator('.presentation-switcher li')).toHaveCount(3)
    await page.screenshot({ path: reviewPath('09-en-mobile.png'), fullPage: true })
    expect(problems).toEqual([])
  })

  test('supports keyboard source disclosure with visible focus', async ({ page }) => {
    await page.goto('/en/presentations/PRESENTATION_INATTENTIVE')
    await waitForHydration(page)
    const button = page.locator('.presentation-evidence > button')
    await expect(button).toHaveText('View source preview')
    await button.focus()
    await expect(button).toBeFocused()
    await page.keyboard.press('Enter')
    await expect(button).toHaveAttribute('aria-expanded', 'true')
    await expect(page.locator('.presentation-sources')).toBeVisible()
    const outline = await button.evaluate((element) => getComputedStyle(element).outlineStyle)
    expect(outline).not.toBe('none')
    await page.screenshot({ path: reviewPath('10-en-keyboard-source.png'), fullPage: true })
  })
})
