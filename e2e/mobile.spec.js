import { test, expect } from './fixtures.js';

test('mobile menu opens and closes with Escape, releasing page scrolling', async ({ page }) => {
  await page.goto('/');
  const toggle = page.getByRole('button', { name: 'Toggle navigation menu' });
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await toggle.click();
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  await expect(page.locator('body')).toHaveCSS('overflow', 'hidden');
  await page.keyboard.press('Escape');
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await expect(page.locator('body')).not.toHaveCSS('overflow', 'hidden');
});

test('mobile navigation reaches each section and closes after selecting a link', async ({ page }) => {
  await page.goto('/');
  const toggle = page.getByRole('button', { name: 'Toggle navigation menu' });
  const navigation = page.getByRole('navigation', { name: 'Primary navigation' });
  for (const [label, id] of [
    ['Projects', 'projects'], ['Skills', 'skills'], ['About', 'about'],
    ['Experience', 'experience'], ['Contact', 'contact'], ['Home', 'home'],
  ]) {
    await toggle.click();
    await navigation.getByRole('link', { name: label, exact: true }).click();
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await expect(page).toHaveURL(new RegExp(`#${id}$`));
    await expect(page.locator(`#${id}`)).toBeInViewport();
    await expect(page.locator('body')).not.toHaveCSS('overflow', 'hidden');
  }
});
