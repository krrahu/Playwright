import {test,expect,Locator} from"@playwright/test";

test("xpath path demo in playwright",async({page})=>{
    await page.goto("https://demowebshop.tricentis.com");

})