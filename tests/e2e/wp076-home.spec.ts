import { mkdirSync } from 'node:fs'
import { resolve } from 'node:path'
import { expect, test, type Page } from '@playwright/test'

const reviewDirectory = resolve('artifacts/wp07.6-home-review')
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

test.describe('WP-07.6 Home desktop review', () => {
  test.use({ viewport: { width: 1440, height: 1000 } })

  test('reviews English and Persian hierarchy, safety, navigation, and entry states', async ({ page }) => {
    const problems = captureBrowserProblems(page)

    await page.goto('/en')
    await expect(page.getByRole('heading', { level: 1, name: /Understand ADHD/ })).toBeVisible()
    await expect(page.locator('[data-safety-kind="global"]')).toContainText('does not diagnose ADHD')
    await expect(page.locator('.home-safety-boundaries')).toContainText('Not screening')
    await expect(page.getByRole('heading', { level: 2, name: 'Clinical definition is not the explanatory network' })).toBeVisible()
    await expect(page.getByRole('heading', { level: 2, name: 'Relationships are many-to-many' })).toBeVisible()
    await expect(page.locator('.home-entry')).toHaveCount(4)
    await expect(page.locator('.home-entry__unavailable')).toHaveCount(2)
    await expect(page.getByRole('link', { name: /Behaviour Explorer: Start with a behaviour/ })).toHaveAttribute('href', '/en/behaviours')
    await expect(page.getByRole('link', { name: /System Map: See the whole system/ })).toHaveAttribute('href', '/en/map')
    await expect(page.getByText(/Foundation ready|Work package|delivery pipeline/i)).toHaveCount(0)
    await expect(page.locator('[data-testid="system-visual-graph"]')).toHaveCount(0)
    await page.screenshot({ path: reviewPath('01-en-desktop.png'), fullPage: true })

    await page.goto('/fa')
    await expect(page.locator('html')).toHaveAttribute('lang', 'fa')
    await expect(page.locator('html')).toHaveAttribute('dir', 'rtl')
    await expect(page.getByRole('heading', { level: 1 })).toContainText('ADHD')
    await expect(page.getByRole('heading', { level: 2, name: 'تعریف بالینی با شبکهٔ توضیحی یکی نیست' })).toBeVisible()
    await expect(page.getByRole('heading', { level: 2, name: 'ارتباط‌ها چندبه‌چند هستند' })).toBeVisible()
    await expect(page.locator('bdi[dir="ltr"]')).not.toHaveCount(0)
    await page.screenshot({ path: reviewPath('02-fa-desktop.png'), fullPage: true })

    expect(problems).toEqual([])
  })
})

test.describe('WP-07.6 Home mobile and keyboard review', () => {
  test.use({ viewport: { width: 390, height: 844 } })

  test('reviews EN and FA mobile layout without overflow', async ({ page }) => {
    const problems = captureBrowserProblems(page)

    await page.goto('/en')
    expect(await page.evaluate(() => document.body.scrollWidth - document.body.clientWidth)).toBeLessThanOrEqual(1)
    await expect(page.locator('.home-entry')).toHaveCount(4)
    await page.screenshot({ path: reviewPath('03-en-mobile.png'), fullPage: true })

    await page.goto('/fa')
    expect(await page.evaluate(() => document.body.scrollWidth - document.body.clientWidth)).toBeLessThanOrEqual(1)
    await expect(page.locator('html')).toHaveAttribute('dir', 'rtl')
    await page.screenshot({ path: reviewPath('04-fa-mobile.png'), fullPage: true })

    expect(problems).toEqual([])
  })

  test('supports keyboard-only navigation with visible focus', async ({ page }) => {
    await page.goto('/en')
    await page.keyboard.press('Tab')
    await expect(page.getByRole('link', { name: 'Skip to main content' })).toBeFocused()
    await expect(page.getByRole('link', { name: 'Skip to main content' })).toBeVisible()
    await page.keyboard.press('Enter')
    await expect(page.locator('#main-content')).toBeFocused()

    await page.keyboard.press('Tab')
    const focused = page.locator(':focus')
    expect(await focused.evaluate((element) => getComputedStyle(element).outlineStyle)).not.toBe('none')
    await page.screenshot({ path: reviewPath('05-en-keyboard.png'), fullPage: true })
  })
})

test.describe('WP-07.6 Home reduced-motion review', () => {
  test.use({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' })

  test('preserves all meaning with motion disabled', async ({ page }) => {
    await page.goto('/en')
    const durations = await page.locator('.app-shell__skip-link').evaluate((element) => getComputedStyle(element).transitionDuration)
    expect(durations.split(',').every((duration) => Number.parseFloat(duration) <= 0.001)).toBe(true)
    await expect(page.getByRole('heading', { level: 2, name: 'From situation to functioning — with feedback' })).toBeVisible()
    await page.screenshot({ path: reviewPath('06-en-reduced-motion.png'), fullPage: true })
  })
})
