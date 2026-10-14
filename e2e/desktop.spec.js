import { test, expect } from './fixtures.js';

test('desktop navigation reaches every portfolio section', async ({ page }) => {
  await page.goto('/');
  const navigation = page.getByRole('navigation', { name: 'Primary navigation' });
  await expect(page.getByRole('button', { name: 'Toggle navigation menu' })).toBeHidden();
  for (const [label, id] of [
    ['Projects', 'projects'], ['Skills', 'skills'], ['About', 'about'],
    ['Experience', 'experience'], ['Contact', 'contact'], ['Home', 'home'],
  ]) {
    await navigation.getByRole('link', { name: label, exact: true }).click();
    await expect(page).toHaveURL(new RegExp(`#${id}$`));
    await expect(page.locator(`#${id}`)).toBeInViewport();
  }
});
