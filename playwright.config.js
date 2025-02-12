import { defineConfig } from '@playwright/test';

export default defineConfig({
    testDir: './tests',
    timeout: 40000,
    retries: 1,
    fullyParallel: true,
    workers: 1,
    reporter: [
        ['html', { outputFolder: 'output/html-results', open: 'on-failure' }]
    ],
    use: {
        headless: false, 
        viewport: null,
        launchOptions: {
        args: [
            "--disable-blink-features=AutomationControlled",
            "--disable-infobars", // This is the key for avoiding captcha!! finally got it!!
            "--start-maximized"
        ]
        },
        contextOptions: { javaScriptEnabled: true },
        beforeEach: async ({ page }) => {
        await page.addInitScript(() => {
            Object.defineProperty(navigator, 'webdriver', { get: () => false });
        });
        },
    },

});
