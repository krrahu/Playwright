
import {test,expect,Locator,Page} from"@playwright/test";

    //<===========jQuery date picker - selcting date by arrow marck i.e. next/previous  button  using funtion ===========>

    // create function :-

    async function selectDate(targetYear:string,targetMonth:string,targetDate:string,page:Page,isFuture:boolean)
    { 

       // Step 1- validating year and month is selected as per target date data
     while(true)
     {
             const currentMonthRaw=await page.locator(".ui-datepicker-month").textContent();   
             const currentMonth = (currentMonthRaw || '').trim();
             console.log("text of current month:",currentMonth);
             const currentYearRaw=await page.locator(".ui-datepicker-year").textContent();   
             const currentYear = (currentYearRaw || '').trim();

         // Accept month as either name (e.g., "June") or zero-padded number ("06").
         const targetMonthNormalized = isNaN(Number(targetMonth))
             ? targetMonth // assume month name supplied
             : new Date(Number(targetYear), Number(targetMonth) - 1, 1).toLocaleString('en-US', { month: 'long' });

         if (currentMonth === targetMonthNormalized && currentYear === targetYear)
     {
        break;
     }
    if(isFuture)
    {
     await page.locator(".ui-datepicker-next").click(); //future date-->
    }
     else
     {
     await page.locator(".ui-datepicker-prev").click(); // Past date
     }

    }
    
    // once step 1 passed come out pof while loop and select date from calender
    const alldates= await page.locator(".ui-datepicker-calendar td").all();//  all dates

    for (let dt of alldates)
    {
        const dateText=await dt.innerText();
        if(dateText===targetDate)
        {
            await dt.click();
            break;
        }
    }
    
    }

// test method :- we will call function inside it
    test("jQuery date picker",async({page})=>{
        await page.goto("https://testautomationpractice.blogspot.com/");
    
     const datePicker:Locator=page.locator("p #datepicker")
     //await page.waitForTimeout(3000);
      expect(datePicker).toBeVisible();

     // 2nd way --> using date picker
     await datePicker.click(); // open the date picker calender

     // select target date( Test data)
      const year='2027';
     const month='06';
     const date='15';

    // calling funtion --> selectDate() // yyyy//MM//dd/page/boolean
    await selectDate(year,month,date,page,true); // future date -  true , past date -false
     const expectedDate='06/15/2027';   // mm/dd/yyyy
     //  assertion
     //await expect(datePicker).toHaveValue(expectedDate);

      await page.waitForTimeout(5000);
})