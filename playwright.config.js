// @ts-check
import { defineConfig, devices } from '@playwright/test';


/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({
  testDir: './tests',
  timeout: 40 * 10000,
  expect: {
    timeout: 40 * 10000,
  },
  reporter: 'html',

  use: {
    browserName: 'webkit',
    headless: false

  },

});

module.exports = config
