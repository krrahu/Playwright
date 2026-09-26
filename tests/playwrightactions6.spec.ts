import {test,expect,Locator} from"@playwright/test";

// Text Input/Text Box/Input Box

test("css locators demo in playwright",async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");

const textBox=page.locator('#name')
await expect(textBox).toBeVisible();
await expect(textBox).toBeEnabled();

const lenght:string|null=await textBox.getAttribute("maxlength")// return the value of maxlenght attribute of the element
expect(lenght).toBe('15'); // here expect() is performing on value not on element hence no need of await

await textBox.fill("jhon candey");// --> enter value 
// now read the entered value
// console.log("text content of first name:", await textBox.textContent()); // return empty becuse textContent() will fetch the value from HTML but here entered value is not capturing on HTML 
//   hence we have to use inputvalue() to get entered value from text filed  like below

const entredValue:string=await textBox.inputValue(); // return input value 
 console.log("text content of first name:", entredValue);
 expect(entredValue).toBe("jhon candey"); // here expect() is performing on value not on element hence no need of await
 await page.waitForTimeout(3000);

})

// 2. Radio buttons (check line 33 is failing)

test("Radio buttons demo in playwright",async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");

const maleRadion:Locator=page.locator('#male');
await expect(maleRadion).toBeVisible();
await expect(maleRadion).toBeEnabled();
//await maleRadion.isChecked() // inccorect way 
expect(await maleRadion.isChecked()).toBe(false)// correct way , testing the assertion  -->by default it should be not selected hence false

await maleRadion.check(); // it will select the radion button
expect(maleRadion.isChecked()).toBe(true)//   testing the assertion  , it should be selected 
await expect(maleRadion).toBeChecked(); //   testing the assertion  , it should be selected  ( use this preferable)
})

// 3. check box  buttons

test.only("check box demo in playwright",async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");

// select specific checkbox using getByLabel () inbuilt lovator and assert 
const sundayCheckBox=page.getByLabel("Sunday");
await sundayCheckBox.check();
await expect(sundayCheckBox).toBeChecked(); // actual-->sundayCheckBox vs Expected --> toBeChecked ,

// select all checboxes and assert each is checked





})