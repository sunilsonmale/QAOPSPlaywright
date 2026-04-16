

import { test, expect, request } from '@playwright/test';



import { APIUtils } from '../utils_ts/APIUtils';

const country = "Antarctica";
const productId = "6960eac0c941646b7a8b3e68";


const orderPayload = { orders: [{ country: country, productOrderedId: productId }] };
const loginPayload = { userEmail: "truptisonmale@gmail.com", userPassword: "Advik@123" };





//let token;





let token, orderIdarr, message, orderId;

let response: { token: string, orderId: string };

//const country = "India";

test.beforeAll(async () => {


    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginPayload);

    //place order using api

    response = await apiUtils.createOrder(orderPayload);

    console.log(response);

});


test("webapi testing place order", async ({ page }) => {




    page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, response.token

    );


    const productName = "ZARA COAT 3";

    const userName = "truptisonmale@gmail.com";

    const cardTitles = page.locator(".card-body b");








    await page.goto("https://rahulshettyacademy.com/client");

    await page.locator(".card-body b").first().waitFor();

    await page.locator("button[routerlink*=myorders]").click();

    await expect(page.locator("h1")).toContainText("Your Orders");

    await expect(page.locator("h1")).toHaveText("Your Orders");


    const orders = page.locator("table tbody tr");

    const orderCount = await page.locator("table tbody tr").count();

    for (let xx = 0; xx < orderCount; xx++) {

        const tableOrderId = await orders.nth(xx).locator("th").textContent();

        console.log(" table :: " + await orders.nth(xx).locator("th").textContent());

        console.log("saved " + orderId);

        console.log(await orders.nth(xx).locator("th").textContent() === orderId);

        if (await orders.nth(xx).locator("th").textContent() === response.orderId) {

            console.log("inside if" + " loop no :: " + xx);

            await orders.nth(xx).locator("td button:has-text('View')").click();




            break;
        }
    }



    await expect(page.locator("small+div")).toHaveText(response.orderId);

    console.log(true);


    await expect(page.locator("div.address p").first()).toHaveText(userName);

    console.log(true);

    await expect(page.locator("div.address p").nth(1)).toContainText(country);

    console.log(true);

    await expect(page.locator("div.title")).toContainText(productName);

    console.log(true);


});