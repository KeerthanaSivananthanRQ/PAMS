import { Page, expect } from '@playwright/test';

export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async waitForPage() {
    await this.page.waitForLoadState('networkidle');
  }
}