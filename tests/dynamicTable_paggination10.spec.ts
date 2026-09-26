import {test,expect,Locator} from"@playwright/test";


//<============ dynamic  table handling  ==========>
test("Single  select  demo in playwright",async({page})=>{
    await page.goto("https://practice.expandtesting.com/dynamic-table");

const table:Locator=page.locator("table.table tbody");
await expect(table).toBeVisible();

// select all the rows, then find number of rows
const rows:Locator[]=await table.locator("tr").all();
console.log("Number of rows in table:",rows.length);
expect(rows).toHaveLength(4);

// Step 1:- for chrome process get the value of CPU load 
// first read each row and check chrome presence where 
let cpuLoad='';
for (const row of rows)
{
    const processname:string=await row.locator("td").nth(0).innerText();
    if (processname==="Chrome")
    {
        cpuLoad = await row.locator("td:has-text('%')").innerText();// has-text() --> this is a method which append td to get element whose text ending with % (css syntax)
     // cpuLoad = await row.locator("td", {hasText:'%'}).innerText();// has-text() --> palywright syntax
     console.log("Cpu load of chrome:",cpuLoad);
     break;

    }
}

// Step 2:- Compare the  cpuLoad  value with yellow label ( )
let yellowBoxText:string= await page.locator("#chrome-cpu").innerText();
console.log("chrome CPU load text from yellow label:",yellowBoxText);

if (yellowBoxText.includes(cpuLoad))
{
console.log("cpu load of chrome is equal")
}
else{
console.log("cpu load of chrome is not equal")
}
 
// assertion :
expect (yellowBoxText).toContain(cpuLoad);
await page.waitForTimeout(8000);

// practice dynamic table on site --> testautomationprectice.blogspot.com 
})


//<============ paggination   ==========>
// pagination Example --> 1
test("pagination in playwright",async({page})=>{
    await page.goto("https://datatables.net/examples/core/basic_init/zero_configuration.html");

// css --> button[aria-label='Next'] or button[aria-label='Next']:has-text('›')
// css--> button[aria-controls='example']:has-text("›")  or button[aria-controls='example']:nth-child(9)

let hasmorepages=true;
while(hasmorepages)
{
    const rows=await page.locator("#example tbody tr").all();
    for (let row of rows)
    {
        console.log(await row.innerText());
    }

  
    // find next > element 
    const nextButton:Locator=page.locator("button[aria-label='Next']");
    // get attributes name of next > icon web element and printing the values
    const isDisabled=await nextButton.getAttribute("class"); //
    console.log("Attributes name of next icon webelement:",isDisabled);

    //  if user on last paggination --> check next icon if it disabled or not
    if(isDisabled?.includes('disabled'))
    {hasmorepages=false;

    }
    else{
        await nextButton.click();
    }

}
  await page.waitForTimeout(3000);
})



// pagination Example --> 2
test.only("Filter the row and check the rows count",async({page})=>{
    await page.goto("https://datatables.net/examples/core/basic_init/zero_configuration.html");


const dropdown:Locator=page.locator("#dt-length-0");
//xpath --> //option[text()='25']

await dropdown.selectOption({label:'25'}); // select 25 from drop down 

// aprraoch 1
const rows=await page.locator("#example tbody tr").all(); // total count  return type will be array

expect(rows).toBe(25); //assertion 

// aprraoch 2
const rowss= page.locator("#example tbody tr") // total count  return type will be array
expect(rowss).toHaveCount(25); //assertion 

})

// on Paggination Table --> Search word and performe assertion Example --> 
test.only("Search for specific data in Paggination Table ",async({page})=>{
    await page.goto("https://datatables.net/examples/core/basic_init/zero_configuration.html");

const searchBox:Locator=    page.locator("#dt-search-0");
await searchBox.fill('Paul Byrd');
const rowc=await page.locator("#example tbody tr").all();

if (rowc.length>=1)
{
    let matchFound=false;
    for(let row of rowc)
    {
        const text=await row.innerText();
        if(text.includes('Paul Byrd'))
        {
         console.log("record exist-found");
         matchFound=true;
         break;
        }
    }
    // Assertion
    expect(matchFound).toBe(true);
    expect(matchFound).toBeTruthy();

}
else
{
    console.log("record Does not exist-found");
}

// assignmnent -->blazedemo.com -->serach flight>choose flight which have lowest price> enter all data> puchase flight >verify success messge

})