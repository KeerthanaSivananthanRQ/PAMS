import { chromium } from '@playwright/test';

export default async function globalSetup() {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://hon-orange-jellyfish.rootquotient.revolte.io/auth/login');
  await page.fill('input[name="email"]', 'kautomation@yopmail.com');
  await page.fill('input[name="password"]', 'Password123!');
  await page.click('button:has-text("Login")');

  await page.waitForLoadState('networkidle');

  await context.storageState({ path: 'auth.json' });
  await browser.close();
}

