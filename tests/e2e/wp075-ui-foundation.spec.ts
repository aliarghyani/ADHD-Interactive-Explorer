import { mkdirSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { expect, test, type Page } from '@playwright/test'

const reviewDirectory = resolve('artifacts/wp07.5-ui-review')
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

test.describe('WP-07.5 UI foundation behavior', () => {
  test.use({ viewport: { width: 1440, height: 1000 } })

  test('renders shared surfaces, authoritative notices, filters, and unchanged scientific identities', async ({ page }) => {
    test.setTimeout(60_000)
    const problems = captureBrowserProblems(page)
    const nodes = JSON.parse(readFileSync('knowledge/source/graph/nodes.json', 'utf8')) as { nodes: Array<{ id: string }> }
    const edges = JSON.parse(readFileSync('knowledge/source/graph/edges.json', 'utf8')) as { edges: Array<{ id: string }> }

    await page.goto('/en/map/BEH1')
    await expect(page.locator('.app-panel')).not.toHaveCount(0)
    await expect(page.locator('[data-safety-kind="global"]')).toContainText('does not diagnose ADHD')
    await expect(page.locator('[data-safety-kind="graph"]')).toContainText('possible associations or influences')
    await expect(page.getByTestId('system-visual-graph')).toBeVisible({ timeout: 20_000 })
    const evidenceLabel = await page.locator('[data-evidence-level]').first().innerText()
    expect(evidenceLabel).toBe('Descriptive')
    expect(evidenceLabel).not.toMatch(/%|score|confidence/i)

    const renderedNodeIds = await page.locator('[data-node-id]').evaluateAll((elements) => elements.map((element) => element.getAttribute('data-node-id')).sort())
    const renderedEdgeIds = await page.locator('[data-edge-id]').evaluateAll((elements) => elements.map((element) => element.getAttribute('data-edge-id')).sort())
    expect(renderedNodeIds).toEqual(nodes.nodes.map(({ id }) => id).sort())
    expect(renderedEdgeIds).toEqual(edges.edges.map(({ id }) => id).sort())

    const contextFilter = page.getByLabel('Show layer: Context')
    await expect(contextFilter).toBeChecked()
    await expect(contextFilter.locator('..')).toHaveAttribute('data-selected', 'true')
    await contextFilter.uncheck()
    await expect(contextFilter.locator('..')).toHaveAttribute('data-selected', 'false')
    await expect(page.locator('[data-node-id="CTX1"]')).toHaveCount(0)
    expect(problems).toEqual([])
  })

  test('captures EN and FA desktop hierarchy in default and selected states', async ({ page }) => {
    test.setTimeout(60_000)
    await page.goto('/en/map')
    await expect(page.getByRole('heading', { level: 1, name: 'Explore the system map' })).toBeVisible()
    await expect(page.getByTestId('system-visual-graph')).toBeVisible({ timeout: 20_000 })
    await page.screenshot({ path: reviewPath('01-en-desktop-default.png') })

    await page.goto('/en/map/BEH1')
    await expect(page.locator('#system-semantic-heading')).toHaveText('Starting')
    await expect(page.getByTestId('system-visual-graph')).toBeVisible({ timeout: 20_000 })
    await page.screenshot({ path: reviewPath('02-en-desktop-selected.png') })

    await page.goto('/fa/map')
    await expect(page.locator('html')).toHaveAttribute('dir', 'rtl')
    await expect(page.getByTestId('system-visual-graph')).toBeVisible({ timeout: 20_000 })
    await page.screenshot({ path: reviewPath('03-fa-desktop-default.png') })

    await page.goto('/fa/map/BEH1')
    await expect(page.locator('#system-semantic-heading')).toHaveText('شروع کردن')
    await expect(page.locator('[data-testid="semantic-selected-summary"] bdi')).toHaveText('BEH1')
    await expect(page.getByTestId('system-visual-graph')).toBeVisible({ timeout: 20_000 })
    await page.screenshot({ path: reviewPath('04-fa-desktop-selected.png') })
  })

  test('captures tablet, mobile deferred state, and visible keyboard focus', async ({ page }) => {
    test.setTimeout(60_000)
    await page.setViewportSize({ width: 900, height: 1000 })
    await page.goto('/en/map/BEH1')
    await expect(page.getByTestId('system-visual-graph')).toBeVisible({ timeout: 20_000 })
    await expect(page.locator('.system-semantic-browser')).toBeVisible()
    expect(await page.evaluate(() => document.body.scrollWidth - document.body.clientWidth)).toBeLessThanOrEqual(1)
    await page.screenshot({ path: reviewPath('05-en-tablet-selected.png') })

    await page.locator('[data-node-id="BEH1"]').focus()
    expect(await page.locator('[data-node-id="BEH1"]').evaluate((element) => getComputedStyle(element).outlineStyle)).not.toBe('none')

    await page.setViewportSize({ width: 390, height: 844 })
    await expect(page.getByTestId('system-visual-graph')).toBeHidden()
    await expect(page.getByTestId('mobile-focused-path')).toBeVisible()
    await page.screenshot({ path: reviewPath('06-en-mobile-deferred.png') })
  })

  test('captures the renderer-failure fallback while semantic education remains usable', async ({ page }) => {
    test.setTimeout(60_000)
    await page.addInitScript(() => {
      Object.defineProperty(window, 'ResizeObserver', {
        configurable: true,
        value: function ResizeObserverFailure() {
          throw new Error('WP-07.5 renderer failure review')
        },
      })
    })
    await page.goto('/en/map/BEH1')
    await expect(page.getByText('The visual map could not load.')).toBeVisible()
    await expect(page.locator('#system-semantic-heading')).toHaveText('Starting')
    await page.screenshot({ path: reviewPath('07-en-renderer-failure.png') })
  })
})

test.describe('WP-07.5 reduced motion review', () => {
  test.use({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' })

  test('captures reduced-motion selected state without removing meaning', async ({ page }) => {
    test.setTimeout(60_000)
    await page.goto('/en/map/BEH1')
    await expect(page.getByTestId('system-visual-graph')).toBeVisible({ timeout: 20_000 })
    const durations = await page.locator('[data-node-id="BEH1"]').evaluate((element) => getComputedStyle(element).transitionDuration)
    expect(durations.split(',').every((duration) => Number.parseFloat(duration) <= 0.001)).toBe(true)
    await page.screenshot({ path: reviewPath('08-en-reduced-motion.png') })
  })
})
