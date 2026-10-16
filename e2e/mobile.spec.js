import { test, expect } from './fixtures.js';

test('mobile menu opens and closes with Escape, releasing page scrolling', async ({ page }) => {
  await page.goto('/');
  const toggle = page.getByRole('button', { name: 'Toggle navigation menu' });
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await toggle.click();
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  await expect(page.locator('html')).toHaveCSS('overflow', 'hidden');
  await page.keyboard.press('Escape');
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await expect(page.locator('html')).not.toHaveCSS('overflow', 'hidden');
});

test('landscape menu scrolls to its last links without moving the page', async ({ page }) => {
  await page.setViewportSize({ width: 844, height: 390 });
  await page.goto('/');
  await page.getByRole('link', { name: 'View projects', exact: true }).click();
  const initialScroll = await page.evaluate(() => window.scrollY);
  const toggle = page.getByRole('button', { name: 'Toggle navigation menu' });
  await toggle.click();
  const links = page.locator('#primary-navigation');
  await page.mouse.move(400, 200);
  await page.mouse.wheel(0, 600);
  const source = links.getByRole('link', { name: 'Source Code', exact: true });
  await expect(source).toBeInViewport({ ratio: 1 });
  expect(await links.evaluate((menu) => menu.scrollTop)).toBeGreaterThan(0);
  expect(await page.evaluate(() => window.scrollY)).toBe(initialScroll);
  await links.getByRole('link', { name: 'Contact', exact: true }).click();
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await expect(page.locator('#contact')).toBeInViewport();
  const contactScroll = await page.evaluate(() => window.scrollY);
  await page.mouse.move(400, 200);
  await page.mouse.wheel(0, -500);
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeLessThan(contactScroll);
});

test('closed mobile navigation skips hidden links when using Tab', async ({ page }) => {
  await page.goto('/');
  const navigation = page.getByRole('navigation', { name: 'Primary navigation' });
  await navigation.getByRole('link', { name: 'Berk Akidil', exact: true }).focus();
  await page.keyboard.press('Tab');
  const toggle = page.getByRole('button', { name: 'Toggle navigation menu' });
  await expect(toggle).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'View projects', exact: true })).toBeFocused();
  await toggle.click();
  await navigation.getByRole('link', { name: 'Home', exact: true }).focus();
  await page.keyboard.press('Escape');
  await expect(toggle).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'View projects', exact: true })).toBeFocused();
});

test('switching to desktop closes the mobile menu and restores scrolling', async ({ page }) => {
  await page.goto('/');
  const toggle = page.getByRole('button', { name: 'Toggle navigation menu', includeHidden: true });
  await toggle.click();
  await page.setViewportSize({ width: 1440, height: 900 });
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await expect(page.locator('body')).not.toHaveClass(/menu-open/);
  await page.mouse.wheel(0, 500);
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(0);
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
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
    await expect(page.locator('html')).not.toHaveCSS('overflow', 'hidden');
  }
});
