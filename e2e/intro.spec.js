import { test, expect } from './fixtures.js';

test.use({ reducedMotion: 'no-preference' });

test('skips the launch intro and remembers dismissal on reload', async ({ page }) => {
  await page.goto('/');
  const intro = page.getByRole('status', { name: 'Portfolio launch intro' });
  await expect(intro).toBeVisible();
  await page.getByRole('button', { name: 'Skip intro' }).click();
  await expect(intro).toHaveCount(0);
  await expect(page.locator('body')).not.toHaveClass(/launch-intro-open/);
  await page.reload();
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await expect(intro).toHaveCount(0);
});

test('dismisses the launch intro using Escape', async ({ page }) => {
  await page.goto('/');
  const intro = page.getByRole('status', { name: 'Portfolio launch intro' });
  await expect(intro).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(intro).toHaveCount(0);
  await expect(page.locator('body')).not.toHaveClass(/launch-intro-open/);
});
