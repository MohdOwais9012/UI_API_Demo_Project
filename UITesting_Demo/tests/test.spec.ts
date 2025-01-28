import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { DashboardPage } from '../pages/dashboardPage';
import { LogoutPage } from '../pages/logoutPage';
import auth from "../authentication.json";
import { applicationPage } from "../pages/applicationPage";

let loginPage: LoginPage;
let dashboardPage: DashboardPage;
let logOut: LogoutPage;


test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  dashboardPage = new DashboardPage(page);
  logOut = new LogoutPage(page);

  await loginPage.navigateToLoginPage();
  await loginPage.login(auth.email, auth.password);
});

test('Test Case 1 : Log In', async () => {
  await dashboardPage.ClickOnTabs();
});

test('Test Case 2 : Click on all the Tabs', async () => {
  await dashboardPage.ClickOnTabs();
});

test('Test Case 3 : Log Out', async () => {
  await logOut.ClickOnLogOutTab();
});
