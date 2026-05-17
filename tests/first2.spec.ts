 import {test,expect} from "@playwright/test";
 //syntax
 test("verfy the title",async ({page})=>{
   await page.goto("https://playwright.dev/docs/intro");
    //String str=page.url();
    let value:string=await page.url();
    console.log("web page url name is",value);
      let Title:string=await page.title();
    console.log("Title of page is",Title);
 }
 )