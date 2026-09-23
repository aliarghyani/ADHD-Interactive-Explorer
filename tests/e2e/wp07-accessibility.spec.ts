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

async function tabIntoGraph(page: Page): Promise<string | null> {
  for (let index = 0; index < 20; index += 1) {
    await page.keyboard.press('Tab')
    const nodeId = await page.evaluate(() => (document.activeElement as HTMLElement | null)?.dataset.nodeId ?? null)
    if (nodeId) return nodeId
  }
  return null
}

test.describe('WP-07 graph keyboard and semantic synchronization', () => {
  test.use({ viewport: { width: 1440, height: 1000 } })

  test('supports a roving keyboard target, geometric arrows, and Enter selection', async ({ page }) => {
    const problems = captureBrowserProblems(page)
    await page.goto('/en/map')
    await expect(page.locator('.system-graph-node[tabindex="0"]')).toHaveCount(1)
    await expect(page.locator('.system-graph-node[tabindex="-1"]')).toHaveCount(29)

    const enteredNodeId = await tabIntoGraph(page)
    expect(enteredNodeId).not.toBeNull()
    await page.keyboard.press('ArrowDown')
    const movedNodeId = await page.evaluate(() => (document.activeElement as HTMLElement | null)?.dataset.nodeId ?? null)
    expect(movedNodeId).not.toBe(enteredNodeId)

    await page.keyboard.press('Enter')
    await expect(page).toHaveURL(new RegExp(`/en/map/${movedNodeId}$`))
    const movedNode = page.locator(`[data-node-id="${movedNodeId}"]`)
    await expect(movedNode).toHaveAttribute('aria-pressed', 'true')
    await expect(page.locator('#system-semantic-heading')).toContainText(await movedNode.locator('strong').innerText())
    expect(await movedNode.evaluate((element) => getComputedStyle(element).outlineStyle)).not.toBe('none')

    await page.keyboard.press('Escape')
    await expect(page).toHaveURL(/\/en\/map$/)
    await expect(movedNode).toBeFocused()
    await expect(movedNode).toHaveAttribute('aria-pressed', 'false')

    await page.keyboard.press('Space')
    await expect(page).toHaveURL(new RegExp(`/en/map/${movedNodeId}$`))
    await expect(movedNode).toHaveAttribute('aria-pressed', 'true')
    expect(problems).toEqual([])
  })

  test('does not move focus into the graph after semantic selection unless explicitly requested', async ({ page }) => {
    await page.goto('/en/map/BEH1')
    await expect(page.getByTestId('system-visual-graph')).toBeVisible()
    const relationship = page.locator('.system-semantic-relationship').first()
    const relatedId = await relationship.locator('bdi').innerText()
    await relationship.click()

    await expect(page).toHaveURL(new RegExp(`/en/map/${relatedId}$`))
    await expect(page.locator('#system-semantic-heading')).toBeFocused()
    await expect(page.locator('.system-graph-node:focus')).toHaveCount(0)

    await page.getByRole('button', { name: 'Show in graph' }).click()
    await expect(page.locator(`[data-node-id="${relatedId}"]`)).toBeFocused()
    await expect(page).toHaveURL(new RegExp(`/en/map/${relatedId}$`))
  })

  test('restores focus to the graph trigger when selected detail is closed', async ({ page }) => {
    await page.goto('/en/map')
    const node = page.locator('[data-node-id="BEH1"]')
    await node.focus()
    await page.keyboard.press('Enter')
    await expect(page).toHaveURL(/\/en\/map\/BEH1$/)

    await page.getByRole('button', { name: 'Close details' }).click()
    await expect(page).toHaveURL(/\/en\/map$/)
    await expect(node).toBeFocused()
  })

  test('provides localized FA semantics and preserves canonical identity', async ({ page }) => {
    const problems = captureBrowserProblems(page)
    await page.goto('/fa/map/BEH1')
    await expect(page.locator('html')).toHaveAttribute('dir', 'rtl')
    await expect(page.locator('#system-semantic-heading')).toHaveText('شروع کردن')
    await expect(page.locator('[data-testid="semantic-selected-summary"] bdi')).toHaveText('BEH1')
    await expect(page.getByText('CA1 و CA2 حوزه‌های رسمی بالینی هستند.')).toBeVisible()
    expect(problems).toEqual([])
  })
})

test.describe('WP-07 renderer resilience and responsive boundary', () => {
  test('keeps deep-linked semantic education usable when renderer initialization fails', async ({ page }) => {
    await page.addInitScript(() => {
      Object.defineProperty(window, 'ResizeObserver', {
        configurable: true,
        value: function ResizeObserverFailure() {
          throw new Error('WP-07 renderer failure simulation')
        },
      })
    })
    await page.goto('/en/map/BEH1')

    await expect(page.getByText('The visual map could not load.')).toBeVisible()
    await expect(page.locator('#system-semantic-heading')).toHaveText('Starting')
    await expect(page.locator('.system-semantic-relationship').first()).toBeVisible()

    const relatedId = await page.locator('.system-semantic-relationship').first().locator('bdi').innerText()
    await page.locator('.system-semantic-relationship').first().click()
    await expect(page).toHaveURL(new RegExp(`/en/map/${relatedId}$`))
    await expect(page.locator('#system-semantic-heading')).not.toHaveText('Starting')
  })

  test('keeps the visual graph at tablet width and the focused-path surface on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 900, height: 1000 })
    await page.goto('/en/map/BEH1')
    await expect(page.getByTestId('system-visual-graph')).toBeVisible()
    await expect(page.locator('.system-semantic-browser')).toBeVisible()
    expect(await page.evaluate(() => document.body.scrollWidth - document.body.clientWidth)).toBeLessThanOrEqual(1)

    await page.setViewportSize({ width: 390, height: 844 })
    await expect(page.getByTestId('system-visual-graph')).toBeHidden()
    await expect(page.getByTestId('mobile-focused-path')).toBeVisible()
    await expect(page.locator('.mobile-focused-path__current h2')).toHaveText('Starting')
  })
})

test.describe('WP-07 reduced motion', () => {
  test.use({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' })

  test('removes non-essential graph transitions without removing semantics', async ({ page }) => {
    await page.goto('/en/map/BEH1')
    await expect(page.locator('#system-semantic-heading')).toHaveText('Starting')
    const transitions = await page.locator('[data-node-id="BEH1"]').evaluate((element) => {
      const style = getComputedStyle(element)
      return { duration: style.transitionDuration, property: style.transitionProperty }
    })
    expect(transitions.duration.split(',').every((duration) => duration.trim() === '0s')).toBe(true)
  })
})
