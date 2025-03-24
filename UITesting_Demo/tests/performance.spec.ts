import { test, expect } from '@playwright/test';
import { PerformancePage } from '../pages/performancePage';
import auth from "../authentication.json";

test.describe('Performance Testing', () => {
  let perfPage: PerformancePage;

  test.beforeEach(async ({ page }) => {
    perfPage = new PerformancePage(page);
  });

  test('Measure Page Load Time', async ({ page }) => {
    const loadTime = await perfPage.measurePageLoadTime(auth.demoBlazeURL);
    console.log(`⏳ Page Load Time: ${loadTime}ms`);
    expect(loadTime).toBeLessThan(5000); 
  });

  test('Measure API Response Time', async ({ request }) => {
    const startTime = Date.now();
    const response = await request.get(auth.herokuURL);
    const endTime = Date.now();

    const responseTime = endTime - startTime;
    console.log(`⏳ API Response Time: ${responseTime}ms`);
    expect(responseTime).toBeLessThan(2000); 
  });

  test('Measure First Contentful Paint (FCP)', async () => {
    const fcpTime = await perfPage.measureFCP();
    console.log(`⏳ First Contentful Paint (FCP): ${fcpTime}ms`);
    expect(fcpTime).toBeLessThan(2000); 
  });

  test('Measure JavaScript Execution Time', async () => {
    const jsExecutionTime = await perfPage.measureJsExecutionTime();
    console.log(`⏳ JavaScript Execution Time: ${jsExecutionTime}ms`);
    expect(jsExecutionTime).toBeLessThan(1000); 
  });
});
