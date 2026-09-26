import{test,expect,Locator} from "@playwright/test";

test("xpath axes demo in playwright",async({page})=>{
    await page.goto("https://www.w3schools.com/html/html_tables.asp");

    //1. Self axis --> (exact element) select <td> element that contins "germany"
    //td[text()='Germany']
    //td[text()='Germany']/self::td

const germanyfiled=page.locator("//td[text()='Germany']/self::td");
console.log(germanyfiled);
await expect(germanyfiled).toHaveText("Germany");

    // 2. parent --->Get/find parent <tr> of the "germany" cell 
    //td[text()='Germany']/parent::tr
    const parentRow=page.locator("//td[text()='Germany']/parent::tr")
    //await expect(parentRow).toContainText("Maria");

    console.log(parentRow);//--> it will return locator not value if we have to use assertion onthis first alltextcontents than use assertio
const all=console.log( await parentRow.allTextContents())// --> it give all values 
 
// 3. child axis --> get all <td> children from the second row <tr> in the table

//table[@id='customers']//tr[2]/child::td --> it will return all child elements of row 2nd 
const secondRowCells=page.locator("//table[@id='customers']//tr[2]/child::td");
await expect(secondRowCells).toHaveCount(3);

// 4. ancestor axis--> 
//td[text()='Germany']/ancestor::* --> it will return all ancestor element 
//td[text()='Germany']/ancestor::table --> it will return only table element , it is specific  element based on tag 

// get ancestor <table> of the "Geramany" cell
const table=page.locator("//td[text()='Germany']/ancestor::table")
await expect(table).toHaveCount(1);

// 5. descendent axis-->
// get all  <td>  elements under the table
//td[text()='Germany']/ancestor::table/descendant::td --> return specific td 
//td[text()='Germany']/ancestor::table/descendant::*  and //table[@id='customers']/descendant::*  --> return all td here both xapth are same


const allTds=page.locator("//table[@id='customers']/descendant::td");
await expect(allTds).toHaveCount(18);

// 6. following axis--> Get the all <td> to the Right   side of any  cell
// Get the <td> that comes  after germany in document order
//td[normalize-space()='Germany']/following::td  --> it will return all td after germany
//td[normalize-space()='Germany']/following::td[1] --> it will first td after germany cell 
//td[normalize-space()='Germany']/following-sibling::td --> it will all td which are sibling i.e in same row next to germany cell not after germany cell
// but here there in no following sibling germany cell hemce it will return 0
const followingCell =page.locator("//td[normalize-space()='Germany']/following::td[1]")
expect(followingCell).toHaveText("Centro comercial Moctezuma");

// 7. following-sibling  axis-->-->Get the <td> to the right  side of any cell but on the same row 
//  Get the <td> to the Right side of germany cell
//td[normalize-space()='Germany']/following-sibling::td --> return 0 since there is no cell right side of "germany" cell

// example 1:- find number of sibling right after "germany"  cell in table 
const rightSide=page.locator("//td[normalize-space()='Germany']/following-sibling::td")
await expect(rightSide).toHaveCount(0);

// example 2:- find number of sibling right after Centro comercial Moctezuma cell in table 
//td[normalize-space()='Centro comercial Moctezuma']/following-sibling::td
const followingSbling=page.locator("//td[normalize-space()='Centro comercial Moctezuma']/following-sibling::td")
await expect(followingSbling).toHaveCount(2);

// 8. preceding-->Get the all <td> to the left  side of any  cell

//td[normalize-space()='Germany']/preceding::td --> return 2  td
//td[normalize-space()='Germany']/preceding::td[1] --> specific td return 1 td
//td[normalize-space()='UK']/preceding::td --> 11 tds
const precidingCell=page.locator("//td[normalize-space()='Germany']/preceding::td[1]")


// 9. preceding-sibling -->Get the <td> to the left  side of any cell but on the same row 
//td[normalize-space()='Germany']/preceding-sibling::td --> 2  td
//td[normalize-space()='Germany']/preceding-sibling::td[1] --> specific td return 1 td
//td[normalize-space()='UK']/preceding-sibling::td  --> 2  td
//td[normalize-space()='Maria Anders']/preceding-sibling::td --> 1 Tds
const leftSibling=page.locator("//td[normalize-space()='Germany']/preceding-sibling::td ")
await expect(leftSibling).toHaveCount(2);

expect(leftSibling.nth(0)).toHaveText("Alfreds Futterkiste");
expect(leftSibling.nth(1)).toHaveText("Maria Anders");
})