import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages';
import * as loginData from '../../testData/loginCredentials.json';

test.describe('1.4 - Login with invalid password', () => {
  test('Verify login fails with invalid password', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    expect(await loginPage.isLoginPageLoaded()).toBe(true);
    await loginPage.enterUsername(loginData.validCredentials.username);
    await loginPage.enterPassword(loginData.invalidCredentials.password);
    expect(await loginPage.getUsernameValue()).toBe(loginData.validCredentials.username);
    expect(await loginPage.getPasswordValue()).toBe(loginData.invalidCredentials.password);
    await loginPage.clickLoginButton();
    expect(await loginPage.isErrorMessageVisible()).toBe(true);
    expect((await loginPage.getErrorMessage()).toLowerCase()).toContain('do not match');
  });
});
