import { test, expect, openNavigation } from './fixtures.js';

test('loads the portfolio and keeps content usable with reduced motion', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Berk Akidil/);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Software Engineer');
  await expect(page.getByRole('button', { name: 'Skip intro' })).toHaveCount(0);
  await page.getByRole('link', { name: 'View projects', exact: true }).click();
  await expect(page).toHaveURL(/#projects$/);
  await expect(page.locator('#projects')).toBeInViewport();
});

test('navigates from the hero to contact details', async ({ page }) => {
  await page.goto('/');
  await page.locator('#home').getByRole('link', { name: 'Contact', exact: true }).click();
  await expect(page).toHaveURL(/#contact$/);
  await expect(page.locator('#contact')).toBeInViewport();
  await expect(page.locator('#contact').getByRole('link', { name: 'berkakidil9@gmail.com' }))
    .toHaveAttribute('href', 'mailto:berkakidil9@gmail.com');
});

test('returns home through the navigation brand', async ({ page }) => {
  await page.goto('/#contact');
  await page.getByRole('navigation').getByRole('link', { name: 'Berk Akidil', exact: true }).click();
  await expect(page).toHaveURL(/#home$/);
  await expect(page.locator('#home')).toBeInViewport();
});

test('loads every displayed project screenshot', async ({ page }) => {
  await page.goto('/#projects');
  const images = page.locator('#projects article img');
  expect(await images.count()).toBeGreaterThan(0);
  for (const image of await images.all()) {
    await expect.poll(() => image.evaluate((element) => element.complete && element.naturalWidth > 0))
      .toBe(true);
  }
});

test('opens a project screenshot and closes it with the close button', async ({ page }) => {
  await page.goto('/#projects');
  await page.getByRole('button', { name: 'View larger screenshot for Multi-Tenant CRM Platform' }).click();
  const dialog = page.getByRole('dialog', { name: 'Multi-Tenant CRM Platform screenshot preview' });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole('img')).toBeVisible();
  await expect(page.locator('body')).toHaveCSS('overflow', 'hidden');
  // Clicking the enlarged image must not dismiss the preview.
  await dialog.getByRole('img').click();
  await expect(dialog).toBeVisible();
  await dialog.getByRole('button', { name: 'Close screenshot preview' }).click();
  await expect(dialog).toHaveCount(0);
  await expect(page.locator('body')).not.toHaveCSS('overflow', 'hidden');
});

test('closes a project screenshot with Escape', async ({ page }) => {
  await page.goto('/#projects');
  await page.getByRole('button', { name: 'View larger screenshot for Swim Center' }).click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await expect(page.locator('body')).not.toHaveCSS('overflow', 'hidden');
});

test('opens a live project in a separate tab', async ({ page, context }) => {
  // Validate the outgoing navigation without depending on the external site's uptime.
  await context.route('https://lineupnest.com/**', (route) => route.fulfill({
    contentType: 'text/html', body: '<p>Project destination</p>',
  }));
  await page.goto('/#projects');
  const card = page.locator('#projects article').filter({
    has: page.getByRole('heading', { name: 'LineupNest — Football Squad Builder', exact: true }),
  });
  const link = card.getByRole('link', { name: 'Live demo', exact: true });
  await expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  const popupPromise = page.waitForEvent('popup');
  await link.click();
  const popup = await popupPromise;
  await expect(popup).toHaveURL('https://lineupnest.com/');
  await expect(page).toHaveURL(/#projects$/);
  await popup.close();
});

test('serves the linked CV as a real PDF', async ({ page, request }) => {
  await page.goto('/#contact');
  const cv = page.locator('#contact').getByRole('link', { name: 'CV', exact: true });
  await expect(cv).toHaveAttribute('target', '_blank');
  const response = await request.get(await cv.getAttribute('href'));
  expect(response.ok()).toBe(true);
  expect(response.headers()['content-type']).toContain('application/pdf');
  expect((await response.body()).subarray(0, 5).toString()).toBe('%PDF-');
});

test('opens source code from the navigation in a separate tab', async ({ page, context }) => {
  await context.route('https://github.com/BerkAkidil9/portfolio', (route) => route.fulfill({
    contentType: 'text/html', body: '<p>Repository destination</p>',
  }));
  await page.goto('/');
  const navigation = await openNavigation(page);
  const popupPromise = page.waitForEvent('popup');
  await navigation.getByRole('link', { name: 'Source Code', exact: true }).click();
  const popup = await popupPromise;
  await expect(popup).toHaveURL('https://github.com/BerkAkidil9/portfolio');
  await expect(page.locator('#home')).toBeInViewport();
  await popup.close();
});
