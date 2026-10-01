
import { test, expect } from "@playwright/test";

// Trace Viewer| Capture Screenshots & Videos | Flaky Tests

// <==========================> 
//
test("screenshots though locally", async ({page}) => {
  await page.goto("https://demowebshop.tricentis.com/");

  //<-------page screenshot--------->
  // it will replace existing screenshot
 //await page.screenshot({path:'screenshots/homepage.png'}) //  screenshots - folder name , homepage.png - screen shot name

 // all screensshot will be capture 
 const timestamp=Date.now();
//await page.screenshot({path:'screenshots/'+'homepage'+ timestamp +'.png'}) 

//<------- Full page screenshot--------->

//await page.screenshot({path:'screenshots/'+'fullpage'+ timestamp +'.png',fullPage:true}) 

//<------- specific locator/element  screenshot--------->

// const logoloc= page.locator("img[alt='Tricentis Demo Web Shop']");
// logoloc.screenshot({path:'screenshots/'+'logoloc'+ timestamp +'.png'});

await page.locator("img[alt='Tricentis Demo Web Shop']").screenshot({path:'screenshots/'+'Logo'+ timestamp +'.png'}) 


await page.locator(".product-grid.home-page-product-grid").screenshot({path:'screenshots/'+'Logo'+ timestamp +'.png'}) 


})


//<---------screenshots from global i.e. from config ------>//
/* we can take screenshot globally also by defining in confif.file  like 

screenshot: 'only-on-failure',--> Capture screenshot on failure 
  screenshot: 'on',  --> Capture screenshot on pass
   },
   */
  

test.only("screenshots from global i.e. from config ",async({page})=>
{
 await page.goto("https://demowebshop.tricentis.com/");

//assertion --> to take screens failed it 
expect(page).toHaveURL("https://demowebshop.tricentis.com/");
expect(page.locator("text=Welcome to our store")).toBeVisible({timeout:50000}); //css--> .topic-html-content-header

})

// <==== similar to screenshot we take video also from config file like ====> 
 /* 
     video:'on',  -->Capture video on pass 
     video:'retain-on-failure', --> Capture video on fail
*/
      

