
import { test, expect } from "@playwright/test";

// Auto waiting, Timeouts, Assertions & Codegen

// <===========Auto waiting===============> 
// these are actionability checks from playwright ,be default it will element is stable,enable,visible and so on these are playwright inbuild features
test("Auto waiting  and forcing ", async ({page}) => {
  await page.goto("https://demowebshop.tricentis.com/");

//assertion --> Auto wait works 
expect(page).toHaveURL("https://demowebshop.tricentis.com/");
expect(page.locator("text=Welcome to our store")).toBeVisible({timeout:50000}); //css--> .topic-html-content-header

//Actions --> Auto wait works 
await page.locator(".search-box-text").fill("laptop");
await page.locator("[type='submit']").click();

// don't to perform Auto wait i.e. actionability checks we can use force to overide
await page.locator(".search-box-text").fill("laptop",{force:true});

});

// <===========Timeouts --(it is how long test or element should wait)===============> 
// Two types --> 
// 1.  Test timeout (max time -30 sec)  --> use for test 
// 2.  Expect timeout (max time -5 sec) --> use for assertion

// globally we will define in config and locally we define at Test   like below :-
//expect(page.locator("text=Welcome to our store")).toBeVisible({timeout:50000});  --> time specific to elementfor this line 

// test.setTimeout(50000);// 50 sec --> applicable for all elements in one test 
//test.slow()// 90 ( defualt is 30 sec)  --> applicable for all elements in one test 

//<====================assertion ===============>
/* 
Two types of Assertion :- 
 1. Auto Retrying assertion --> applicable only on web element , page , default is 5 sec we can increase , need to define Await,timeout not possible
 2. non- Retrying assertion -->on values , not default time out, not required Await ,timeout not possibel,
 3. Negative matcher --> applicable for both types
 */

 test.only("assertion ", async ({page}) => {
  await page.goto("https://demowebshop.tricentis.com/");

//Auto Retrying assertion 
expect(page).toHaveURL("https://demowebshop.tricentis.com/");
expect(page.locator("text=Welcome to our store")).toBeVisible({timeout:50000}); //css--> .topic-html-content-header

//non- Retrying assertion



});
