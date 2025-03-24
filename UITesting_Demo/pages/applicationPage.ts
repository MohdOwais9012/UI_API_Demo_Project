import { Page } from '@playwright/test';
import { LoginPage } from './loginPage';
import { DashboardPage } from './dashboardPage';
import { LogoutPage } from './logoutPage';

export class applicationPage {
    readonly loginPage: LoginPage;
    readonly dashboardPage: DashboardPage;
    readonly logoutPage: LogoutPage;

    constructor(page: Page) {
        this.loginPage = new LoginPage(page);
        this.dashboardPage = new DashboardPage(page);
        this.logoutPage = new LogoutPage(page);
    }
}
