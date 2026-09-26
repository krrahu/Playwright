
import {test,expect,Locator} from"@playwright/test";

     //<===========BootStrap date picker -===========>
     // jquery & bootstrap core logic is same only UI is different , refer jqusery code 
    test(" Type 1- jQuery date picker",async({page})=>{
        await page.goto("https://www.booking.com/");
   
    })

    // assingment --> open dummyticket.com>select option>enter data> select DOB & Dept date date > verify payment > click on procced
