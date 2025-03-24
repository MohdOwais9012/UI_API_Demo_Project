import { test, expect } from '@playwright/test';
import { applicationPage } from '../pages/applicationPage';
import auth from "../authentication.json";
import { sendEmailWithReport } from '../utils/email';
import { sendTeamsMessage } from '../utils/teamsNotifier';
import fs from 'fs';
import path from 'path';

let app: applicationPage;

test.beforeEach(async ({ page }) => { 
  app = new applicationPage(page);

  await app.loginPage.navigateToLoginPage();
  await app.loginPage.login(auth.email, auth.password);
});

test('Test Case 1: Log In', async () => {
  await app.dashboardPage.ClickOnTabs();
});

test('Test Case 2: Click on all the Tabs', async () => {
  await app.dashboardPage.ClickOnTabs();
});

test('Test Case 3: Log Out', async () => {
  await app.logoutPage.ClickOnLogOutTab();
});

test.afterAll(async () => {
  const reportPath = path.join('html-report', 'index.html');

  const absoluteReportPath = path.resolve(reportPath);

  if (fs.existsSync(absoluteReportPath) && fs.statSync(absoluteReportPath).size > 0) {
    console.log('✅ Report found. Sending via email...');
    await sendEmailWithReport(absoluteReportPath);  
    await sendTeamsMessage('✅ Playwright Test Execution Completed. Check your email for the full report.');
  } else {
    console.error('❌ Report Generation Failed: The Playwright report could not be generated.');
    await sendTeamsMessage('❌ Playwright Test Execution Failed. Report was not generated.');
  }
});
