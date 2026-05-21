const { test, expect } = require('@playwright/test');

test('Browser playwright test', async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.locator("#userEmail").fill("alokgautam7007@gmail.com");
    await page.locator("#userPassword").fill("Kumar@1234");
    await page.locator("[value='Login']").click();
    await page.waitForLoadState('networkidle');



    const CardTitles = await page.locator(".card-body b").allTextContents();
    console.log(CardTitles);






});

