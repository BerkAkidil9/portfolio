import { test as base, expect } from '@playwright/test';

export const test = base.extend({
  page: async ({ page }, runTest) => {
    const errors = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await runTest(page);
    expect(errors, 'The page should not throw uncaught runtime errors').toEqual([]);
  },
});

export { expect };

export async function openNavigation(page) {
  const toggle = page.getByRole('button', { name: 'Toggle navigation menu' });
  if (await toggle.isVisible()) {
    await toggle.click();
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  }
  return page.getByRole('navigation', { name: 'Primary navigation' });
}
