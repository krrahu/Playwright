    //<=========== Handle Frames & Inner Frames==========>
/*
- frame convept is totally different from selenium, in selenium we have to switch to frame and then
 perform any action on the frame but in playwright we don't have to switch to frame we can directly 
 perform any action on the frame by using frame locator concept
- two ways to handle frame in playwright  these are :-
 1. frameLocator() 
 2. frame()

 frameLocator() -->by using frame locator concept
 frame()---> by using  frame name attribute , intercating with frame , using frame URL 

*/

import {test,expect,Locator} from"@playwright/test";

// <---------Approach/Way  1-  page.frame()------>

// 1. page.frame() 
    test("Handling frames from Approach 1:",async({page})=>{
        await page.goto("https://ui.vision/demo/webtest/frames/");
        // enable the dialog handler before the action that triggers the dialog 


        // total number of frames prsent on the page
        const frames=page.frames();
    console.log("total number of frames present on the page:",frames.length);   
    
    //  by using frame url
    const frame=page.frame("https://ui.vision/demo/webtest/frames/frame_1.html"); 
    
    if(frame)
    {
        await frame.locator("[name='mytext1']").fill("Hello Frame 1"); // fill text in frame 1  css-->[name='mytext1'] or xpath--> //input[@name='mytext1']
        
        //await frame.fill("[name='mytext1']","Hello Frame 1");  --> by intercating with frame directly

    }
    else
    {
        console.log("frame not found");
    }
await page.waitForTimeout(3000);
    })

    // <---------Approach/Way  2 -  frameLocator() ------>
    test("Handling frames from Approach 2:",async({page})=>{
    page.goto("https://ui.vision/demo/webtest/frames/");
    // total number of frames prsent on the page
    const frames=page.frames();
    console.log("total number of frames present on the page:",frames.length);

   // indentify frame> intercat with element on frame> perform action on element
 //  page.frameLocator("[src='frame_1.html']").locator("[name='mytext1']").fill("Hello Frame 1"); 
   
 const inputBox=page.frameLocator("frame[src='frame_1.html']").locator("[name='mytext1']");
 inputBox.fill("john");
await page.waitForTimeout(3000);
    })

    // <===========Handle Inner/child/nested   Frames==========> (issue in capturing frame 3)

      test.only("Handling Inner/child/nested   Frames:",async({page})=>{
    await page.goto("https://ui.vision/demo/webtest/frames/");

    // frame 3
    const frame3=page.frame({url:'https://ui.vision/demo/webtest/frames/frame_3.html'});
  if(frame3)
    {
     await frame3.locator("[name='mytext3']").fill("Hello Frame 3"); // fill text in frame 3  css-->[name='mytext3'] or xpath--> //input[@name='mytext3']
    const childFrames=frame3.childFrames();
    console.log("total number of child frames present in frame 3:",childFrames.length); // only 1 child frame exist
    const radio=childFrames[0].getByLabel(" I am a human"); // if there is mulitple child frame than just pass index number
    await radio.check(); // check the radio button in child frame
   await expect(radio).toBeChecked(); // assertion for radio button checked

    }
    else
    {
        console.log("frame 3 not found");
    }

     await page.waitForTimeout(3000);
    })

    // assignment in the same site--> handle  frame 1 to 5 and send text in all frames  and at frame 5 click the link and verufy the logo is psent or not

