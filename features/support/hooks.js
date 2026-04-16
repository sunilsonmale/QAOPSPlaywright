const { Before, After } = require('@cucumber/cucumber');

const { chromium } = require('playwright');



Before({ name: "before test method" },async function () {

    this.browser = await chromium.launch({

        headless: false

    });


    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();


});


After({ name: "cleanup" },async function () {

    console.log("i will be last to execute");


});
