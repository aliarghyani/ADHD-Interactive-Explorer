import { mkdirSync } from 'node:fs'
import { resolve } from 'node:path'
import { expect, test, type Page } from '@playwright/test'

const reviewDirectory = resolve('artifacts/wp09-context-review')
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

test.describe('WP-09 Context desktop review', () => {
  test.use({ viewport: { width: 1440, height: 1000 } })

  test('reviews English and Persian Context libraries and live navigation', async ({ page }) => {
    const problems = captureBrowserProblems(page)
    await page.goto('/en/context')
    await waitForHydration(page)
    await expect(page.getByRole('heading', { level: 1, name: 'Why can functioning change across situations?' })).toBeVisible()
    await expect(page.locator('.context-library-card')).toHaveCount(8)
    await expect(page.locator('input[type="checkbox"]')).toHaveCount(0)
    await expect(page.locator('.app-shell__nav-link--current')).toContainText('Context')
    await page.screenshot({ path: reviewPath('01-en-library-desktop.png'), fullPage: true })

    await page.goto('/fa/context')
    await waitForHydration(page)
    await expect(page.locator('html')).toHaveAttribute('dir', 'rtl')
    await expect(page.locator('.context-library-card')).toHaveCount(8)
    await expect(page.locator('.context-library-card bdi[dir="ltr"]')).toHaveCount(8)
    await page.screenshot({ path: reviewPath('02-fa-library-desktop.png'), fullPage: true })
    expect(problems).toEqual([])
  })

  test('reviews CTX1 qualitative states, evidence, reset, and exact deep linking', async ({ page }) => {
    const problems = captureBrowserProblems(page)
    await page.goto('/en/context/CTX1?state=supportive')
    await waitForHydration(page)
    await expect(page.getByRole('heading', { level: 1, name: 'Sleep / Energy' })).toBeVisible()
    await expect(page.getByRole('radio', { name: 'More supportive' })).toHaveAttribute('aria-checked', 'true')
    await expect(page.locator('.context-mapping')).toHaveCount(2)
    await expect(page.locator('.context-feedback')).toContainText('No canonical Feedback loop')
    await page.screenshot({ path: reviewPath('03-en-ctx1-supportive.png'), fullPage: true })

    await page.getByRole('radio', { name: 'More demanding' }).click()
    await expect(page).toHaveURL(/state=demanding/)
    await page.locator('.context-mapping__relationship button').first().click()
    await expect(page.locator('.context-evidence')).toContainText('Limitations')
    await expect(page.locator('[data-safety-kind="evidence"]')).toContainText('group-level tendencies')
    await page.screenshot({ path: reviewPath('04-en-context-evidence.png'), fullPage: true })

    await page.getByRole('button', { name: 'Reset this exploration' }).click()
    await expect(page).toHaveURL('/en/context/CTX1')
    await expect(page.getByRole('radio', { name: 'Neutral reference' })).toHaveAttribute('aria-checked', 'true')
    await expect(page.locator('.context-evidence')).toHaveCount(0)
    expect(problems).toEqual([])
  })

  test('reviews feedback-capable CTX2 and a Context with multiple mappings', async ({ page }) => {
    const problems = captureBrowserProblems(page)
    await page.goto('/en/context/CTX2?state=demanding')
    await waitForHydration(page)
    await expect(page.locator('.context-mapping')).toHaveCount(5)
    await expect(page.locator('.context-feedback__loop')).toHaveCount(1)
    await page.locator('.context-feedback__loop > button').click()
    await expect(page.locator('.context-feedback__details')).toContainText('EDGE_FUN1_CTX2_FEEDBACK_WITH')
    await expect(page.locator('.context-feedback__details')).toContainText(/functional difficulty may increase stress/i)
    await page.screenshot({ path: reviewPath('05-en-ctx2-feedback.png'), fullPage: true })
    await page.locator('.context-feedback__evidence').click()
    await expect(page.locator('.context-evidence')).toContainText('EVID_FUNCTION_STRESS_FEEDBACK_LOOP')

    await page.goto('/en/context/CTX6')
    await waitForHydration(page)
    await expect(page.locator('.context-mapping')).toHaveCount(5)
    await expect(page.locator('.context-mapping a[href^="/en/behaviours/"]')).not.toHaveCount(0)
    await page.screenshot({ path: reviewPath('06-en-ctx6-multiple-mappings.png'), fullPage: true })
    expect(problems).toEqual([])
  })

  test('reviews Persian direction and controlled invalid Context/state handling', async ({ page }) => {
    const problems = captureBrowserProblems(page)
    await page.goto('/fa/context/CTX2')
    await waitForHydration(page)
    await expect(page.locator('html')).toHaveAttribute('dir', 'rtl')
    await expect(page.locator('.context-mapping').first().locator('.context-mapping__steps > li:not(.context-mapping__relationship) bdi')).toHaveText(['CTX2', 'REG6', 'BEH1'])
    await page.screenshot({ path: reviewPath('07-fa-ctx2-desktop.png'), fullPage: true })

    await page.goto('/en/context/ctx2')
    await waitForHydration(page)
    await expect(page.getByRole('heading', { level: 1, name: 'Context not found' })).toBeVisible()
    await expect(page.getByRole('navigation', { name: 'Primary navigation' })).toBeVisible()
    await page.screenshot({ path: reviewPath('08-invalid-context.png'), fullPage: true })

    await page.goto('/en/context/CTX2?state=high')
    await waitForHydration(page)
    await expect(page.getByRole('status').first()).toContainText('not an approved qualitative identifier')
    await expect(page.getByRole('radio', { name: 'Neutral reference' })).toHaveAttribute('aria-checked', 'true')
    expect(problems).toEqual([])
  })
})

test.describe('WP-09 Context mobile and keyboard review', () => {
  test.use({ viewport: { width: 390, height: 844 } })

  test('preserves sequential mobile disclosure without overflow', async ({ page }) => {
    const problems = captureBrowserProblems(page)
    await page.goto('/en/context/CTX2')
    await waitForHydration(page)
    expect(await page.evaluate(() => document.body.scrollWidth - document.body.clientWidth)).toBeLessThanOrEqual(1)
    await expect(page.locator('.context-disclosure > summary')).toBeVisible()
    await expect(page.locator('.context-mapping').first()).toBeVisible()
    await page.screenshot({ path: reviewPath('09-en-ctx2-mobile.png'), fullPage: true })
    expect(problems).toEqual([])
  })

  test('supports keyboard state selection and accessible Feedback disclosure', async ({ page }) => {
    await page.goto('/en/context/CTX4')
    await waitForHydration(page)
    await page.getByRole('radio', { name: 'More supportive' }).focus()
    await expect(page.getByRole('radio', { name: 'More supportive' })).toBeFocused()
    await page.keyboard.press('Enter')
    await expect(page.getByRole('radio', { name: 'More supportive' })).toHaveAttribute('aria-checked', 'true')
    const feedback = page.locator('.context-feedback__loop > button')
    await feedback.focus()
    await page.keyboard.press('Enter')
    await expect(feedback).toHaveAttribute('aria-expanded', 'true')
    const outline = await feedback.evaluate((element) => getComputedStyle(element).outlineStyle)
    expect(outline).not.toBe('none')
    await page.screenshot({ path: reviewPath('10-en-keyboard-feedback.png'), fullPage: true })
  })
})
