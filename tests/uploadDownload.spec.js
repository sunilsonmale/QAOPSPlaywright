const { test, expect } = require('@playwright/test');

const ExcelJS = require('exceljs');
const fs = require('fs');



async function writeExcelTest(searchText, replaceText, change, filePath) {



    const workbook = new ExcelJS.Workbook();

    await workbook.xlsx.readFile(filePath)


    //.then(function()

    const sheet = workbook.getWorksheet(1);

    const cellCoord = await readExcel(sheet, searchText);

    let cell = sheet.getCell(cellCoord.row + change.rowChange, cellCoord.column + change.columnChange);

    cell.value = replaceText;

    await workbook.xlsx.writeFile(filePath);

    // ensure file is stable
    await new Promise(resolve => setTimeout(resolve, 500));


    console.log("File size:", fs.statSync(filePath).size);



}


async function readExcel(sheet, searchText) {

    let cellCoord = { row: -1, column: -1 };


    sheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, colNumber) => {
            // console.log(cell.value);

            if (cell.value === searchText) {

                console.log(rowNumber);
                console.log(colNumber);
                cellCoord.row = rowNumber;
                cellCoord.column = colNumber;


            }

        })
    });

    return cellCoord;
}

//writeExcelTest("Papaya", 287,{rowChange:0, columnChange:2}, "C:\\Users\\sunil\\Downloads\\excelDownload.xlsx");



test("upload and download excel validation", async ({ page }) => {

    const textSearch = 'Mango';
    const price = '287';

    await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");

    //await page.locator("#downloadButton").click();

    const downloadPromise = page.waitForEvent('download');

    await page.getByRole("button", { name: 'Download' }).click();

    await downloadPromise;

    const download = await downloadPromise;

    // Save file to your desired path
    const filePath = "C:\\Users\\sunil\\Downloads\\download.xlsx";
    await download.saveAs(filePath);

    await writeExcelTest(textSearch, price, { rowChange: 0, columnChange: 2 }, filePath);


    await page.locator("#fileinput").click();
    await page.locator("#fileinput").setInputFiles({
        name: 'download.xlsx',
        mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        buffer: fs.readFileSync(filePath)
    });

    await page.screenshot({ path: 'afterupload.png' });

    await page.screenshot({ path: 'Afterss.png' });



    const locatorText = page.getByText(textSearch);

    const desiredRow = await page.getByRole("row").filter({ has: locatorText });

    await expect(desiredRow.locator("#cell-4-undefined")).toContainText(price);

    //await page.pause();

}




)

