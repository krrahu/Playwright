// <========How To Work with Browser Context, tabs & Pages/Popups========>

/* browser -->constext--> pages
one  browser can have multiple context and each context can have multiple pages/tabs
 1. browser context is like a new incognito window in the browser
 2. each context can have multiple pages/tabs

 - browser-->chrome,firefox,edge,safari
 - context--> New Incognito Window
   it is like we can have multiple  context for multiple users/apps fro same browser like setting
   provide a way to opreate multiple independent browser sessions
-  page--> New Tab,New Window,Popups 
*/

import {test,expect,Locator,chromium} from"@playwright/test";

// <-------------->

// <======= ctreating our own browser context and page  insated using under test method directly=====>
    test("browser context:",async()=>{

        // if we are defing brower,context and page in test method then we have to use async() in test method like --> async({page}) ,async({browser})=>
        // if we are not defining brower,context and page in test method then we have create browser,context and page like below:-
        
        const browser=await chromium.launch(); // createbrowser 
        const context=await browser.newContext(); // create context
         const page=await context.newPage();  // create page 
         await page.goto("https://ui.vision/demo/webtest/frames/");


        // we can multiple pages like below:

        const page1=await context.newPage(); 
        const page2=await context.newPage(); 
        await page1.goto("https://testautomationpractice.blogspot.com/");
        console.log(await page1.title());
        expect(page1).toHaveTitle("Automation Testing Practice");

        await page2.goto("https://www.booking.com/");

    })

//<======Handling Pages or Tabs :-  using browser context and page ( in selenium we use window handles logic)=========>
test("Handling Pages or Tabs:",async()=>{

        const browser=await chromium.launch(); // createbrowser 
        const context=await browser.newContext(); // create context

        // creating 1 pages
        const parentPage=await context.newPage(); 
    
        await parentPage.goto("https://testautomationpractice.blogspot.com/");

       
       // to work or perform any action on new tab we have to use event logic but if call even first and then click on new tab button then
         //it will not work because once we click on new tab new page will open and event will able to  catch it since evnet capture on old tab or page ,
         // hence both statements should go parallelly 

         // <---below sequnce wise will not work--> 
        // context.waitForEvent("page"); //  it retuen pending,fulifilled, rejected any one 
        //parentPage.locator("button:has-text('New Tab')").click(); // click on open tab button

        // 2 statemnents should go parallelly like below and it will create a new page i.e.childpage:-
        const [childPage]=await Promise.all([
            context.waitForEvent("page"),
            parentPage.locator("button:has-text('New Tab')").click()
        ]);



        //<=====switching  between pages=====>

// Appraoch 1:- switch between pages and get title , use this logic if we have more than 2 pages 

const totalPages=context.pages(); // return array 
console.log("total number of pages present on the context:",totalPages.length); // 2

// index 0 parent page and index 1 child
console.log("Title of parent page is:",await totalPages[0].title());  
console.log("Title of child page is:",await totalPages[1].title());

// Appraoch 2:- Alterate option, use this logic if we have only 2 pages
console.log("Title of parent page is:",await parentPage.title()); 
console.log("Title of child page is:",await childPage.title());


    })

    //<======= Handling Popups/Alerts/Dialogs =======>
    test("Handling window Popups :",async ({ browser })=>{

     const context=await browser.newContext(); // create context
     const page=await context.newPage();  // create context

        await page.goto("https://testautomationpractice.blogspot.com/");
    
     // multiple pop-up 
     // we will create pop-up event but parllelly so we use promise.all() and it will return array of new pages
     
     await Promise.all([
        page.waitForEvent("popup"), // pop-up event
        page.locator("#PopUp").click() // click on pop-up element
    ]);

    const allPopupWindows=context.pages(); // it will return array of all pages present in context including parent and child pages
console.log("total number of pages/windows:",allPopupWindows.length); // 3
const parentPage=allPopupWindows[0];
console.log("what is this",parentPage);
console.log("Title of parent page is:",await parentPage.title());
console.log("URL of parent page is:",await parentPage.url());

const childPage1=allPopupWindows[1].url();
console.log("URL of child page 1 is:",childPage1);

// const childPage2=allPopupWindows[2].url();
// console.log("URL of child page 2 is:",childPage2);

// // if we have multiple popups and we want to perform any action on specific popup then we 
// can use for of loop like belo
 for (const popup of allPopupWindows) 
    {   
     const title = await popup.title();
      if(title.includes("Selenium"))
    {
            await popup.locator("#Layer_1").click(); // perform action on specific popup
         await page.waitForTimeout(3000);
      }

    }

    })


    //<==============Authenticate pop-up=====>
    // in selenium we use to pass UN & PWD in URL 
    // in playwrigt -->

       test.only("Handling Authenticate pop-up :",async ({ browser })=>{

     // Approacvh 1:-  pass UN & PWD in URL  ( for this we don't need browser context)

     const context=await browser.newContext(); // create context ( this is not required for approach 1)
     const page=await context.newPage();  // create context

         await page.goto("https://admin:admin@the-internet.herokuapp.com/basic_auth");
         await page.waitForLoadState(); // use this  to wait for page to loaded completely
        // await expect(page.locator('text=Congratulations')).toBeVisible();
         await expect(page.locator("p")).toBeVisible();
         await page.waitForTimeout(3000);
    
         // Approach 2:-Using  browser context  
         // specifiing the login details in browser context  
// createing new context & page for Approach 2 just for clear undersating

          const context1=await browser.newContext({httpCredentials:{username:'admin',password:'admin'}}); 
           const page1=await context1.newPage();  // create context
           await page1.goto("https://the-internet.herokuapp.com/basic_auth");
         await page1.waitForLoadState(); // use this  to wait for page to loaded completely
         await expect(page1.locator("p")).toBeVisible();
         await page.waitForTimeout(3000);

    })
    
