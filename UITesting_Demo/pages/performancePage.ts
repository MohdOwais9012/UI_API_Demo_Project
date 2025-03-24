import { Page } from '@playwright/test';

export class PerformancePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async measurePageLoadTime(url: string): Promise<number> {
    const startTime = performance.now();
    await this.page.goto(url);
    const endTime = performance.now();
    return endTime - startTime;
  }

  async measureFCP(): Promise<number> {
    const metrics = await this.page.evaluate(() => JSON.stringify(performance.getEntriesByType('navigation')));
    const navTiming = JSON.parse(metrics)[0];
    return navTiming.domContentLoadedEventEnd;
  }


  async measureJsExecutionTime(): Promise<number> {
    return await this.page.evaluate(() => {
      performance.mark('start-script');

      for (let i = 0; i < 1e6; i++) { Math.sqrt(i); }

      performance.mark('end-script');
      performance.measure('script-execution', 'start-script', 'end-script');
      return performance.getEntriesByName('script-execution')[0].duration;
    });
  }
}
