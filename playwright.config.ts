import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  //testDir: './tests', --> specific folder name 
    testDir: '.',// --> current project 

  /* Run tests using tags */ 
  //grep:/@sanity/,
  //grepInvert:/@regression/,
  // grep:/@regression/,
  //  grep:/(?=.*@sanity)(?=.*@regression)/

  /* Run tests in files in parallel */
  fullyParallel: true, // not is seqquentially, but in parallel mode ( randomly)
//fullParallel: false, //  run in sequence wise

  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  // retries: process.env.CI ? 2 : 0, //---> use this when we wants to run it from CI cd
  retries:3, //-->  retry locally 

  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  //workers: 3, //-->  run locally in 3 workers
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    // baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    //trace: 'on',

    /* Capture screenshot on failure & pass*/
   //screenshot: 'only-on-failure',
   //  screenshot: 'on',

       /* Capture video on pass & fail */
    //video:'on',
     //video:'retain-on-failure',
  },



  /* Global timeout */
  // timeout: 5000,

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    //{
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
