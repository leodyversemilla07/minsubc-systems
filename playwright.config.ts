import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './tests/e2e',
    fullyParallel: false,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 1 : 0,
    workers: process.env.CI ? 1 : 1,
    reporter: process.env.CI ? 'github' : 'html',
    timeout: 60000,
    expect: { timeout: 10000 },
    use: {
        baseURL: process.env.APP_URL || 'http://localhost:8000',
        trace: process.env.CI ? 'on-first-retry' : 'on',
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
    },
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
    ],
    webServer: process.env.CI
        ? {
              command: 'php artisan serve --port=8000 & npm run dev -- --port=5173',
              port: 8000,
              reuseExistingServer: false,
              timeout: 120000,
          }
        : undefined,
});