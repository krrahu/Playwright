
import { test, expect } from "@playwright/test";

// Hard and Soft Assertions

// <=========================> 
// Hard Assertion --> if any step will failed it will not execute further line of code
test("Hard Assertion", async ({page}) => {
  await page.goto("https://demowebshop.tricentis.com/");

// hard asssrtion
await expect(page).toHaveTitle("Demo Web Shop");
await expect(page).toHaveURL("https://demowebshop.tricentis.com/")

const logo=page.locator("img[alt='Tricentis Demo Web Shop']");
await expect(logo).toBeVisible();

await page.waitForTimeout(4000);


// Soft Assertion --> if any assertion  it will still  execute further line of code

await expect.soft(page).toHaveTitle("Demo Web Shop22");// writing invalid locator
await expect.soft(page).toHaveURL("https://demowebshop.tricentis.com/")

const logo1=page.locator("img[alt='Tricentis Demo Web Shop']");
await expect(logo1).toBeVisible();

await page.waitForTimeout(4000);
})

// codgen --> 1.6 hr ( it is uesd for code genearor , it is also called as test runner)
// npx playwright codegen --> command to open code window
// npx playwright codegen -o tests/codegentest.spec.ts --> it will create test automatically
//  npx playwright codegen  -o tests/codegentest.spec.ts --browser firefox  --> on specific browser
//  npx playwright codegen  -o tests/codegentest.spec.ts --device "iphone 18"  --> on specific device i.e. simulator
//  npx playwright codegen  -o tests/codegentest.spec.ts --viewport-size "1280,720"  --> on specific screen size, viewport can also be confired at global level


// Debug -->1.33 hr 