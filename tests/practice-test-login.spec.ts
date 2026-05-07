import { test, expect } from '@playwright/test';
import { LoginPage } from './pageobject/LoginPage';
import { LoggedInPage } from './pageobject/LoggedInPage';

const baseUrl = 'https://practicetestautomation.com/practice-test-login/';
const validUsername = 'student';
const validPassword = 'Password123';

test.describe('Practice Test Login', () => {
  let loginPage: LoginPage;
  let loggedInPage: LoggedInPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.gotoLoginPage();
    await expect(loginPage.usernameInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.submitButton).toBeVisible();
  });

  test('Positive login with valid credentials', async () => {
    await loginPage.login(validUsername, validPassword);
    await expect(loginPage.page).toHaveURL(/logged-in-successfully/);
    loggedInPage = new LoggedInPage(loginPage.page);
    await expect(loggedInPage.successHeading).toBeVisible();
    await expect(loggedInPage.successMessage).toContainText('Congratulations');
    await expect(loggedInPage.logoutLink).toBeVisible();
  });

  test('Negative login with invalid username', async () => {
    await loginPage.login('incorrectUser', validPassword);
    await expect(loginPage.page).toHaveURL(baseUrl);
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toHaveText('Your username is invalid!');
  });

  test('Negative login with invalid password', async () => {
    await loginPage.login(validUsername, 'incorrectPassword');
    await expect(loginPage.page).toHaveURL(baseUrl);
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toHaveText('Your password is invalid!');
  });

  test('Negative login with both username and password invalid', async () => {
    await loginPage.login('wrongUser', 'wrongPass');
    await expect(loginPage.page).toHaveURL(baseUrl);
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toHaveText('Your username is invalid!');
  });

  test('Negative login with blank username', async () => {
    await loginPage.login('', validPassword);
    await expect(loginPage.page).toHaveURL(baseUrl);
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toHaveText('Your username is invalid!');
  });

  test('Negative login with blank password', async () => {
    await loginPage.login(validUsername, '');
    await expect(loginPage.page).toHaveURL(baseUrl);
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toHaveText('Your password is invalid!');
  });

  test('Edge case: username case sensitivity', async () => {
    await loginPage.login('Student', validPassword);
    await expect(loginPage.page).toHaveURL(baseUrl);
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toHaveText('Your username is invalid!');
  });

  test('Edge case: logout returns to login page', async () => {
    await loginPage.login(validUsername, validPassword);
    loggedInPage = new LoggedInPage(loginPage.page);
    await expect(loginPage.page).toHaveURL(/logged-in-successfully/);
    await expect(loggedInPage.logoutLink).toBeVisible();

    await loggedInPage.logout();
    await expect(loginPage.page).toHaveURL(baseUrl);
    await expect(loginPage.usernameInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.submitButton).toBeVisible();
  });
});
