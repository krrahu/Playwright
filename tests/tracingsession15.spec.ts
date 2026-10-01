// <==== Tracing (trace viewer)====> 

// 

 /* 
 three ways we can create  the  trace file  
 1. globally -->defining in config file 
 2. LOcal --> sepcific to script(using cmd line) -->npx playwright test tracingsession15.spec.ts --headed --trace on 
 3. through programatically

  three ways we can View the trace file 
 1. from HTML report  
 2. through cmd page -->    npx playwright show-trace Trace.zip
 3. though utility --> https://Track.playwright.dev/ > upload file > 

based on condition satified  it will generate one trace zip which have all reports/logs , to see the we need to 
open the HTML report there it will availabe in Zip file 

     trace:'on', --> Capture trace on script passed
     trace:'off', --> Capture trace on script failed
     trace:'on-first-retry' -->Capture trace on first try if script failed and re-run 
     trace:'retain-on-failure', --> Capture trace  on fail
*/
import { Page,test,expect,Locator } from "@playwright/test";

test('test tracing', async ({ page }) => {
    await page.goto("https://www.demoblaze.com/");
  await page.getByRole('link', { name: 'Log in' }).click();
  await page.locator('#loginusername').click();
  await page.locator('#loginusername').fill('test');
  await page.locator('#loginpassword').click();
  await page.locator('#loginpassword').fill('test');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByRole('link', { name: 'Log out' }).dblclick();
});


// <====3rd way --> we use context to caputre the trace , through programatically====>
/*
 but this will not catured in html report , so to view trace file 2 option is there 
- 1. through cmd page -->    npx playwright show-trace Trace.zip
- 2. use online --> TrackEvent.playwright.dev > upload file > 
*/

test.only('test tracing through context', async ({ page,context }) => {

    context.tracing.start({screenshots:true,snapshots:true});

    await page.goto("https://www.demoblaze.com/");
  await page.getByRole('link', { name: 'Log in' }).click();
  await page.locator('#loginusername').click();
  await page.locator('#loginusername').fill('test');
  await page.locator('#loginpassword').click();
  await page.locator('#loginpassword').fill('test');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByRole('link', { name: 'Log out' }).dblclick();

context.tracing.stop({path:'trace.zip'}) ; // 
});
