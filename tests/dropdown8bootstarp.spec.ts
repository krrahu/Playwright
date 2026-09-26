

import{expect, Locator, test} from"@playwright/test";
//import {test,expect,Locator} from"@playwright/test";

//<============ boot starp  drop-down  ==========> ( we use this no there is no select tag)

test("Dynamic/auto suggested drop-down demo in playwright",async({page})=>{
    await page.goto("https://www.flipkart.com/");
  // if after giving keyword suggetsed values are not displaying on DOM we have to use "turn on debugger" mode than screen will be freeze for some time> than we can find element
   //await page.locator("input[name='q']").fill("smart"); --> this CSS ,  how to use indexing with css 
   await page.locator("(//input[@name='q'])[1]").fill("smart"); //--> this xpath locator
   await page.waitForTimeout(5000); // 

   // get all suggested option --> ctrl+shift+p  on DOM -->type and selct >emulate focused page 
   //ul//li or ul>li or 
   
const options:Locator=page.locator("//ul//li");
const cnt=await options.count();
console.log("print total suggested count based on user keyword:",cnt);

//  print specific  suggested otions in the console
console.log(options.nth(5).innerText()); // print the text of suggested otions at postion 5

//  print all suggested otions in the console

//Note:- if we will use textContent() than no need to using for loop we can directly like this to get all values-->options.textContent();

// for(let i=0;i<cnt;i++)
// {
//     console.log("print text values of all auto suggested:",await options.nth(i).innerText()); // 
//     //console.log("print text values of all auto suggested:",await options.nth(i).textContent()); // we can use this as well if it is giving space 

// }


// select or click on the specific option , let clikc on   smart tv

for(let i=0;i<cnt;i++)
{
    const allvalues=await options.nth(i).innerText(); // 
   
    if(allvalues==="smart tv")
    {
        options.nth(i).click();
        break;
    }
    await page.waitForTimeout(5000);
}

})

// ===============3. Hidden drop down ---> we use Bootstrap/javascript ==========>
test.only("Hidden drop down",async({page})=>
{
  await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");

  await page.waitForTimeout(8000);
  // login steps
page.locator("input[name='username']").fill("Admin");
page.locator("input[name='password']").fill("admin123");
 await page.waitForTimeout(5000);
page.locator("input[type='submit']").click();

// click on PIM
//span[text()='PIM'] --> xpath
await page.getByText('pim').click();

// click on  job title dropdown
page.locator('form i').nth(2).click(); // 2nd dropdown selection
await page.waitForTimeout(5000);

// Capture all the optionsfrom drop down and count ( here we use ctrl+shift+p -->type -emulate focused and)
const options:Locator=page.locator("div[role='listbox'] span");
const count:number=await options.count();
console.log("number of options in drop-down:", count);

// print all options
console.log("print All the text value of drop-down:", await options.allTextContents());// without loop 

console.log("print all optins using for loop....")
for (let i=0;i<count;i++)
{
    console.log(await options.nth(i).innerText()); // 1st way 
    console.log(await options.nth(i).allTextContents());// 2nd way 
}
// select /click on option
for (let i=0;i<count;i++)
{
    const text=await options.nth(i).innerText();
    if (text==='Automation Tester')
    {
        options.nth(i).click;
        break
    }
}
  await page.waitForTimeout(4000);

})

// myntra > 