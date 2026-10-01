import { test, expect } from "@playwright/test";

// Auto waiting, Timeouts, Assertions & Codegen

// <=========== Parallelism | Parallel Testing==============> 
/*
- by default playwright test will execute in parallel mode  and without sequence
- we can define it using fullyParallel  in  config file like below:- 

<----config file :- --->

  fullyParallel: true, --> Run tests in files in parallel ( randomly)
  -  worker will always depend on number of test files 

  fullyParallel: false, --> Run tests in files in sequence wise i.e. 1st>2nd>3rd ...
  -  worker will always 1 

<---Frpm spec.ts file :- --->
  define parallelism in test.describe() like below:-

test.describe.configure({ mode: 'serial' }); 
test.describe.configure({ mode: 'parallel' }); 

 -  we can also confgure worker during run through command line --> npx playwright test tests/paralleltesting.spec.ts --worker=4
 
*/
// 



test.describe.configure({ mode: 'serial' }); 
//test.describe.configure({ mode: 'parallel' });   

test.describe("Group 1", () => {

    test('Test 1', async ({ page }) => {
        await page.goto("https://www.demoblaze.com/");
        console.log("THis is from Test1...")
    });

    test('Test 2', async ({ page }) => {
        await page.goto("https://www.demoblaze.com/");
        console.log("THis is from Test2...")
    });   
    test('Test 3', async ({ page }) => {
    await page.goto("https://www.demoblaze.com/");
    console.log("THis is from Test3...")
 
     });
    test('Test 4', async ({ page }) => {
    await page.goto("https://www.demoblaze.com/");
    console.log("THis is from Test4...")
 
     });
});





  