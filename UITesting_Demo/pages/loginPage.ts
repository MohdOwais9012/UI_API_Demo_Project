import { firefox, Page, Browser } from '@playwright/test';
import auth from "../authentication.json"

export class LoginPage {
  private page: Page;
  private browser!: Browser; 

  constructor(page: Page) {
    this.page = page;
  }

  private userNameField = () => this.page.locator('#loginusername');
  private passwordField = () => this.page.locator('#loginpassword');
  private loginButton = () => this.page.locator('text="Log in"').nth(1);
  private loginTab = () => this.page.locator('text="Log in"').nth(2);

  async launchFirefox() {
    this.browser = await firefox.launch();
    this.page = await this.browser.newPage();
    return this.page;
  }

  async navigateToLoginPage() {
    if (!this.page) {
      await this.launchFirefox();
    }
    await this.page.goto(auth.url);
    await this.page.waitForTimeout(3000);
  }

  async login(username: string, password: string) {
    await this.loginTab().click();
    await this.userNameField().fill(username);
    await this.passwordField().fill(password);
    await this.loginButton().click();
    await this.page.waitForTimeout(3000);
  }

  async close() {
    await this.browser.close();
  }
}
