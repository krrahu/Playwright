
     //<=========== Handle Dialogs(Alert,Confirm &Prompt),Frames & Inner Frames==========>
     // alert(),confirm(),prompt() dialogs/jsalerts

//1.  bydefault dialogs are auto dismissed by playwright , so we don't have to handle them but in seenium we have handled
// if we wants to perform any action on alert in palywright we have to use evemt logic to handle it, 
// we can use page.on("dialog",async(dialog)=>{await dialog.accept();}) to accept the alert and 
// page.on("dialog",async(dialog)=>{await dialog.dismiss();}) to dismiss the alert

//2. however you can register a dialog handler before the action that triggers the dialog to either dialog.accept() or dialog.dismiss() it


import {test,expect,Locator} from"@playwright/test";

// 1. Simple Alert
    test(" Type 1- jQuery date picker",async({page})=>{
        await page.goto("https://testautomationpractice.blogspot.com/");
        // enable the dialog handler before the action that triggers the dialog   

        page.on("dialog", (dialog) => {
       console.log("dialog type is:", dialog.type()); // returns the type of dialog (alert, confirm, prompt, beforeunload)
      expect(dialog.type()).toBe("alert");
      console.log("dialog text is:", dialog.message()); // returns the message displayed in the dialog
        expect(dialog.message()).toContain("I am an alert box!");

       dialog.accept();

        });
        await page.locator("#alertBtn").click(); // click on alert button
        await page.waitForTimeout(3000);
    })

    // 2. Confirmation Alert
    test("Confirmation Alert",async({page})=>{
        await page.goto("https://testautomationpractice.blogspot.com/");
        // enable the dialog handler before the action that triggers the dialog   

        page.on("dialog", (dialog) => {
       console.log("dialog type is:", dialog.type()); // returns the type of dialog (alert, confirm, prompt, beforeunload)
      expect(dialog.type()).toBe("confirm");

      console.log("dialog text is:", dialog.message()); // returns the message displayed in the dialog
        expect(dialog.message()).toContain("Press a button!");

       dialog.accept(); // close the dailof by accepting
       //dialog.dismiss(); // close the dialog by dismissing

        });
        await page.locator("#confirmBtn").click(); // click on confirmation button

        const text: string = await page.locator("#demo").innerText(); // text messge after click on confirmation button
        console.log("text after confirmation alert is clicked:", text);
     expect(text).toContain("You pressed OK!"); // assertion for text after confirmation alert is clicked
       //expect(page.locator("#demo")).toHaveText("You pressed Cancel!"); // assertion for text after confirmation alert is clicked

        await page.waitForTimeout(3000);
    })

    // 3. Prompt  Alert/daialog

    test.only("Prompt  Alert/daialog",async({page})=>{
        await page.goto("https://testautomationpractice.blogspot.com/");
        
        // create  dialog handler 

        page.on("dialog", (dialog) => {
       console.log("dialog type is:", dialog.type()); // returns the type of dialog (alert, confirm, prompt, beforeunload)
      expect(dialog.type()).toBe("prompt"); // assertion for checking dialog type

      console.log("dialog text is:", dialog.message()); // returns the message displayed in the dialog
        expect(dialog.message()).toContain("Please enter your name:");

        expect(dialog.defaultValue()).toContain("Harry Potter"); // assertion for default value

       dialog.accept('jhon'); // close the dailog by accepting
       //dialog.dismiss(); // close the dialog by dismissing

        });
        await page.locator("#promptBtn").click(); // click on prompt button

        const text: string = await page.locator("#demo").innerText(); // text messge after click on prompt button
        console.log("text after  alert is clicked:", text);
     expect(text).toContain("Hello jhon! How are you today?"); // assertion for text after prompt alert is clicked
       //expect(page.locator("#demo")).toHaveText("Hello jhon! How are you today?"); // assertion for text after prompt alert is clicked

        await page.waitForTimeout(3000);
    })