import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

const routes = [
  '/en',
  '/en/map/BEH1',
  '/en/behaviours/BEH1',
  '/en/context/CTX4',
  '/en/presentations/PRESENTATION_INATTENTIVE',
  '/en/evidence/EVID_ATTENTION_REGULATION',
  '/fa',
  '/fa/map/BEH1',
  '/fa/behaviours/BEH1',
  '/fa/context/CTX4',
  '/fa/presentations/PRESENTATION_INATTENTIVE',
  '/fa/evidence/EVID_ATTENTION_REGULATION',
] as const

test.describe('WP-13 serious and critical accessibility scan', () => {
  for (const route of routes) {
    test(route, async ({ page }) => {
      await page.goto(route)
      await expect(page.locator('.app-shell')).toHaveAttribute('data-hydrated', 'true')

      const results = await new AxeBuilder({ page }).analyze()
      const findings = results.violations
        .filter(violation => violation.impact === 'serious' || violation.impact === 'critical')
        .map(violation => ({
          id: violation.id,
          impact: violation.impact,
          nodes: violation.nodes.map(node => node.target),
        }))

      expect(findings).toEqual([])
    })
  }
})
