/*<-============ Hooks ============----------->
  hooks concept is used to run any specific code before or after test exceution
  beforeEach()--> it will execute before every Test()  --> use for login
  afterEach()--> it will execute after every Test()  --> use for logout
  beforeAll() --> it will execute only once before first execution start   i.e. before Test1 --> use it to set up some connection like read json, databae connection etc for  before execution of 
  afterAll() --> it will execute only once after  last execution comaplted i.e after  Test4 --> use at after all execution completed like remove connection , generate report etc.
  */

import { Page,test,expect,Locator } from "@playwright/test";

// <-----beforeAll() and afterAll()-------->//

test.beforeAll("beforeAll",async({page})=>{
console.log("  it will execute only once before first execution start   i.e. before Test1 ()")

})

test.afterAll("afterAll",async({page})=>{
console.log("  it will  execute only once after  last execution comaplted i.e after  Test4() ")

})

// <-----beforeEach() and afterEach()-------->//
test.beforeEach("beforeEach",async({page})=>{
console.log(" it will execute before every Test()")

})

test.afterEach("Aftereach ",async({page})=>{
console.log("it will execute after every Test()");
})


// <-----Test ()-------->//
    test('Test 1', async ({ page }) => {
        console.log("THis is from Test1...")
    });

    test('Test 2', async ({ page }) => {
        
        console.log("THis is from Test2...")
    });


test('Test 3', async ({ page }) => {
    
    console.log("THis is from Test3...")
 
});
test('Test 4', async ({ page }) => {

    console.log("THis is from Test3...")
 
});

