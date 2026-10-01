/*
Pass Test --> every time Pass , retry no needed 
Failed Test --> Failed >failed>failed
Flaky Test --> Pass>fail>Pass>F fail

- these are those tc which are faling inconsistently like some time pass,some time fail 
due to various reason like --> envinment , network issue, server will reponse slowly ,UI elements are overlapping, time issue
if any annimation running  and so on

How to handle it :- --> re-run the the failing test case.
- in playwright by using retrive concept  we need to re-run the the failing test case.
- we can define retries in  config file and we use us through cmd line 

  Retry using config file  
  // retries: process.env.CI ? 2 : 0, //---> use this when we wants to run it from CI cd
  //retries:3, //-->  retry locally 

  using CMD line:-
  npx playwright test flakySession15.spec.ts --retries=3

*/


import { Page,test,expect,Locator } from "@playwright/test";

test('test tracing', async ({ page }) => {
    await page.goto("https://www.demoblaze.com/");
  await page.getByRole('link', { name: 'Log in' }).click();
  await page.locator('#loginusername').click();
  await page.locator('#loginusername').fill('test');
  await page.locator('#loginpassword').click();
  await page.locator('#loginpassword').fill('test');
  await page.getByRole('button', { name: 'Log in11' }).click();
  await page.getByRole('link', { name: 'Log out' }).dblclick();
});