const { test, expect } = require('@playwright/test');

test.only('Browser playwright test', async ({ browser }) => {


    const context = await browser.newContext()
    const page = await context.newPage();
    const userName = page.locator('#username');
    const password = page.locator("[type='password']");
    const SignIn = page.locator("#signInBtn");
    const cardTitles = page.locator(".card-body a");
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    //CSS

    await userName.fill("rahulshetty");
    await password.fill("Learning@830$3mK2");
    await SignIn.click();
    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText("Incorrect");
    await userName.fill("");
    await userName.fill("rahulshettyacademy");
    await SignIn.click();

    console.log(await cardTitles.nth(0).textContent());
    console.log(await cardTitles.last().textContent());
    console.log(await cardTitles.allTextContents());




});

test('Page playwright test', async ({ page }) => {

    await page.goto("https://google.com");
    console.log(await page.title());
    await expect(page).toHaveTitle('Google');

});