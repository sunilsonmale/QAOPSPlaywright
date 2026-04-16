const { test, expect } = require('@playwright/test');


//test.describe.configure({mode:"serial"});

test("@web popup validations", async ({ page }) => {

        await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
        //await page.goto("https://google.com");

        await expect(page.locator("#displayed-text")).toBeVisible();

        await page.locator("#hide-textbox").click();

        await expect(page.locator("#displayed-text")).toBeHidden();


        // await page.locator("#alertbtn").click();

        //await page.pause();

        page.on('dialog', dialog => dialog.accept());

        await page.locator("#confirmbtn").click();

        await page.locator("#mousehover").hover();

        await page.locator(".mouse-hover-content").scrollIntoViewIfNeeded();

        const topLink = page.locator("#top");

        //await expect(topLink).toBeVisible();



        // await page.locator("div.mouse-hover-content a#top").click();

        const framePage = page.frameLocator("#courses-iframe");

        await framePage.locator("li a", { hasText: "All Access plan" }).click();


        // await page.pause();

    });

test("screenshot and visual comparison", async ({ page }) => {


    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    //await page.goto("https://google.com");

    await expect(page.locator("#displayed-text")).toBeVisible();

    await page.locator(".block.large-row-spacer").nth(2).screenshot({ path: 'beforeelementalSS.png' });

    await page.locator("#hide-textbox").click();

    await page.locator(".block.large-row-spacer").nth(2).screenshot({ path: 'afterelementalSS.png' });

    await page.screenshot({ path: 'Afterss.png' });

    await expect(page.locator("#displayed-text")).toBeHidden();



});

test("visual testing", async ({ page }) => {

    await page.goto("https://www.google.com");
    expect(await page.screenshot()).toMatchSnapshot("landing.png");

});