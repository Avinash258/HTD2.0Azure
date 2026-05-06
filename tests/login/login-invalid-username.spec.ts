import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages';
import * as loginData from '../../testData/loginCredentials.json';

test.describe('1.3 - Login with invalid username', () => {
  test('Verify login fails with invalid username', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    expect(await loginPage.isLoginPageLoaded()).toBe(true);
    await loginPage.enterUsername(loginData.invalidCredentials.username);
    expect(await loginPage.getUsernameValue()).toBe(loginData.invalidCredentials.username);
    await loginPage.enterPassword(loginData.validCredentials.password);
    expect(await loginPage.getPasswordValue()).toBe(loginData.validCredentials.password);
    await loginPage.clickLoginButton();
    expect(await loginPage.isErrorMessageVisible()).toBe(true);
    expect((await loginPage.getErrorMessage()).toLowerCase()).toContain('do not match');
  });
});
