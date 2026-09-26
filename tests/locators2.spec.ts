 import {test,expect,Locator} from "@playwright/test";
 //syntax for test method 
 /*test("",()=>{}

 )*/

 // Locator :1 -->page.getByAltText() 
 //it is used to locate an element, usually image, by its text alternative.

 test("verfy the playwright locatore",async ({page})=>{
   await page.goto("https://demo.nopcommerce.com");
    const logo:Locator=page.getByAltText("nopCommerce demo store")
    logo.click();
    await expect(logo).toBeVisible();
 
// Locator :2 --> page.getByText()
//  
// it is used to locate element by text content i.e. visible  text(it is not attribute of an element , it is text value  like <h2>welcome to store</h2>) here welcome to store is visible text
// use this locators to find non intercative element(can't perform any action on element) like div,span,p , etc 
// for intercative element like button,a,inout, ect use Role Locator i.e page.getByRole()
const text:Locator=page.getByText("Welcome to our store")
await expect(text).toBeVisible();


// Locator :3 --> page.getByRole()
// use this when element is  intercative element (we perform any action on element) like button,a,inout, etc.
await page.getByRole("link",{name:'Register'}).click(); // click on register link 

await expect(page.getByRole("heading",{name:'Register'})).toBeVisible();

// Locator :4 -->page.getByLabel() 
// to locate a form control by associated label's text.
//use this when tag name is label
await page.getByLabel('First name:').fill('test');
await page.getByLabel('Last name:').fill('test1');

// Locator :5-->page.getByPlaceholder()
// used to Locate an input by placeholder.

page.getByPlaceholder('Search store').fill('Apple product');

// Locator :6--> page.getByTitle() 
// to locate an element by its title attribute.
// when to use:-when element has maeaningful title attaributes
await page.goto("url")

// const link:Locator=page.getByTitle("Home page link")
// expect(link).toHaveText("Home");

await expect(page.getByTitle("Home page link")).toHaveText("home");

await expect(page.getByTitle("HyperText Markup Language")).toHaveText("HTML");



//Locator :7-->page.getByTestId() 
// to locate an element based on its --> data-testid attribute (other attributes can be configured).
//when to use:-when text or role-based locators are unstable or not suitable 
await expect(page.getByTestId("profile-email")).toHaveText("john.doe@example.com");
await expect(page.getByTestId("profile-name")).toHaveText("john");


}
 )
//  test.only("",()=>{}


//  )