import { expect, test } from '@playwright/test'

test('preserves canonical route identity while switching document locale', async ({ page }) => {
  await page.goto('/en/spike/map/BEH1')

  await expect(page.locator('html')).toHaveAttribute('lang', 'en')
  await expect(page.locator('html')).toHaveAttribute('dir', 'ltr')
  await expect(page.getByTestId('server-selected-summary').locator('code')).toHaveText('BEH1')

  await page.getByRole('link', { name: 'FA', exact: true }).click()
  await expect(page).toHaveURL(/\/fa\/spike\/map\/BEH1$/)
  await expect(page.locator('html')).toHaveAttribute('lang', 'fa')
  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl')
  await expect(page.getByTestId('server-selected-summary').locator('code')).toHaveText('BEH1')

  await page.getByRole('link', { name: 'EN', exact: true }).click()
  await expect(page).toHaveURL(/\/en\/spike\/map\/BEH1$/)
  await expect(page.locator('html')).toHaveAttribute('lang', 'en')
  await expect(page.locator('html')).toHaveAttribute('dir', 'ltr')
})

test('hydrates a direct Persian route without changing direction', async ({ page }) => {
  await page.goto('/fa')
  await expect(page.locator('html')).toHaveAttribute('lang', 'fa')
  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl')
  await page.waitForLoadState('networkidle')
  await expect(page.locator('html')).toHaveAttribute('lang', 'fa')
  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl')
})
