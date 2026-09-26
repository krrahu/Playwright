import {test,expect,Locator} from"@playwright/test";

// Text Input/Text Box/Input Box

test("css locators demo in playwright",async({page})=>{
    await page.goto("https://demowebshop.tricentis.com/");
const product:Locator=page.locator(".product-title"); // --> it will return 6 items in form of locator not in arry hence we have use for loop not  for each


//<======= 1. innerText() or textContent()========>
// fetch the text of particuler element using  --> innerText() or textContent()

// console.log(await product.nth(1).innerText()); // --> excat text 
// console.log(await product.nth(1).textContent());// text with extra things like space

// // fetch the text of element by using loop with --> innerText() or textContent()
// const count=await product.count();

// usimng--> innerText()
// for(let i=0;i<count;i++)
// {
// console.log(await product.nth(i).innerText()); 
// }

// using --> textContent()
// for(let i=0;i<count;i++)
// {
//console.log(await product.nth(i).textContent());
// const alltextname=await product.nth(i).textContent();
// console.log(alltextname); // all text will display with space if we have to use trim , if return type is array than use trim() with map

// console.log(alltextname?.trim()); // no space
// }

//<======= 2. allInnerText() or allTextContents()========>

// we can also print text of all element without loop also we have to use  ---> allInnerText() or allTextContent()
// both will return array

//const allproductNames:string[]=await product.allInnerTexts(); // if we don't define return type like string [] still output is coming what is point to define it
//console.log(allproductNames);

const allproductNames:string[]= await product.allTextContents(); 
console.log(allproductNames); // output will be with space  , hence we use trim () , simce return is array we can't use trim directly we have to use map() 
const trimmeedText=allproductNames.map(text=>text.trim());
console.log(trimmeedText);

// 3. all() ==> Locator -->Locator[]
// it coverts locator into locator  type of  array
// here it will return array of loctors >(we will store locators of products)> convert locators to array of locators (for iteration)> use for each loop and fetch text
const productLocators:Locator[]=await product.all();
console.log(productLocators);
await productLocators[2].innerText(); // fetching text of specific element 

// here we can use for of  loop because all locators are in form of array

for (let prdloc of productLocators)
{
    console.log(" all text:",await prdloc.innerText());
}
// for in loop --> it is index based , we can use like below
for (let i in productLocators)
{console.log (await productLocators[i].innerText())};

})