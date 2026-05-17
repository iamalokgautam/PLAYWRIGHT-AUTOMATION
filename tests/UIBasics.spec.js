const { test, expect } = require('@playwright/test');

test('Browser playwright test', async ({ browser }) => {
    const context = await browser.newContext()
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/practice");

});

test('Page playwright test', async ({ page }) => {

    await page.goto("https://google.com");
    console.log(await page.title());
    await expect(page).toHaveTitle('Google');

});