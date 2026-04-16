
//const { test, expect } = require('@playwright/test');

import{test, expect} from '@playwright/test';
import testData from "../utils/placeOrderData.json";

//convert json >>> string >>> js object

//const data = JSON.parse(JSON.stringify(import testData from ("../utils/placeOrderData.json")));
const data = JSON.parse(JSON.stringify(testData));

for (const testData of data) { 

test(`@web rahul academy page wait ${testData.productName}`, async ({ page }) => {


  //const productName = "ZARA COAT 3";
  //const password = "Advik@123";

  //const userName = "truptisonmale@gmail.com";

  const cardTitles = page.locator(".card-body b");

  const country = "India";

  //const products = page.locator()



  await page.goto("https://rahulshettyacademy.com/client");


  let title = await page.title();

  console.log(title);

  await expect(page).toHaveTitle("Let's Shop");

  await page.locator("#userEmail").fill(testData.userName);

  await page.locator("#userPassword").fill(testData.password);

  await page.locator("#login").click();


  await page.waitForLoadState("networkidle");

  await page.locator(".card-body b").first().waitFor();

  const allTitles = await cardTitles.allTextContents();

  console.log(allTitles);

  const products = page.locator(".card-body");

  const count = await products.count();

  for (let i = 0; i < count; ++i) {

    console.log("i= " + i + " " + await products.nth(i).locator("b").textContent());

    if (await products.nth(i).locator("b").textContent() === testData.productName) {

      await products.nth(i).locator("button.btn.w-10.rounded").click();

      //await page.pause();

      break;

    }


  }

  //await page.pause();

  await page.locator("button[routerlink*='cart']").click();

  await page.locator("div li").first().waitFor();


  expect(page.locator("h3:has-text('" + testData.productName + "')").isVisible()).toBeTruthy();

  //await page.pause();

  await page.locator("text=Checkout").click();


  await page.locator("input.input.txt").nth(1).fill("825");

  await page.locator("input.input.txt").nth(2).fill("Sunil Sonmale");

  //await page.locator("[name='coupon']").fill("rahulshettyacademy");

  //await page.locator("button:has-text('Apply Coupon')").click();



  const useremail = await page.locator("div.details__user label").textContent();

  console.log(useremail);

  expect(useremail == testData.userName).toBeTruthy();

  // console.log(useremail);

  await page.locator("[placeholder='Select Country']").pressSequentially("India", { delay: 200 });

  await page.locator("section.ta-results.list-group.ng-star-inserted").waitFor();

  const suggestions = page.locator(".ta-item.list-group-item.ng-star-inserted");

  const suggestionCount = await page.locator(".ta-item.list-group-item.ng-star-inserted").count();

  console.log("suggestionCount " + suggestionCount)



  for (let ii = 0; ii < suggestionCount; ii++) {

    console.log("outside if " + ii);

    let text = await suggestions.nth(ii).textContent();
    console.log(text);

    if (text === " " + country) {

      console.log("inside :: " + ii);

      //console.log("inside " + await suggestions.nth(ii).textContent());

      await suggestions.nth(ii).click();

      break;

    }

  }



  await page.locator(".action__submit").click();

  await expect(page.locator("h1")).toHaveText("Thankyou for the order.");

  //await page.pause();

  let orderId :  any= await page.locator("tr td label.ng-star-inserted").textContent();

  console.log(orderId);

  //let orderId: string | null;

  orderId = orderId.replaceAll("|", "");

  orderId = orderId.trim();

  console.log(orderId);

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

    if (await orders.nth(xx).locator("th").textContent() === orderId) {

      console.log("inside if" + " loop no :: " + xx);

      await orders.nth(xx).locator("td button:has-text('View')").click();

      // await page.pause();


      break;
    }
  }



  await expect(page.locator("small+div")).toHaveText(orderId);

  console.log(true);


  await expect(page.locator("div.address p").first()).toHaveText(testData.userName);

  console.log(true);

  await expect(page.locator("div.address p").nth(1)).toContainText(country);

  console.log(true);

  await expect(page.locator("div.title")).toContainText(testData.productName);

  console.log(true);

});

}

