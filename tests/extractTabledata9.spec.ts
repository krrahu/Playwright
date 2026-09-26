import {test,expect,Locator} from"@playwright/test";


//<============ Static table handling  ==========>
test("Single  select  demo in playwright",async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");

   const table:Locator= page.locator("table[name='BookTable']  tbody") // table 
   expect(table).toBeVisible();

// 1. rows --->count numbwer of rows in a table
    // Bothe are same  --> table[name='BookTable']  tbody tr   or table[name='BookTable']  tr" 
// const row:Locator=page.locator("table[name='BookTable']  tr") // return all row including headers
const rowCount:Locator=table.locator("tr") // chaining of locators
await expect(rowCount).toHaveCount(7); // assertion approach 1

const rowc:number =await rowCount.count(); // 
console.log("number of row count:",rowc);
expect(rowc).toBe(7); // assertion approach 2

// 2. coulmns --> count number of header/coulmns

//const columns:Locator=page.locator("table[name='BookTable']  tbody tr th");
const columnCount:Locator=rowCount.locator("th"); // chaing of locators
await expect(columnCount).toHaveCount(4); // approach 1

const colmCount=await columnCount.count();
console.log("number of header/coulmn:",colmCount);
expect(colmCount).toBe(4); // approach 2

// 3. Read data fron specific row :- 
// read all data from 2nd row (index 2 means 3rd row including header )
const secondRowCells =rowCount.nth(2).locator("th"); // find 2nd row element 

const secondRowTexts:string[] =await secondRowCells.allInnerTexts();
console.log("2nd row data:",secondRowTexts); // print all data from 2nd row 
//expect(secondRowCells).toHaveText(['']);



// print 2nd row all data using loop
for(let text of secondRowTexts)
{
    console.log(text);
}


// 4. Read data fron the table (excluding header):- ( all rows & all coulmns)

const allRowdata=await rowCount.all(); // it print all row locatorsin array formate due to all() 

for (let row of allRowdata.slice(1)) // slic(1) --> it will skip /exclude header row
    {
        const cols= await row.locator('td').allInnerTexts();
        console.log(cols); // 
        console.log(cols.join('\t'));  // fomating output using join()
    } 

    // 5. print the Book name where author name is mukesh
const mukeshBooks:string[]=[];

for (let row of allRowdata.slice(1))
{
   const cells= await row.locator('td').allInnerTexts(); 
   const author=cells[1];
   const book=cells[0];
   if (author==='Mukesh')
{
    console.log('${author}\t ${book}')
    mukeshBooks.push(book);
}
}
// assertion
expect(mukeshBooks).toHaveLength(2);


// 6. calculate total price of all books

let totalPrice:number=0;
for(let row of allRowdata.slice(1))
{
const cells=await row.locator('td').allInnerTexts();
const price=cells[3]// price coumn is 3rd
totalPrice =totalPrice+parseInt(price);

}
console.log("total price of all items:",totalPrice);

expect(totalPrice).toBe(7100);// assertion






})