import { mkdirSync } from 'node:fs'
import { resolve } from 'node:path'
import { expect, test, type Page } from '@playwright/test'

const reviewDirectory = resolve('artifacts/wp11-evidence-review')
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

test.describe('WP-11 Evidence desktop review', () => {
  test.use({ viewport: { width: 1440, height: 1000 } })

  test('reviews EN and FA indexes with qualitative, neutral ordering', async ({ page }) => {
    const problems = captureBrowserProblems(page)
    await page.goto('/en/evidence')
    await waitForHydration(page)
    await expect(page.locator('.evidence-card')).toHaveCount(23)
    await expect(page.locator('[data-evidence-level="Clinical"]')).toHaveCount(4)
    await expect(page.locator('[data-evidence-level="Strong"]')).toHaveCount(8)
    await expect(page.locator('[data-evidence-level="Moderate"]')).toHaveCount(9)
    await expect(page.locator('[data-evidence-level="Limited"]')).toHaveCount(2)
    await expect(page.locator('progress')).toHaveCount(0)
    await page.screenshot({ path: reviewPath('01-en-index-desktop.png'), fullPage: true })

    await page.goto('/fa/evidence')
    await waitForHydration(page)
    await expect(page.locator('html')).toHaveAttribute('dir', 'rtl')
    await expect(page.locator('.evidence-card')).toHaveCount(23)
    await page.screenshot({ path: reviewPath('02-fa-index-rtl.png'), fullPage: true })
    expect(problems).toEqual([])
  })

  test('reviews every qualitative level, limitations, DOI, and no-DOI sources', async ({ page }) => {
    const problems = captureBrowserProblems(page)
    const routes = [
      ['EVID_CLINICAL_ANCHORS', 'Clinical', '03-clinical-detail.png'],
      ['EVID_ATTENTION_REGULATION', 'Strong', '04-strong-doi-detail.png'],
      ['EVID_GOAL_MANAGEMENT', 'Moderate', '05-moderate-detail.png'],
      ['EVID_URGENCY_FEEDBACK_LOOP', 'Limited', '06-limited-multiple-sources.png'],
    ] as const

    for (const [id, level, screenshot] of routes) {
      await page.goto(`/en/evidence/${id}`)
      await waitForHydration(page)
      await expect(page.locator('.evidence-detail__identity')).toContainText(level)
      await expect(page.locator('.evidence-detail__limitations li').first()).toBeVisible()
      await expect(page.locator('[data-safety-kind="evidence"]')).toContainText('group-level')
      await expect(page.locator('.citation-source').first()).toBeVisible()
      await page.screenshot({ path: reviewPath(screenshot), fullPage: true })
    }

    await page.goto('/en/evidence/EVID_ATTENTION_REGULATION')
    await expect(page.getByText('10.1016/j.biopsych.2005.02.006', { exact: true })).toBeVisible()
    await page.goto('/en/evidence/EVID_CLINICAL_ANCHORS')
    await expect(page.locator('.citation-source').first()).not.toContainText('DOI')
    expect(problems).toEqual([])
  })

  test('supports filtering and controlled invalid exact IDs', async ({ page }) => {
    const problems = captureBrowserProblems(page)
    await page.goto('/en/evidence?source=SRC_CAO_SLEEP_META_2025')
    await waitForHydration(page)
    await expect(page.locator('.evidence-card')).toHaveCount(1)
    await expect(page.locator('.evidence-card')).toContainText('EVID_SLEEP_CONTEXT')
    await page.screenshot({ path: reviewPath('07-source-filter.png'), fullPage: true })

    await page.goto('/en/evidence/evid_sleep_context')
    await waitForHydration(page)
    await expect(page.getByRole('heading', { level: 1, name: 'Evidence record not found' })).toBeVisible()
    await page.screenshot({ path: reviewPath('08-invalid-evidence-id.png'), fullPage: true })
    expect(problems).toEqual([])
  })

  test('links Behaviour, Context, Presentation, and System Map to canonical evidence', async ({ page }) => {
    const problems = captureBrowserProblems(page)
    await page.goto('/en/behaviours/BEH1')
    await waitForHydration(page)
    await page.locator('.behaviour-pathway__relationship button').first().click()
    await page.locator('.behaviour-evidence__detail-link').first().click()
    await expect(page).toHaveURL(/\/en\/evidence\/EVID_/)
    await expect(page.getByText('Return to exploration')).toBeVisible()

    await page.goto('/en/context/CTX4')
    await waitForHydration(page)
    await page.locator('.context-mapping__relationship button').first().click()
    await page.locator('.context-evidence__detail-link').first().click()
    await expect(page).toHaveURL(/\/en\/evidence\/EVID_/)

    await page.goto('/en/presentations/PRESENTATION_INATTENTIVE')
    await waitForHydration(page)
    await page.getByRole('button', { name: 'View source preview' }).click()
    await page.getByText('Find evidence records using this source').first().click()
    await expect(page).toHaveURL(/\/en\/evidence\?source=SRC_/)

    await page.goto('/en/map/REG3')
    await waitForHydration(page)
    await expect(page.locator('.system-evidence-entry a').first()).toContainText('EVID_GOAL_MANAGEMENT')
    await page.screenshot({ path: reviewPath('09-system-map-evidence-entry.png'), fullPage: true })
    expect(problems).toEqual([])
  })
})

test.describe('WP-11 Evidence mobile and keyboard review', () => {
  test.use({ viewport: { width: 390, height: 844 } })

  test('keeps mobile detail sequential with wrapping citations', async ({ page }) => {
    const problems = captureBrowserProblems(page)
    await page.goto('/fa/evidence/EVID_ATTENTION_REGULATION')
    await waitForHydration(page)
    await expect(page.locator('html')).toHaveAttribute('dir', 'rtl')
    expect(await page.evaluate(() => document.body.scrollWidth - document.body.clientWidth)).toBeLessThanOrEqual(1)
    await expect(page.locator('.evidence-detail__limitations')).toBeVisible()
    await page.screenshot({ path: reviewPath('10-fa-mobile-detail.png'), fullPage: true })
    expect(problems).toEqual([])
  })

  test('supports keyboard-only index filtering and detail navigation', async ({ page }) => {
    await page.goto('/en/evidence')
    await waitForHydration(page)
    const search = page.getByRole('searchbox', { name: 'Search evidence' })
    await search.focus()
    await expect(search).toBeFocused()
    await search.fill('EVID_WORKING_MEMORY')
    await expect(page.locator('.evidence-card')).toHaveCount(1)
    const link = page.getByRole('link', { name: 'Inspect evidence and sources' })
    await link.focus()
    await expect(link).toBeFocused()
    await page.keyboard.press('Enter')
    await expect(page).toHaveURL('/en/evidence/EVID_WORKING_MEMORY')
  })
})
