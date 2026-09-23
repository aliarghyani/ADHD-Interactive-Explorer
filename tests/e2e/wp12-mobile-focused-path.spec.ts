import { expect, test, type Page } from '@playwright/test'

const reviewDirectory = 'artifacts/wp12-mobile-review'

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

async function expectNoOverflow(page: Page): Promise<void> {
  expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth))
    .toBeLessThanOrEqual(1)
}

test.describe('WP-12 mobile focused-path navigator', () => {
  test.use({ viewport: { width: 390, height: 844 } })

  test('renders structured EN and FA default orientation without loading desktop runtime', async ({ page }) => {
    const problems = captureBrowserProblems(page)
    const desktopRequests: string[] = []
    page.on('request', (request) => {
      if (/DesktopSystemMap|VisualGraph|production-layout|visualization\/system-map\/layout/i.test(request.url())) {
        desktopRequests.push(request.url())
      }
    })

    await page.goto('/en/map')
    await expect(page.getByTestId('mobile-focused-path')).toBeVisible()
    await expect(page.locator('[data-category]')).toHaveCount(6)
    await expect(page.locator('.mobile-focused-path__concept-link')).toHaveCount(30)
    await expect(page.getByTestId('system-visual-graph')).toHaveCount(0)
    await expect(page.getByText('Relationships are many-to-many')).toBeVisible()
    await expectNoOverflow(page)
    await page.screenshot({ path: `${reviewDirectory}/01-en-default.png`, fullPage: true })

    await page.goto('/fa/map')
    await expect(page.locator('html')).toHaveAttribute('dir', 'rtl')
    await expect(page.getByRole('heading', { level: 2, name: 'هر بار یک مفهوم را کاوش کنید' })).toBeVisible()
    await expect(page.locator('[data-category]')).toHaveCount(6)
    await expectNoOverflow(page)
    await page.screenshot({ path: `${reviewDirectory}/08-fa-default.png`, fullPage: true })

    expect(desktopRequests).toEqual([])
    expect(problems).toEqual([])
  })

  test('restores representative canonical deep links across every category in EN and FA', async ({ page }) => {
    const cases = [
      { locale: 'en', nodeId: 'CTX2', shot: '02-en-ctx2.png' },
      { locale: 'en', nodeId: 'REG2', shot: '03-en-reg2.png' },
      { locale: 'en', nodeId: 'BEH1', shot: '04-en-beh1.png' },
      { locale: 'en', nodeId: 'PAT1', shot: '05-en-pat1.png' },
      { locale: 'en', nodeId: 'FUN1', shot: '06-en-fun1.png' },
      { locale: 'en', nodeId: 'CA1', shot: '07-en-ca1.png' },
      { locale: 'fa', nodeId: 'CTX2', shot: '09-fa-ctx2.png' },
      { locale: 'fa', nodeId: 'REG2', shot: '10-fa-reg2.png' },
      { locale: 'fa', nodeId: 'BEH1', shot: '11-fa-beh1.png' },
    ] as const

    for (const entry of cases) {
      await page.goto(`/${entry.locale}/map/${entry.nodeId}`)
      await expect(page.locator('.mobile-focused-path__current')).toContainText(entry.nodeId)
      await expect(page.getByTestId('system-visual-graph')).toHaveCount(0)
      await expectNoOverflow(page)
      await page.screenshot({ path: `${reviewDirectory}/${entry.shot}`, fullPage: true })
    }
  })

  test('uses ordinary route history for three-concept traversal, Back, Forward, locale, and reset', async ({ page }) => {
    await page.goto('/en/map/REG2')
    await page.locator('a[href="/en/map/BEH4"]').first().click()
    await expect(page).toHaveURL(/\/en\/map\/BEH4$/)
    await page.locator('a[href="/en/map/PAT2"]').first().click()
    await expect(page).toHaveURL(/\/en\/map\/PAT2$/)

    await page.goBack()
    await expect(page).toHaveURL(/\/en\/map\/BEH4$/)
    await page.goBack()
    await expect(page).toHaveURL(/\/en\/map\/REG2$/)
    await page.goForward()
    await expect(page).toHaveURL(/\/en\/map\/BEH4$/)

    await page.getByRole('link', { name: 'فارسی', exact: true }).click()
    await expect(page).toHaveURL(/\/fa\/map\/BEH4$/)
    await expect(page.locator('.mobile-focused-path__current')).toContainText('BEH4')
    await page.locator('.mobile-focused-path__reset').click()
    await expect(page).toHaveURL(/\/fa\/map$/)
    await expect(page.getByRole('heading', { level: 2, name: 'هر بار یک مفهوم را کاوش کنید' })).toBeVisible()
  })

  test('keeps Feedback reciprocal and scientific direction stable in RTL', async ({ page }) => {
    await page.goto('/fa/map/CTX2')
    const feedback = page.locator('[data-relationship-group="feedback"]')
    await expect(feedback).toContainText('رابطه دوسویه')
    await expect(feedback).toContainText('قطعی نیست')
    await expect(feedback.locator('.mobile-focused-path__direction bdi').first()).toHaveAttribute('dir', 'ltr')
    await expect(feedback.locator('.mobile-focused-path__direction').first()).toContainText('↔')
  })

  test('integrates Evidence, Behaviour, Context, Methodology, invalid state, and keyboard flow', async ({ page }) => {
    await page.goto('/en/map/BEH1')
    await expect(page.getByRole('link', { name: 'Explore this Behaviour in plain language' })).toHaveAttribute('href', '/en/behaviours/BEH1')
    await expect(page.getByRole('link', { name: 'How to interpret this model' })).toHaveAttribute('href', '/en/methodology')
    const evidenceLink = page.locator('.mobile-focused-path__evidence a').first()
    if (await evidenceLink.count()) {
      await evidenceLink.click()
      await expect(page).toHaveURL(/\/en\/evidence\//)
      await page.goBack()
    }

    await page.goto('/en/map/CTX2')
    await expect(page.getByRole('link', { name: 'Explore how this Context may affect functioning' })).toHaveAttribute('href', '/en/context/CTX2')

    const relationship = page.locator('.mobile-focused-path__relationship').first()
    const destination = await relationship.getAttribute('href')
    await relationship.focus()
    await expect(relationship).toBeFocused()
    await page.keyboard.press('Enter')
    await expect(page).toHaveURL(new RegExp(`${destination}$`))

    await page.goto('/en/map/not-a-node')
    await expect(page.getByText('This canonical node ID is not part of the published map.')).toBeVisible()
    await expect(page.getByTestId('mobile-focused-path')).toHaveCount(0)
  })

  test('provides practical touch targets and reduced-motion-safe semantics', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/en/map/REG2')
    const targets = page.locator('.mobile-focused-path a:visible')
    const count = await targets.count()
    for (let index = 0; index < Math.min(count, 12); index += 1) {
      const box = await targets.nth(index).boundingBox()
      expect(box?.height ?? 0).toBeGreaterThanOrEqual(44)
    }
    await expect(page.locator('[data-relationship-group="upstream"]')).toBeVisible()
    await expectNoOverflow(page)
  })
})
