import { test, expect } from "@playwright/test";



// <===========  Parameterization | Data Driven Testing | JSON> CSV > Excel==============> 
/*
- defautt parameterion of  data is done at test level 
- parameterization by using exteranal file like excel,json,csv 


*/
//<===========Parameterization ========>

//     test('Test Parameterization with hard coded value', async ({ page }) => {
//     await page.goto("https://demowebshop.tricentis.com/");
//     await page.locator(".search-box-text.ui-autocomplete-input").fill("laptop");
//     await page.locator(".button-1.search-box-button").click();

//     // page.locator(".search-results") --> it will return all the search result in array of locators and search for prdouct at index 0 and verify it should conatin text laptop

//    //await  expect.soft(page.locator(".search-results").nth(0)).toContainText("laptop");//
//    await  expect.soft(page.locator(".search-results").nth(0)).toContainText("laptop",{ignoreCase:true}); // ignore case of text

//    // console.log("THis is from Test4...")

// })


// Dyamic data--> Test Parameterization by taking data from array

// Test data
const testData :string[] = ["laptop", "computer", "phone","camera"];

// using for of  loop
for (const item of testData)
{
  test(`Search the ${item}`, async ({ page }) => {
     await page.goto("https://demowebshop.tricentis.com/");
     await page.locator(".search-box-text.ui-autocomplete-input").fill(item);
     //await page.locator(".button-1.search-box-button").click();
     //await  expect.soft(page.locator(".search-results").nth(0)).toContainText("laptop",{ignoreCase:true}); // ignore case of text   
  });
}
    