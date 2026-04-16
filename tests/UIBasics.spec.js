
const { test, expect } = require('@playwright/test');




test('first pw test context and page', async ({ browser }) => {
  const context = await browser.newContext();

  const page = await context.newPage();

  //page.route('**/*.{jpg, pnj, jpeg}',route=> route.abort());


  const userName = page.locator("input#username");
  const password = page.locator("[name='password']");
  const signInBtn = page.locator("input#signInBtn");
  const cardTitles = page.locator(".card-body .card-title a");

  //page.on('request', request => console.log(request.url()));
  //page.on('response', response => console.log(response.status() + '' + response.body()));



  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");


  let title = await page.title();

  console.log(title);

  await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");

  await userName.fill("rahulshetty");

  await password.fill("learning");

  await signInBtn.click();


  await expect(page.locator("[class='alert alert-danger col-md-12'][style*='block']")).toContainText("Incorrect username/password.");


  await userName.fill("");

  await userName.fill("rahulshettyacademy");

  await password.fill("Learning@830$3mK2");




  await signInBtn.click();

  await page.waitForLoadState("networkidle");
  await page.waitForLoadState("domcontentloaded");
  await page.waitForLoadState("load");

  await page.pause();


  //await page.waitForTimeout(5000);

  /*  console.log(await cardTitles.first().textContent());
 
   console.log(await cardTitles.last().textContent());
 
   console.log(await cardTitles.nth(0).textContent());
 
    console.log(await cardTitles.nth(1).textContent());
 
    console.log(await cardTitles.nth(2).textContent());
 
    console.log(await cardTitles.nth(3).textContent());*/

  const allTitles = await cardTitles.allTextContents();

  console.log(allTitles);



});

test('without context page usage', async ({ page }) => {

  await page.goto("https://google.com");

  let title = await page.title();

  console.log(title);

  await expect(page).toHaveTitle("Google");

});


test('UI controls', async ({ page }) => {

  const userName = page.locator("input#username");
  const password = page.locator("[name='password']");
  const signInBtn = page.locator("input#signInBtn");
  const dropdown = page.locator("select.form-control");
  const blinkText = page.locator("a[href*='documents-request']");


  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

  await userName.fill("rahulshettyacademy");

  await password.fill("Learning@830$3mK2");

  await dropdown.selectOption("consult");

  await page.locator(".checkmark").nth(1).click();

  await page.locator("#okayBtn").click();

  console.log(page.locator(".checkmark").last().isChecked);

  await expect(page.locator(".checkmark").last()).toBeChecked();

  await page.locator("#terms").click();

  await expect(page.locator("#terms").last()).toBeChecked();

  await page.locator("#terms").uncheck();

  expect(await page.locator("#terms").isChecked()).toBeFalsy();

  await expect(blinkText).toHaveAttribute("class", "blinkingText");

  // await page.pause();


});

test('Child window handling', async ({ browser }) => {





  const context = await browser.newContext();

  const page = await context.newPage();

  const blinkText = page.locator("a[href*='documents-request']");

  const userName = page.locator("input#username");
  const password = page.locator("[name='password']");


  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");


  const [newPage] = await Promise.all([
    context.waitForEvent("page"),  //listen for new page ;; pending, rejected, fulfilled ... states of promise

    blinkText.click(),
  ]
  )

  const text = await newPage.locator(".red").textContent();

  console.log(text);

  const splittext = text.split("@");

  console.log(splittext[1])

  const userd = splittext[1].split(" ");

  const userN = userd[0];

  console.log("hello  " + userd[0])

  // console.log(userd[0]);

  await page.locator("input#username").fill(userN);

  await page.pause();

  console.log(await page.locator("input#username").inputValue());





});