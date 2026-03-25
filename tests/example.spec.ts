import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});






/*import {test, expect} from '@playwright/test'


test("Basic of playwright", async function(){

  // Test steps will go inside the function

})

// async - await

test("Login into application using valid cerds",async ({page})=>{
     // launch the browser
     // await launch the url
     // await fill the username
     // await fill the password
     // await click on login button
     // await validate if the test is successful
  
     // Js - TS - Asynchronous

    await page.goto("https://practicetestautomation.com/practice-test-login/")
    await page.getByLabel("Username").nth(0).fill("student")
    await page.locator("input#password").fill("Password123")
    await page.getByRole('button', {name:'Submit', exact:true}).last().click()
    await expect(page.locator("h1.post-title")).toHaveText("Logged In Successfully")

})

// page and browser fixture

// css selector
// xpath
// Playwright specific get By locators */