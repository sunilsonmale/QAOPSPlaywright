// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */


const config = ({
  testDir: './tests',
  timeout: 30 * 1000,
  retries : 1,
  workers:6,
  expect: {
    timeout: 5000,
  },

  reporter: 'html',

  projects: [
    {
      name: "safari",
      use: {
        //browserName:'chromium',
        browserName: 'webkit',
        headless: false,
        screenshot: 'on',
        trace: 'on',
        //...devices["iPhone 11"]

      }

    },
    {
      name: "chrome",
      use: {
        browserName: 'chromium',
        //browserName: 'webkit',
        headless: false,
        screenshot: 'on',
        trace: 'on',
        video: 'on',
        ignoreHttpsErrors:true,
        Permissions: ['geolocation'],
        viewport: { width: 1920, height: 1280 }

      },


    },
    {
      name: "firefox",
      use: {
        browserName: 'firefox',
        //browserName: 'webkit',
        headless: false,
        screenshot: 'on',
        trace: 'on',

      },


    }
  ]




});

module.exports = config

