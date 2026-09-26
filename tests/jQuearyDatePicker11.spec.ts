
import {test,expect,Locator} from"@playwright/test";

     //<===========jQuery date picker - selcting date by arrow marck i.e. next/previous  button ===========>

    test(" Type 1- jQuery date picker",async({page})=>{
        await page.goto("https://testautomationpractice.blogspot.com/");
    
        const datePicker:Locator=page.locator("p #datepicker")
    await expect(datePicker).toBeVisible();


    // 1st way --> using fill() method
    // enter the data on date picker filed using fill() method
    datePicker.fill("06/20/2026"); // --> mm/dd/yyyy

    // 2nd way --> using date picker
    await datePicker.click(); // open the date picker calender

    // select target date
    const year='2027';
    const month='05';
    const date='23';

    // Step 1- validating year and month is selected as per target date data
    while(true)
    {
     const currentMonth=await page.locator(".ui-datepicker-month").textContent();   
     const currentYear=await page.locator(".ui-datepicker-year").textContent();   

     if (currentMonth===month && currentYear===year)
     {
        break;

     }
     //future date--> if not maches click on next button
     await page.locator(".ui-datepicker-next").click();

     // Past date -->click on previoud button ( in case past comment fuute date and change the test data)
       //await page.locator(".ui-datepicker-prev").click();

   }
    
    // once step 1 passed come out pof while loop and select date from calender

    // in beloe we capture all date i.e td  CSS--> .ui-datepicker-calendar tbody td or .ui-datepicker-calendar td  or .ui-datepicker-calendar tbody tr td

    const alldates= await page.locator(".ui-datepicker-calendar td").all();//  all dates
    for (let dt of alldates)
    {
        const dateText=await dt.innerText();
        if(dateText===date)
        {
            await dt.click()
            break;
        }
    }
    
    await page.waitForTimeout(5000);
})