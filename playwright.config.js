import { defineConfig } from '@playwright/test';

export default defineConfig({
    testDir: './tests',
    timeout: 20000,
    retries: 2,
    fullyParallel: true,
    workers: 5,
    reporter: [
        ['json', { outputFile: 'output/json-results/results.json' }],
        ['html', { outputFolder: 'output/html-results', open: 'never' }],
        ['line']
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
