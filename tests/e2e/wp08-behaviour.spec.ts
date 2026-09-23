import { mkdirSync } from 'node:fs'
import { resolve } from 'node:path'
import { expect, test, type Page } from '@playwright/test'

const reviewDirectory = resolve('artifacts/wp08-behaviour-review')
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

test.describe('WP-08 Behaviour desktop review', () => {
  test.use({ viewport: { width: 1440, height: 1000 } })

  test('reviews English and Persian libraries with search and live navigation', async ({ page }) => {
    const problems = captureBrowserProblems(page)
    await page.goto('/en/behaviours')
    await waitForHydration(page)
    await expect(page.getByRole('heading', { level: 1, name: 'Start with an everyday behaviour' })).toBeVisible()
    await expect(page.locator('.behaviour-card')).toHaveCount(7)
    await expect(page.locator('input[type="checkbox"]')).toHaveCount(0)
    await page.getByRole('searchbox').fill('Switching Tasks')
    await expect(page.locator('.behaviour-card')).toHaveCount(1)
    await page.getByRole('searchbox').fill('')
    await page.screenshot({ path: reviewPath('01-en-library-desktop.png'), fullPage: true })

    await page.goto('/fa/behaviours')
    await waitForHydration(page)
    await expect(page.locator('html')).toHaveAttribute('dir', 'rtl')
    await expect(page.locator('.behaviour-card')).toHaveCount(7)
    await expect(page.locator('.behaviour-card bdi[dir="ltr"]')).toHaveCount(7)
    await page.screenshot({ path: reviewPath('02-fa-library-desktop.png'), fullPage: true })
    expect(problems).toEqual([])
  })

  test('reviews BEH1, exact deep linking, switching, alternatives, and evidence', async ({ page }) => {
    const problems = captureBrowserProblems(page)
    await page.goto('/en/behaviours/BEH1?pathway=PATH_BEH1_STRESS')
    await waitForHydration(page)
    await expect(page.getByRole('heading', { level: 1 })).toContainText('first step')
    await expect(page.getByRole('radio')).toHaveCount(4)
    await expect(page.getByRole('radio', { name: /Possible pathway 4/ })).toHaveAttribute('aria-checked', 'true')
    await expect(page.locator('.behaviour-pathway__steps article .app-canonical-id')).toHaveText(['CTX2', 'REG6', 'BEH1'])
    await expect(page.locator('.behaviour-alternatives article')).not.toHaveCount(0)
    await page.screenshot({ path: reviewPath('03-en-beh1-desktop.png'), fullPage: true })

    await page.getByRole('radio', { name: /Possible pathway 2/ }).click()
    await expect(page).toHaveURL(/pathway=PATH_BEH1_DELAYED_REWARD/)
    await page.locator('.behaviour-pathway__relationship button').first().click()
    await expect(page.locator('.behaviour-evidence')).toContainText('Limitations')
    await expect(page.locator('[data-safety-kind="evidence"]')).toContainText('group-level tendencies')
    await page.screenshot({ path: reviewPath('04-en-evidence-preview.png'), fullPage: true })

    await page.getByRole('button', { name: 'Reset this exploration' }).click()
    await expect(page).toHaveURL('/en/behaviours/BEH1')
    await expect(page.getByRole('radio').first()).toHaveAttribute('aria-checked', 'true')
    await expect(page.locator('.behaviour-evidence')).toHaveCount(0)
    expect(problems).toEqual([])
  })

  test('reviews Persian BEH1, the largest pathway set, and invalid states', async ({ page }) => {
    const problems = captureBrowserProblems(page)
    await page.goto('/fa/behaviours/BEH1')
    await waitForHydration(page)
    await expect(page.locator('html')).toHaveAttribute('dir', 'rtl')
    await expect(page.locator('.behaviour-alternatives')).toContainText('عوامل احتمالی دیگر')
    await page.screenshot({ path: reviewPath('05-fa-beh1-desktop.png'), fullPage: true })

    await page.goto('/en/behaviours/BEH5')
    await waitForHydration(page)
    await expect(page.getByRole('radio')).toHaveCount(5)
    await page.screenshot({ path: reviewPath('06-en-largest-pathway-set.png'), fullPage: true })

    await page.goto('/en/behaviours/beh1')
    await waitForHydration(page)
    await expect(page.getByRole('heading', { level: 1, name: 'Behaviour not found' })).toBeVisible()
    await expect(page.getByRole('navigation', { name: 'Primary navigation' })).toBeVisible()
    await expect(page.locator('[data-safety-kind="global"]')).toBeVisible()
    await page.screenshot({ path: reviewPath('07-invalid-behaviour.png'), fullPage: true })

    await page.goto('/en/behaviours/BEH1?pathway=PATH_BEH2_SLEEP')
    await waitForHydration(page)
    await expect(page.getByRole('status')).toContainText('does not belong to this Behaviour')
    await expect(page.getByRole('radio').first()).toHaveAttribute('aria-checked', 'true')
    expect(problems).toEqual([])
  })
})

test.describe('WP-08 Behaviour mobile and keyboard review', () => {
  test.use({ viewport: { width: 390, height: 844 } })

  test('preserves sequential mobile reading order without overflow', async ({ page }) => {
    const problems = captureBrowserProblems(page)
    await page.goto('/en/behaviours/BEH1')
    await waitForHydration(page)
    expect(await page.evaluate(() => document.body.scrollWidth - document.body.clientWidth)).toBeLessThanOrEqual(1)
    const sectionOrder = await page.locator('main.behaviour-detail > *').evaluateAll((elements) =>
      elements.map((element) => element.className),
    )
    expect(sectionOrder.join(' ')).toContain('behaviour-detail__hero')
    await expect(page.locator('summary').filter({ hasText: 'Other possible contributors' })).toBeVisible()
    await page.screenshot({ path: reviewPath('08-en-beh1-mobile.png'), fullPage: true })
    expect(problems).toEqual([])
  })

  test('supports keyboard pathway switching and evidence entry', async ({ page }) => {
    await page.goto('/en/behaviours/BEH1')
    await waitForHydration(page)
    await page.getByRole('radio').first().focus()
    await expect(page.getByRole('radio').first()).toBeFocused()
    await page.keyboard.press('ArrowRight')
    await expect(page.getByRole('radio').nth(1)).toBeFocused()
    await page.keyboard.press('Enter')
    await expect(page.getByRole('radio').nth(1)).toHaveAttribute('aria-checked', 'true')
    const outline = await page.getByRole('radio').nth(1).evaluate((element) => getComputedStyle(element).outlineStyle)
    expect(outline).not.toBe('none')
    await page.screenshot({ path: reviewPath('09-en-keyboard.png'), fullPage: true })
  })
})
