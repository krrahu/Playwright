import {test,expect,Locator} from"@playwright/test";

test("css locators demo in playwright",async({page})=>{
    await page.goto("https://demowebshop.tricentis.com");


    // 1. id--> tag with id
//tag#id --> e.g input#small-searchterms
 const serachBox=page.locator("input#small-searchterms")
await serachBox.fill("test");
await expect(page.locator("input#small-searchterms")).toBeVisible();
await page.locator("input#small-searchterms").fill("t-shorst");



    // 2. class--> tag with class
//tag.class--> e.g input.search-box-text.ui-autocomplete-input  or .search-box-text.ui-autocomplete-input
await expect(page.locator("input.search-box-text.ui-autocomplete-input")).toBeVisible();
const serachBoxs=page.locator("input.small-searchterms")//  this is wrong element i have given to check script fail but why it not run
await page.locator(".search-box-text.ui-autocomplete-input").fill("shorts");


// 3. attributes --> tag with any attirbutes
// syntax-->  tag[attribute='attribute values']  or [attribute='attribute values']
// example --> input[name=q] or input[name='q'] or or [name='q']
page.locator("input[name=q]").fill("css attributes");
page.locator("[name=q]").fill("css attributes without tag");

// 4. attributes --> tag with class and  attirbutes ( mix of two 2 types like class + attributes)
// syntax--> tag.class[attribute='attribute values']   or .class[attribute='attribute values']  

// example --> input.search-box-text[name='q']  or .search-box-text[name='q']
await page.locator(".search-box-text[name='q']").fill("class + attributes")

// 5. attributes --> tag with id  and  attirbutes ( mix of two 2 types like id + attributes)
// syntax--> tag#id[attribute='attribute values']   or #id[attribute='attribute values']/  

// example --> input#small-searchterms[name='q']  or #small-searchterms[name='q']
await page.locator("#small-searchterms[name='q']").fill("id + attributes")


// absoulte  css -->(only top to button i.e 1 way only)  --> this not recomended to use in playwright
/*html>body>div>h1  
html>body>div>div>p[id=para1] or html>body>div>div>p[#=para1]
html>body>div>div>p[id=para1][class=sub] --> mix of two attributes
html>body>div>div>p[class=sub] or html>body>div>div>p[.=sub]
*/

// Relative CSS--> (directly jump tp element , only top to button i.e 1 way only) , parent > child not in reverse
/*--> p#para1 , p.main, p[id=para1] or [id=para1], p[class=sub] or [class=sub]
--> body>div>* , body>div>*:last-child ,body>div>*:first-child ,body>div>*:nth-child(3)
--> p[class*='ai'] --> contians
-->p[class$='in'] --> end with
-->p[id='pa'] --> strat with 
 --> exaplme of mix of 2 attribyutes 
 p[id=para1][class=sub]  --> both should match
 p[id=para1 and class=sub]  --> both should match
 p[id=para1 opr  class=sub]  --> one  should match

 p[id='para1'] :not([class='sub'])  --> 1st is true 2nd should be false i.e.invalid
 p:not([id='para1'] ) [class='main']  --> 1'st is invalid 2'nd is valid

  p:not([id='para1']):not([class='main']) -->

   p[id='para1']+p --> immidaite sibling element with tag name p ( + icon means it will find child element)
   p[id='para1']+* --> capture all sibling element with tag name p
 */

})