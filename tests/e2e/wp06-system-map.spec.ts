import { expect, test, type Page } from '@playwright/test'

function captureBrowserProblems(page: Page): string[] {
  const problems: string[] = []
  page.on('console', (message) => {
    if (message.type() === 'warning' || message.type() === 'error') {
      problems.push(`${message.type()}: ${message.text()}`)
    }
  })
  page.on('pageerror', (error) => problems.push(`pageerror: ${error.message}`))
  return problems
}

test.describe('WP-06 System Map routes', () => {
  test.use({ viewport: { width: 1440, height: 1000 } })

  test('hydrates EN and FA default routes without a selection', async ({ page }, testInfo) => {
    const problems = captureBrowserProblems(page)

    await page.goto('/en/map')
    await expect(page.getByRole('heading', { level: 1, name: 'Explore the system map' })).toBeVisible()
    await expect(page.getByTestId('system-visual-graph')).toBeVisible()
    await expect(page.locator('[data-node-id]')).toHaveCount(30)
    await expect(page.locator('[data-edge-id]')).toHaveCount(49)
    await expect(page.locator('[aria-pressed="true"]')).toHaveCount(0)
    await page.screenshot({ path: testInfo.outputPath('en-default.png'), fullPage: true })

    await page.goto('/fa/map')
    await expect(page.locator('html')).toHaveAttribute('lang', 'fa')
    await expect(page.locator('html')).toHaveAttribute('dir', 'rtl')
    await expect(page.getByRole('heading', { level: 1, name: 'کاوش در نقشه سامانه' })).toBeVisible()
    await expect(page.locator('[data-node-id]')).toHaveCount(30)
    await page.screenshot({ path: testInfo.outputPath('fa-default.png'), fullPage: true })
    expect(problems).toEqual([])
  })

  test('restores a canonical deep link and preserves it across locale switching', async ({ page }, testInfo) => {
    const problems = captureBrowserProblems(page)

    await page.goto('/en/map/BEH1')
    await expect(page.locator('[data-node-id="BEH1"]')).toHaveAttribute('aria-pressed', 'true')
    await expect(page.getByRole('heading', { level: 2, name: 'Starting' })).toBeVisible()
    const englishGeometry = await page.locator('[data-node-id="BEH1"]').getAttribute('style')

    await page.getByRole('link', { name: 'FA' }).click()
    await expect(page).toHaveURL(/\/fa\/map\/BEH1$/)
    await expect(page.locator('[data-node-id="BEH1"]')).toHaveAttribute('aria-pressed', 'true')
    await expect(page.getByRole('heading', { level: 2, name: 'شروع کردن' })).toBeVisible()
    await expect(page.locator('[data-node-id="BEH1"]')).toHaveAttribute('style', englishGeometry ?? '')
    await page.screenshot({ path: testInfo.outputPath('fa-beh1-selected.png'), fullPage: true })
    expect(problems).toEqual([])
  })

  test('turns node selection into the route-owned selected state', async ({ page }) => {
    await page.goto('/en/map')
    await page.locator('[data-node-id="BEH1"]').click()

    await expect(page).toHaveURL(/\/en\/map\/BEH1$/)
    await expect(page.locator('[data-node-id="BEH1"]')).toHaveAttribute('aria-pressed', 'true')
    await expect(page.locator('.system-graph-node.is-highlighted')).not.toHaveCount(0)
    await expect(page.locator('.system-graph-edge.is-highlighted')).not.toHaveCount(0)
  })

  test('shows controlled invalid-ID handling without fuzzy resolution', async ({ page }) => {
    await page.goto('/en/map/beh1')

    await expect(page.getByRole('heading', { level: 2, name: 'beh1' })).toBeVisible()
    await expect(page.getByText('This canonical node ID is not part of the published map.')).toBeVisible()
    await expect(page.getByTestId('system-visual-graph')).toHaveCount(0)
  })

  test('filters layers without recomputing geometry and resets the viewport', async ({ page }, testInfo) => {
    await page.goto('/en/map')
    const regulationGeometry = await page.locator('[data-node-id="REG1"]').getAttribute('style')
    const initialStageStyle = await page.locator('.system-graph-stage').getAttribute('style')

    await page.getByLabel('Show layer: Context').uncheck()
    await expect(page.locator('[data-node-id="CTX1"]')).toHaveCount(0)
    await expect(page.locator('[data-node-id="REG1"]')).toHaveAttribute('style', regulationGeometry ?? '')
    await page.screenshot({ path: testInfo.outputPath('context-filtered.png'), fullPage: true })

    await page.getByRole('button', { name: 'Zoom in' }).click()
    await expect(page.locator('.system-graph-stage')).not.toHaveAttribute('style', initialStageStyle ?? '')
    await page.getByRole('button', { name: 'Reset view' }).click()
    await expect(page.locator('.system-graph-stage')).toHaveAttribute('style', initialStageStyle ?? '')
  })

  test('keeps feedback semantics identifiable when a connected node is selected', async ({ page }, testInfo) => {
    await page.goto('/en/map/CTX2')

    await expect(page.locator('[data-relationship-type="FEEDBACK_WITH"]')).toHaveCount(5)
    await expect(page.locator('[data-relationship-type="FEEDBACK_WITH"].is-highlighted')).toHaveCount(4)
    await expect(page.locator('.system-map-legend .system-legend-item').filter({ hasText: 'FEEDBACK_WITH' }))
      .toContainText('Feedback with')
    await page.screenshot({ path: testInfo.outputPath('feedback-selected.png'), fullPage: true })
  })
})

test.describe('WP-06 responsive boundary', () => {
  test('keeps the desktop graph usable at the tablet boundary', async ({ page }, testInfo) => {
    await page.setViewportSize({ width: 900, height: 1000 })
    await page.goto('/en/map/BEH1')

    await expect(page.getByTestId('system-visual-graph')).toBeVisible()
    await expect(page.locator('.system-detail-panel')).toBeVisible()
    await expect(page.locator('.system-mobile-boundary')).toBeHidden()
    const overflow = await page.evaluate(() => document.body.scrollWidth - document.body.clientWidth)
    expect(overflow).toBeLessThanOrEqual(1)
    await page.screenshot({ path: testInfo.outputPath('tablet-selected.png'), fullPage: true })
  })

  test('shows the controlled non-final fallback on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto('/en/map')

    await expect(page.getByTestId('system-visual-graph')).toBeHidden()
    await expect(page.getByRole('heading', {
      level: 2,
      name: 'A focused mobile map is coming in a later work package',
    })).toBeVisible()
  })
})
