import { expect, test, type Page } from '@playwright/test'

async function waitForHydration(page: Page): Promise<void> {
  await expect(page.locator('.app-shell')).toHaveAttribute('data-hydrated', 'true', { timeout: 15_000 })
}

test.describe('WP-13 accessibility and RTL hardening', () => {
  test('uses meaningful language names and preserves canonical route identity', async ({ page }) => {
    await page.goto('/en/map/BEH1')
    await waitForHydration(page)

    const switcher = page.getByRole('link', { name: 'فارسی', exact: true })
    await expect(switcher).toHaveAttribute('href', '/fa/map/BEH1')
    await switcher.click()

    await expect(page).toHaveURL(/\/fa\/map\/BEH1$/)
    await expect(page.locator('html')).toHaveAttribute('lang', 'fa')
    await expect(page.locator('html')).toHaveAttribute('dir', 'rtl')
    await expect(page.getByRole('link', { name: 'English', exact: true })).toHaveAttribute('href', '/en/map/BEH1')
  })

  test('implements roving radio keys and evidence-panel focus restoration in Behaviour', async ({ page }) => {
    await page.goto('/en/behaviours/BEH1')
    await waitForHydration(page)

    const radios = page.getByRole('radio')
    await expect(radios).toHaveCount(4)
    await expect(page.locator('[role="radio"][tabindex="0"]')).toHaveCount(1)
    await radios.first().focus()
    await page.keyboard.press('ArrowRight')
    await expect(radios.nth(1)).toBeFocused()
    await expect(radios.nth(1)).toHaveAttribute('aria-checked', 'true')

    const trigger = page.getByRole('button', { name: 'View relationship evidence' }).first()
    await trigger.click()
    await expect(trigger).toHaveAttribute('aria-expanded', 'true')
    await expect(trigger).toHaveAttribute('aria-controls', 'behaviour-evidence-preview')
    await expect(page.locator('#behaviour-evidence-title')).toBeFocused()
    await page.getByRole('button', { name: 'Close evidence preview' }).click()
    await expect(trigger).toBeFocused()
    await expect(trigger).toHaveAttribute('aria-expanded', 'false')
  })

  test('implements roving radio keys and evidence-panel focus restoration in Context', async ({ page }) => {
    await page.goto('/en/context/CTX4')
    await waitForHydration(page)

    const stateGroup = page.locator('.context-state__options')
    const radios = stateGroup.getByRole('radio')
    await expect(stateGroup.locator('[role="radio"][tabindex="0"]')).toHaveCount(1)
    await radios.nth(1).focus()
    await page.keyboard.press('ArrowLeft')
    await expect(radios.first()).toBeFocused()
    await expect(radios.first()).toHaveAttribute('aria-checked', 'true')

    const feedback = page.locator('.context-feedback__loop > button')
    await feedback.click()
    await expect(feedback).toHaveAttribute('aria-expanded', 'true')
    const controlledId = await feedback.getAttribute('aria-controls')
    expect(controlledId).toBeTruthy()
    await expect(page.locator(`#${controlledId}`)).toBeVisible()

    const trigger = page.locator('.context-feedback__evidence')
    await trigger.click()
    await expect(trigger).toHaveAttribute('aria-expanded', 'true')
    await expect(page.locator('#context-evidence-title')).toBeFocused()
    await page.getByRole('button', { name: 'Close evidence preview' }).click()
    await expect(trigger).toBeFocused()
  })

  test('keeps Persian citations structurally readable and narrow text reflow contained', async ({ page }) => {
    for (const width of [640, 320]) {
      await page.setViewportSize({ width, height: 900 })
      for (const path of [
        '/fa',
        '/fa/behaviours/BEH1',
        '/fa/context/CTX2',
        '/fa/evidence/EVID_GOAL_MANAGEMENT',
        '/fa/methodology',
      ]) {
        await page.goto(path)
        await waitForHydration(page)
        await expect(page.locator('html')).toHaveAttribute('dir', 'rtl')
        expect(await page.evaluate(() => document.body.scrollWidth - document.body.clientWidth), `${width}px ${path}`).toBeLessThanOrEqual(1)
      }
    }

    await expect(page.locator('bdi[dir="ltr"]')).not.toHaveCount(0)
    await page.goto('/fa/evidence/EVID_GOAL_MANAGEMENT')
    await expect(page.locator('.citation-source [dir="ltr"]')).not.toHaveCount(0)
    await expect(page.getByText('10.1016/j.biopsych.2005.02.006', { exact: true })).toBeVisible()
  })

  test('keeps the mobile focused path operable, directional, and touch sized in RTL', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto('/fa/map/CTX2')
    await waitForHydration(page)

    await expect(page.getByTestId('mobile-focused-path')).toBeVisible()
    await expect(page.getByTestId('system-visual-graph')).toBeHidden()
    await expect(page.locator('.mobile-focused-path__direction').first()).toContainText('CTX2 → REG1')
    const targets = await page.locator('.mobile-focused-path a, .mobile-focused-path summary').evaluateAll(elements =>
      elements.map((element) => {
        const rect = element.getBoundingClientRect()
        return { label: element.textContent?.trim(), size: Math.min(rect.width, rect.height) }
      }).filter(target => target.size > 0),
    )
    expect(targets.filter(target => target.size < 43.5), JSON.stringify(targets)).toEqual([])
  })

  test('preserves semantics under reduced motion and exposes controlled invalid recovery', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/en/map/BEH1')
    await waitForHydration(page)
    await expect(page.locator('#system-semantic-heading')).toHaveText('Starting')
    const duration = await page.locator('[data-node-id="BEH1"]').evaluate(element => getComputedStyle(element).transitionDuration)
    expect(duration.split(',').every(value => value.trim() === '0s')).toBe(true)

    await page.goto('/fa/evidence/NOT-AN-EVIDENCE-ID')
    await waitForHydration(page)
    await expect(page.locator('html')).toHaveAttribute('dir', 'rtl')
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    await expect(page.getByRole('link', { name: /رکوردهای شواهد/ })).toBeVisible()
  })
})
