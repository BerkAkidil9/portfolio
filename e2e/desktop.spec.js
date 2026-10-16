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
    await expect(navigation.getByRole('link', { name: label, exact: true }))
      .toHaveAttribute('aria-current', 'page');
    await expect.poll(() => page.locator('header').evaluate((header) => header.getBoundingClientRect().top))
      .toBe(0);
  }
});

test('keeps Projects active while scrolling through the long section and returning to its start', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'View projects', exact: true }).click();
  const activeLink = page.getByRole('navigation', { name: 'Primary navigation' })
    .getByRole('link', { name: 'Projects', exact: true });
  await expect(activeLink).toHaveAttribute('aria-current', 'page');
  await page.locator('#projects article').last().scrollIntoViewIfNeeded();
  await expect(activeLink).toHaveAttribute('aria-current', 'page');
  await page.locator('#skills').scrollIntoViewIfNeeded();
  await expect(activeLink).not.toHaveAttribute('aria-current', 'page');
  await page.locator('#projects').evaluate((section) => section.scrollIntoView());
  await expect(activeLink).toHaveAttribute('aria-current', 'page');
});
