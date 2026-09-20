import { expect, test } from '@playwright/test'

test('serves the English shell and switches to Persian', async ({ page }) => {
  await page.goto('/en')

  await expect(page.locator('html')).toHaveAttribute('lang', 'en')
  await expect(page.locator('html')).toHaveAttribute('dir', 'ltr')
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Foundation ready')

  await page.getByRole('link', { name: 'فارسی' }).click()
  await expect(page).toHaveURL(/\/fa$/)
  await expect(page.locator('html')).toHaveAttribute('lang', 'fa')
  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl')
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('زیرساخت آماده است')
})

test('serves the Persian shell directly', async ({ page }) => {
  await page.goto('/fa')

  await expect(page.locator('html')).toHaveAttribute('lang', 'fa')
  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl')
  await expect(page.getByRole('link', { name: 'English' })).toHaveAttribute('href', '/en')
})
