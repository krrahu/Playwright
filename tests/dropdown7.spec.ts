import {test,expect,Locator} from"@playwright/test";


//<============ Single select drop-down selection for select tag ==========>
test("Single  select  demo in playwright",async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");

// Select tag drop-down selection --> Single select 

// 1. select option from drop-down ( 4 ways we can seelct like below: )
page.locator("#country").selectOption('india'); // 1st --> visible text
page.locator("#country").selectOption({value:'canada'}); // 2nd -->by using value attributes
page.locator("#country").selectOption({label:'india'}); //3rd --> by using label i.e label is similar text
page.locator("#country").selectOption({index:2}); // 4th  --> by using text


// 2. check number of options in the dropdown (count of all value in drop=down)
//--> #country option or  #country>option or  
const dropDownValues= page.locator("#country>option");
await expect (dropDownValues).toHaveCount(10);

// 3. check an option prsent in the dropdown
//  const optionTextt:string[]=await dropDownValues.allTextContents(); // it will will output with space hence use map to trim it 
// console.log(optionTextt); 

const optionText:string[]=(await (dropDownValues.allTextContents())).map(text=>text.trim());
console.log(optionText); // print all values in form of array
// asertion 
expect(optionText).toContain('jaoan');// check in optionText aaary japan is there or not

// 4. print all optioons from the drop-down
// 1st find all values step 2 -dropDownValues> fetch all text of all values step 3 -optionText> step 4 -use loop to print all values
for (const options of optionText)
{
console.log(options);
}
await page.waitForTimeout(5000);
})

//<============ multi select drop-down selection for select tag ==========>
test("multi  select  demo in playwright",async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");

// Select tag drop-down selection --> multi  select 

// select option from drop-down ( 4 ways we can seelct like below: )
page.locator("#colors").selectOption(['Red','blue','green']); // 1st --> using visible text
page.locator("#colors").selectOption(['Red','blue','green']); // 2nd -->by using value attributes
page.locator("#colors").selectOption([{label:'yellow'},{label:'pink'},{label:'green'}]); //3rd --> by using label i.e label is similar text
page.locator("#colors").selectOption([{index:0},{index:2},{index:3}]); // 4th  --> by using text


// 2. check number of options in the dropdown (count of all value in drop=down)
//--> #country option or  #country>option or  
const dropDownValues= page.locator("#colors>option");
await expect (dropDownValues).toHaveCount(7);

// 3. check an option prsent in the dropdown 
const optionText:string[]=(await (dropDownValues.allTextContents())).map(text=>text.trim());
console.log(optionText); // print all values in form of array
// asertion 
expect(optionText).toContain('Green');// check in optionText aaary japan is there or not


// 4. print all optioons from the drop-down
// 1st find all values step 2 -dropDownValues> fetch all text of all values step 3 -optionText> step 4 -use loop to print all values
for (const options of optionText)
{
console.log(options);
}

await page.waitForTimeout(5000);

})

//< ==========  to  check drop-down values are sorted or not =============>
test("soreteed dropdown  demo in playwright",async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");

// check sorted drop down --> case 1:- when drop-down values are by deafult in sorted order

// const dropDownOptions=page.locator("#animals option")
// console.log(await dropDownOptions.allTextContents()); // it will will output with space hence use have tu use  map to trim it 


// const optionText:string[]=(await (dropDownOptions.allTextContents())).map(text=>text.trim());
// console.log(optionText); // print all values in form of array

// const originalList:string[]=optionText;  // original order
// const sortedList:string[]=optionText.sort();  // sorted order
// //const sortedList:string[]=originalList.sort();  // sorted order


// <---------check sorted drop down --> case 2:- when drop-down values are by deafult not in sorted order-------->

const dropDownOptions=page.locator("#colors option") // not sorted values
console.log(await dropDownOptions.allTextContents()); // it will will output with space hence use have tu use  map to trim it 


const optionText:string[]=(await (dropDownOptions.allTextContents())).map(text=>text.trim());
console.log(optionText); // print all values in form of array

const originalList:string[]=[...optionText];  // original order
const sortedList:string[]=[...optionText.sort()];  // sorted order

console.log("origin list values:" ,originalList);
console.log("values after sorting:" ,sortedList);

// assertion to check original list and sorted list are reallay sorted
expect(originalList).toEqual(sortedList);
})

//<============ checking  drop-down having Duplicate or not  ==========>

test("Duplicate dropdown  demo in playwright",async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");
   // const dropDownOptions=page.locator("#animals option") // not having duplicate values
const dropDownOptions=page.locator("#colors option") // having duplicate values
const optionText:string[]=(await (dropDownOptions.allTextContents())).map(text=>text.trim());
console.log(optionText); // print all values in form of array

const myset=new Set<string>();// Set  - duplicates values not allowed
const duplicates:string[]=[]; // array - duplicates values allowed

for (const text of optionText)
{
    if(myset.has(text))
    {
        duplicates.push(text);
    }
    else
    {
        myset.add(text);
    }
}


console.log("duplicate options are:",duplicates); // print duplicates values

// Assertion 

if(duplicates.length>0)
{
    console.log("dupliactes found:", duplicates)
}
else{
console.log("No dupliactes found")
}


// Homework --> open browser stack>select filetr low to hight> captuure price of all products> find product lowset & highest 


})