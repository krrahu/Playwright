import { Page,test,expect,Locator } from "@playwright/test";


/*<-============ Annotations & Tags ============->
  - only :- test.only() --> running only specific test
  - skip :- test.skip() --> intentionally skiping the test , we can skip based on condition and normal skip 
  - fail :- test.fail() --> intentionally failing the test 
  - fixme :- test.fixme()--> we define it just to say we have to fix the code,partial development done  and  basicaly it will also skip the test ,
  - slow  :- test.slow(); --> it will tripple the time , default time is 30 sec , after adding it will be 90 sec

  note:- Annotations can also be used at group  also like --> test.describe.skip();
  */



// <-----Annotations & Tags------->//

// test("Test1 without Annotations",async({page})=>{

// console.log("  it will execute only once before first execution start   i.e. before Test1 ()")

// })

// test.only("Test1 without Annotations",async({page})=>{

// console.log("  it will execute only once before first execution start   i.e. before Test1 ()")

// })
// test.skip("Test1 without Annotations",async({page})=>{

// console.log("  it will execute only once before first execution start   i.e. before Test1 ()")

// })


/*<-============ Tags ============->
-  taggin can be done in 2 ways -->
 using @ 
 using tag{}  -->  this is not working in latest version of playwright , so we will use @ only

- we  can run 5 ways from cmd prompt  --> 

npx playwright test annotations_Tags.spec.ts --grep "@sanity" --> it will run all sanity test case only
npx playwright test annotations_Tags.spec.ts --grep "@regression" --> it will run all regression test case only
npx playwright test annotations_Tags.spec.ts --grep "(?=.*@sanity)(?=.*@regression)"  --> run both sanity & regression , this & condition
npx playwright test annotations_Tags.spec.ts --grep "@sanity|regression" --> run test belongs to either sanity or regression
npx playwright test annotations_Tags.spec.ts --grep-invert "@sanity" --> run all TC except sanity
npx playwright test annotations_Tags.spec.ts --grep "@sanity" -grep-invert"@regression" --> -> run all TC of sanity , but if any Test linked with sanity & regression that will not run

 we can also run test from config file like below:- 
 - grep:/@sanity/,
  grep:/@regression/,
   grep:/(?=.*@sanity)(?=.*@regression)/
*/

test("using of tags 1st way @regression@smoke",async({page})=>{
     await page.goto("https://demowebshop.tricentis.com/");
//await expect(page).toHaveTitle("");


})

test("using of tags 2nd way @sanity",async({page})=>{
     await page.goto("https://demowebshop.tricentis.com/");
//await expect(page).toHaveURL("https://demowebshop.tricentis.com/");


})

test("using of multiple tags 2nd way @sanity @regression",async({page})=>{
     await page.goto("https://demowebshop.tricentis.com/");
//await expect(page).toHaveURL("https://demowebshop.tricentis.com/");


})

