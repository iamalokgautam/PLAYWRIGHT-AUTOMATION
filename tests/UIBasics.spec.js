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

test('Child window handl', async ({ browser }) => {

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

test.only('@Webst Client App login', async ({ page }) => {
    //js file- Login js, DashboardPage
    const email = "anshika@gmail.com";
    const productName = 'ZARA COAT 3';
    const products = page.locator(".card-body");
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").fill("Iamking@000");
    await page.locator("[value='Login']").click();
    await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor();
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);

    const count = await products.count();
    for (let i = 0; i < count; ++i) {
        if (await products.nth(i).locator("b").textContent() === productName) {
            //add to cart
            await products.nth(i).locator("text= Add To Cart").click();
            break;
        }
    }

    await page.locator("[routerlink*='cart']").click();
    //await page.pause();

    await page.locator("div li").first().waitFor();
    const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
    expect(bool).toBeTruthy();
    await page.locator("text=Checkout").click();

    await page.locator("[placeholder*='Country']").pressSequentially("ind", { delay: 150 });
    const dropdown = page.locator(".ta-results");
    await dropdown.waitFor();
    const optionsCount = await dropdown.locator("button").count();
    for (let i = 0; i < optionsCount; ++i) {
        const text = await dropdown.locator("button").nth(i).textContent();
        if (text === " India") {
            await dropdown.locator("button").nth(i).click();
            break;
        }
    }

    expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
    await page.locator(".action__submit").click();
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(orderId);

    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");


    for (let i = 0; i < await rows.count(); ++i) {
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        if (orderId.includes(rowOrderId)) {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }
    const orderIdDetails = await page.locator(".col-text").textContent();
    expect(orderId.includes(orderIdDetails)).toBeTruthy();

});



















