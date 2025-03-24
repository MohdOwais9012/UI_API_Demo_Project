import { Page } from '@playwright/test';

export class LogoutPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  private logOutTab = () => this.page.locator('#logout2');

  async ClickOnLogOutTab() {
    await this.logOutTab().click();
  }
}
