import { mkdirSync } from 'node:fs'
import { resolve } from 'node:path'
import { expect, test, type Page } from '@playwright/test'

const reviewDirectory = resolve('artifacts/wp11.5-methodology-about-review')
mkdirSync(reviewDirectory, { recursive: true })
const reviewPath = (name: string) => resolve(reviewDirectory, name)
const problems = (page: Page) => { const items: string[] = []; page.on('console', (message) => { if (['warning', 'error'].includes(message.type())) items.push(`${message.type()}: ${message.text()}`) }); page.on('pageerror', (error) => items.push(`pageerror: ${error.message}`)); return items }
const hydrated = (page: Page) => expect(page.locator('.app-shell')).toHaveAttribute('data-hydrated', 'true', { timeout: 15_000 })

test.describe('WP-11.5 desktop review', () => {
  test.use({ viewport: { width: 1440, height: 1000 } })
  for (const locale of ['en', 'fa'] as const) {
    test(`reviews ${locale.toUpperCase()} Methodology`, async ({ page }) => {
      const browserProblems = problems(page)
      await page.goto(`/${locale}/methodology`); await hydrated(page)
      await expect(page.locator('html')).toHaveAttribute('dir', locale === 'fa' ? 'rtl' : 'ltr')
      await expect(page.locator('.methodology__cards article')).toHaveCount(3)
      await expect(page.locator('.methodology__evidence-levels article')).toHaveCount(4)
      await expect(page.locator(`a[href="/${locale}/evidence"]`).first()).toBeVisible()
      await expect(page.locator('[data-safety-kind="global"]')).toBeVisible()
      expect(await page.evaluate(() => document.body.scrollWidth - document.body.clientWidth)).toBeLessThanOrEqual(1)
      await page.screenshot({ path: reviewPath(`${locale === 'en' ? '01' : '02'}-${locale}-methodology-desktop.png`), fullPage: true })
      expect(browserProblems).toEqual([])
    })
    test(`reviews ${locale.toUpperCase()} About`, async ({ page }) => {
      const browserProblems = problems(page)
      await page.goto(`/${locale}/about`); await hydrated(page)
      await expect(page.locator('.about__experiences article')).toHaveCount(4)
      await expect(page.locator('[data-safety-kind="global"]')).toBeVisible()
      await expect(page.locator(`footer a[href="/${locale}/methodology"]`)).toBeVisible()
      await page.screenshot({ path: reviewPath(`${locale === 'en' ? '03' : '04'}-${locale}-about-desktop.png`), fullPage: true })
      expect(browserProblems).toEqual([])
    })
  }
})

test.describe('WP-11.5 mobile and keyboard review', () => {
  test.use({ viewport: { width: 390, height: 844 } })
  test('keeps Methodology and About sequential without horizontal overflow', async ({ page }) => {
    const browserProblems = problems(page)
    await page.goto('/fa/methodology'); await hydrated(page)
    expect(await page.evaluate(() => document.body.scrollWidth - document.body.clientWidth)).toBeLessThanOrEqual(1)
    await page.screenshot({ path: reviewPath('05-fa-methodology-mobile.png'), fullPage: true })
    await page.goto('/en/about'); await hydrated(page)
    expect(await page.evaluate(() => document.body.scrollWidth - document.body.clientWidth)).toBeLessThanOrEqual(1)
    await page.screenshot({ path: reviewPath('06-en-about-mobile.png'), fullPage: true })
    expect(browserProblems).toEqual([])
  })

  test('supports keyboard navigation to Evidence and keeps the disclaimer globally discoverable', async ({ page }) => {
    await page.goto('/en/methodology'); await hydrated(page)
    const evidenceLink = page.getByRole('link', { name: /Inspect Evidence records and sources/ })
    await evidenceLink.focus(); await expect(evidenceLink).toBeFocused(); await page.keyboard.press('Enter')
    await expect(page).toHaveURL('/en/evidence')
    await expect(page.locator('footer')).toContainText('This is an educational model')
    await page.screenshot({ path: reviewPath('07-en-keyboard-evidence.png'), fullPage: true })
  })
})
