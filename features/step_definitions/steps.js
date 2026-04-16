const assert = require('assert');
const { When, Then, Given } = require('@cucumber/cucumber');
const { expect, playwright } = require('@playwright/test');

const { chromium } = require('playwright');




Given('Login to Ecommerce app with {string} and {string}', { timeout: 100 * 1000 }, async function (username, password) {
    // Write code here that turns the phrase above into concrete actions

    this.username = username;
    this.password = password;


    this.browser = await chromium.launch({

        headless: false

    });


    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();

    this.cardTitles = this.page.locator(".card-body b");

    this.country = "India";
    this.productName = "ZARA COAT 3";

    await this.page.goto("https://rahulshettyacademy.com/client");


    this.title = await this.page.title();

    console.log(this.title);

    await expect(this.page).toHaveTitle("Let's Shop");

    await this.page.locator("#userEmail").fill(username);

    await this.page.locator("#userPassword").fill(password);

    await this.page.locator("#login").click();


    await this.page.waitForLoadState("networkidle");

    await this.page.locator(".card-body b").first().waitFor();

    //return 'pending';
});

When('Add {string} to cart', async function (string) {
    // Write code here that turns the phrase above into concrete actions


    this.allTitles = await this.cardTitles.allTextContents();

    console.log(this.allTitles);

    const products = this.page.locator(".card-body");

    const count = await products.count();

    for (let i = 0; i < count; ++i) {

        console.log("i= " + i + " " + await products.nth(i).locator("b").textContent());

        if (await products.nth(i).locator("b").textContent() === this.productName) {

            await products.nth(i).locator("button.btn.w-10.rounded").click();

            //await page.pause();

            break;

        }


    }

    //await page.pause();

    await this.page.locator("button[routerlink*='cart']").click();

    await this.page.locator("div li").first().waitFor();
});


Then('Verify {string} is displayed in cart', async function (string) {
    // Write code here that turns the phrase above into concrete actions


    await this.page.locator("div li").first().waitFor();


    expect(this.page.locator("h3:has-text('" + this.productName + "')").isVisible()).toBeTruthy();


});

When('Enter valid details and place the order', async function () {
    // Write code here that turns the phrase above into concrete actions

    await this.page.locator("text=Checkout").click();


    await this.page.locator("input.input.txt").nth(1).fill("825");

    await this.page.locator("input.input.txt").nth(2).fill("Sunil Sonmale");





    this.useremail = await this.page.locator("div.details__user label").textContent();

    console.log("hi 01:" + this.useremail);

    console.log("hi 01:" + this.username);

    expect(this.useremail == this.username).toBeTruthy();

    console.log("hi 02:" + this.useremail);

    // console.log(useremail);

    await this.page.locator("[placeholder='Select Country']").pressSequentially("India", { delay: 200 });

    await this.page.locator("section.ta-results.list-group.ng-star-inserted").waitFor();

    const suggestions = this.page.locator(".ta-item.list-group-item.ng-star-inserted");

    const suggestionCount = await this.page.locator(".ta-item.list-group-item.ng-star-inserted").count();

    console.log("suggestionCount " + suggestionCount)



    for (let ii = 0; ii < suggestionCount; ii++) {

        console.log("outside if " + ii);

        let text = await suggestions.nth(ii).textContent();
        console.log(text);

        if (text === " " + this.country) {

            console.log("inside :: " + ii);

            //console.log("inside " + await suggestions.nth(ii).textContent());

            await suggestions.nth(ii).click();

            break;

        }

    }



    await this.page.locator(".action__submit").click();

    await expect(this.page.locator("h1")).toHaveText("Thankyou for the order.");

    //await page.pause();

    this.orderId = await this.page.locator("tr td label.ng-star-inserted").textContent();

    console.log(this.orderId);

    this.orderId = this.orderId.replaceAll("|", "");

    this.orderId = this.orderId.trim();

    console.log(this.orderId);


});

Then('Verify order details from order history page', async function () {
    // Write code here that turns the phrase above into concrete actions



    await this.page.locator("button[routerlink*=myorders]").click();

    await expect(this.page.locator("h1")).toContainText("Your Orders");

    await expect(this.page.locator("h1")).toHaveText("Your Orders");


    const orders = this.page.locator("table tbody tr");

    const orderCount = await this.page.locator("table tbody tr").count();

    for (let xx = 0; xx < orderCount; xx++) {

        const tableOrderId = await orders.nth(xx).locator("th").textContent();

        console.log(" table :: " + await orders.nth(xx).locator("th").textContent());

        console.log("saved " + this.orderId);

        console.log(await orders.nth(xx).locator("th").textContent() === this.orderId);

        if (await orders.nth(xx).locator("th").textContent() === this.orderId) {

            console.log("inside if" + " loop no :: " + xx);

            await orders.nth(xx).locator("td button:has-text('View')").click();

            // await page.pause();


            break;
        }
    }



    await expect(this.page.locator("small+div")).toHaveText(this.orderId);

    console.log(true);


    await expect(this.page.locator("div.address p").first()).toHaveText(this.username);

    console.log(true);

    await expect(this.page.locator("div.address p").nth(1)).toContainText(this.country);

    console.log(true);

    await expect(this.page.locator("div.title")).toContainText(this.productName);

    console.log(true);


    
});