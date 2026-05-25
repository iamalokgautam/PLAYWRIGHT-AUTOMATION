const { test, expect } = require('@playwright/test');
const { text } = require('node:stream/consumers');

test('Browser playwright test', async ({ browser }) => {


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

test('UI Controles', async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const userName = page.locator('#username');
    const password = page.locator("[type='password']");
    const dropdown = page.locator("select.form-control");

    await dropdown.selectOption("consult");
    await page.locator(".radiotextsty").last().click();
    await page.locator("#okayBtn").click();
    //await page.pause();
    await expect(page.locator(".radiotextsty").last()).toBeChecked();
    console.log(await page.locator(".radiotextsty").last().isChecked()); //true
    await page.locator("#terms").click();
    await expect(page.locator("#terms")).toBeChecked();
    await page.locator("#terms").uncheck();
    expect(await page.locator("#terms").isChecked()).toBeFalsy();






});

test.only('Child window handl', async ({ browser }) => {

    const context = await browser.newContext()
    const page = await context.newPage();
    const userName = page.locator('#username');

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentLink = page.locator("[href*='documents-request']");


    const [newPage] = await Promise.all(
        [context.waitForEvent('page'),
        documentLink.click(),]
    )

    const text = await newPage.locator(".red").textContent();
    const arrText = text.split("@");
    const domain = arrText[1].split(" ")[0]
    console.log(domain);
    await userName.fill(domain);
    await page.pause();
    console.log(await userName.textContent());



});