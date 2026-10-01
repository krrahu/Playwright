/*
Grouping Tests | Hooks | Annotations & Tags

-  by default playwright test will execute in parallel mode  and without sequence
- we can define it using fullyParallel  in  config file like below:- 

config file :- 

  fullyParallel: true, --> Run tests in files in parallel 
  fullyParallel: false, --> Run tests in files in sequence wise

  <-============Grouping Tests ===========>
  Grouping Tests is done by using test.describe()  method 
  to run --> npx playwright test Session16.spec.ts --grep Group1

*/

import { Page,test,expect,Locator } from "@playwright/test";

test.describe("Group 1", () => {

    test('Test 1', async ({ page }) => {
        await page.goto("https://www.demoblaze.com/");
        console.log("THis is from Test1...")
    });

    test('Test 2', async ({ page }) => {
        await page.goto("https://www.demoblaze.com/");
        console.log("THis is from Test2...")
    });
});

test.describe("Group 2", () => {
test('Test 3', async ({ page }) => {
    await page.goto("https://www.demoblaze.com/");
    console.log("THis is from Test3...")
 
});
test('Test 4', async ({ page }) => {
    await page.goto("https://www.demoblaze.com/");
    console.log("THis is from Test3...")
 
});
});

  