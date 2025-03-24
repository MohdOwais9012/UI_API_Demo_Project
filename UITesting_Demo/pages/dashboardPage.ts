import { Page } from '@playwright/test';

export class DashboardPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  private contactTab = () => this.page.locator('xpath=//a[text()="Contact"]');
  private aboutUsTab = () => this.page.locator('xpath=//a[text()="About us"]');
  private homeTab = () => this.page.locator('xpath=//a[text()="Home "]');
  private closeButton = () => this.page.locator('xpath=(//button[text()="Close"])[1]');
  private closeAboutUsButton = () => this.page.locator('xpath=(//button[text()="Close"])[4]');

  async ClickOnTabs() {
    await this.contactTab().click();
    await this.closeButton().click();
    await this.aboutUsTab().click();
    await this.closeAboutUsButton().click();
    await this.homeTab().click();
  }
}
