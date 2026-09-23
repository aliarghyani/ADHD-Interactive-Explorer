import { expect, test, type Page } from '@playwright/test'

async function hydrated(page: Page, path: string): Promise<void> {
  await page.goto(path)
  await expect(page.locator('.app-shell')).toHaveAttribute('data-hydrated', 'true')
}

test.describe('WP-14A functional journeys', () => {
  test.use({ viewport: { width: 1440, height: 900 } })

  test('A: Home to canonical map relationship, evidence, and return', async ({ page }) => {
    await hydrated(page, '/en')
    await page.locator('.home-entry__link[href="/en/map"]').click()
    await expect(page).toHaveURL('/en/map')
    await page.locator('[data-node-id="REG3"]').click()
    await expect(page).toHaveURL('/en/map/REG3')
    await expect(page.getByTestId('semantic-selected-summary').locator('.app-canonical-id')).toHaveText('REG3')
    await expect(page.locator('[data-node-id="REG3"]')).toHaveAttribute('aria-pressed', 'true')
    await expect(page.locator('[data-relationship-group="upstream"] .system-semantic-relationship').first()).toBeVisible()
    await expect(page.locator('[data-relationship-group="downstream"] .system-semantic-relationship').first()).toBeVisible()
    await page.locator('.system-evidence-entry a[href*="EVID_GOAL_MANAGEMENT"]').click()
    await expect(page).toHaveURL(/\/en\/evidence\/EVID_GOAL_MANAGEMENT\?from=/)
    await expect(page.locator('.evidence-detail__identity .app-canonical-id')).toHaveText('EVID_GOAL_MANAGEMENT')
    await expect(page.locator('.citation-source').first()).toBeVisible()
    await page.locator('.evidence-detail__return a[href="/en/map/REG3"]').click()
    await expect(page).toHaveURL('/en/map/REG3')
    await expect(page.getByTestId('semantic-selected-summary').locator('.app-canonical-id')).toHaveText('REG3')
  })

  test('B: Behaviour pathways restore, switch, and resolve evidence without changing identity', async ({ page }) => {
    await hydrated(page, '/en/behaviours')
    await expect(page.locator('.behaviour-card')).toHaveCount(7)
    await hydrated(page, '/en/behaviours/BEH1?pathway=PATH_BEH1_STRESS')
    await expect(page.locator('.behaviour-detail__identity .app-canonical-id')).toHaveText('BEH1')
    await expect(page.getByRole('radio', { name: /PATH_BEH1_STRESS/ })).toHaveAttribute('aria-checked', 'true')
    await expect(page.locator('.behaviour-pathway__steps article .app-canonical-id')).toHaveText(['CTX2', 'REG6', 'BEH1'])
    await expect(page.locator('.behaviour-alternatives article').first()).toBeVisible()
    await page.getByRole('radio', { name: /PATH_BEH1_DELAYED_REWARD/ }).click()
    await expect(page).toHaveURL('/en/behaviours/BEH1?pathway=PATH_BEH1_DELAYED_REWARD')
    await expect(page.locator('.behaviour-detail__identity .app-canonical-id')).toHaveText('BEH1')
    await page.locator('.behaviour-pathway__relationship button').first().click()
    await expect(page.locator('.behaviour-evidence .app-canonical-id').first()).toContainText('EVID_')
    await page.locator('.behaviour-evidence__detail-link').first().click()
    await expect(page).toHaveURL(/\/en\/evidence\/EVID_/)
    await page.locator('.evidence-detail__return a').first().click()
    await expect(page).toHaveURL('/en/behaviours/BEH1?pathway=PATH_BEH1_DELAYED_REWARD')
    await expect(page.getByRole('radio', { name: /PATH_BEH1_DELAYED_REWARD/ })).toHaveAttribute('aria-checked', 'true')
  })

  test('C: Context qualitative state, canonical feedback, and related navigation', async ({ page }) => {
    await hydrated(page, '/en/context/CTX2?state=demanding')
    await expect(page.locator('.context-detail__identity .app-canonical-id')).toHaveText('CTX2')
    await expect(page.locator('.context-state [role="radio"]')).toHaveCount(3)
    await expect(page.getByRole('radio', { name: 'More demanding' })).toHaveAttribute('aria-checked', 'true')
    await expect(page.locator('.context-mapping')).toHaveCount(5)
    await page.locator('.context-feedback__loop > button').click()
    await expect(page.locator('.context-feedback__details')).toContainText('EDGE_FUN1_CTX2_FEEDBACK_WITH')
    await page.locator('.context-feedback__evidence').click()
    await expect(page.locator('.context-evidence')).toContainText('EVID_FUNCTION_STRESS_FEEDBACK_LOOP')
    await page.locator('.context-mapping a[href^="/en/behaviours/"]').first().click()
    await expect(page).toHaveURL(/\/en\/behaviours\/BEH\d+$/)
    await expect(page.locator('.behaviour-detail__identity .app-canonical-id')).toHaveText(/^BEH\d+$/)
  })

  test('D: exactly three formal presentations remain independent of exploration state', async ({ page }) => {
    await hydrated(page, '/en/behaviours/BEH1?pathway=PATH_BEH1_STRESS')
    await hydrated(page, '/en/context/CTX2?state=demanding')
    await hydrated(page, '/en/presentations')
    await expect(page.locator('.presentation-card')).toHaveCount(3)
    await expect(page.locator('.presentation-history')).toContainText('HISTORICAL_ADD_NOTE')
    for (const id of ['PRESENTATION_INATTENTIVE', 'PRESENTATION_HYPERACTIVE_IMPULSIVE', 'PRESENTATION_COMBINED']) {
      await hydrated(page, `/en/presentations/${id}`)
      await expect(page.locator('.presentation-detail__identity .app-canonical-id')).toHaveText(id)
      await expect(page.locator('.presentation-switcher li')).toHaveCount(3)
      await expect(page.locator('.presentation-anchors article').first()).toBeVisible()
      await expect(page).toHaveURL(`/en/presentations/${id}`)
    }
    await page.getByRole('button', { name: 'View source preview' }).click()
    await expect(page.locator('.presentation-source').first()).toBeVisible()
  })

  test('E: relationship evidence has source, limitations, and safe return', async ({ page }) => {
    await hydrated(page, '/en/map/REG3')
    await expect(page.locator('[data-relationship-group="upstream"] .system-semantic-relationship').first()).toBeVisible()
    const evidenceLink = page.locator('.system-semantic-evidence-links a').first()
    const evidenceId = (await evidenceLink.locator('bdi').textContent())?.trim()
    expect(evidenceId).toMatch(/^EVID_/)
    await evidenceLink.click()
    await expect(page.locator('.evidence-detail__identity .app-canonical-id')).toHaveText(evidenceId!)
    await expect(page.locator('.evidence-detail__limitations li').first()).toBeVisible()
    await expect(page.locator('.citation-source').first()).toBeVisible()
    await expect(page.locator('[data-safety-kind="evidence"]')).toBeVisible()
    await page.locator('.evidence-detail__return a[href="/en/map/REG3"]').click()
    await expect(page).toHaveURL('/en/map/REG3')
  })

  for (const [section, id, selector] of [
    ['map', 'BEH1', '[data-testid="semantic-selected-summary"] .app-canonical-id'],
    ['behaviours', 'BEH1', '.behaviour-detail__identity .app-canonical-id'],
    ['context', 'CTX2', '.context-detail__identity .app-canonical-id'],
    ['presentations', 'PRESENTATION_COMBINED', '.presentation-detail__identity .app-canonical-id'],
    ['evidence', 'EVID_GOAL_MANAGEMENT', '.evidence-detail__identity .app-canonical-id'],
  ] as const) {
    test(`EN/FA deep link preserves ${section} identity`, async ({ page }) => {
      await hydrated(page, `/en/${section}/${id}`)
      await expect(page.locator(selector)).toHaveText(id)
      await page.locator('.app-shell__locale-link').click()
      await expect(page).toHaveURL(`/fa/${section}/${id}`)
      await expect(page.locator('.app-shell')).toHaveAttribute('data-locale', 'fa')
      await expect(page.locator(selector)).toHaveText(id)
    })
  }

  for (const [path, recovery] of [
    ['/en/map/beh1', '/en/map'],
    ['/en/behaviours/beh1', '/en/behaviours'],
    ['/en/context/ctx2', '/en/context'],
    ['/en/presentations/HISTORICAL_ADD_NOTE', '/en/presentations'],
    ['/en/evidence/evid_goal_management', '/en/evidence'],
  ] as const) {
    test(`invalid exact ID recovers from ${path}`, async ({ page }) => {
      await hydrated(page, path)
      await expect(page.getByRole('heading', { name: /not found|beh1|ctx2/i }).first()).toBeVisible()
      await expect(page.locator('.app-shell__nav')).toBeVisible()
      await page.locator(`.app-shell__nav a[href="${recovery}"]`).click()
      await expect(page).toHaveURL(recovery)
    })
  }
})
