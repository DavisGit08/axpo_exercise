import { defineConfig } from '@playwright/test';

export default defineConfig({
    testDir: './tests',
    timeout: 200000,
    expect:{
        timeout:10000
    },
    retries: 3,
    fullyParallel: true,
    workers: 5,
    reporter: [
        ['html', { outputFolder: 'test-results', open: 'always' }]
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
