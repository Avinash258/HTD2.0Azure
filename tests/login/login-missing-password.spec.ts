import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages';
import * as loginData from '../../testData/loginCredentials.json';

test.describe('1.6 - Login with missing password', () => {
  test('Verify login blocked when password is missing', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    expect(await loginPage.isLoginPageLoaded()).toBe(true);
    await loginPage.enterUsername(loginData.validCredentials.username);
    expect(await loginPage.getUsernameValue()).toBe(loginData.validCredentials.username);
    expect(await loginPage.getPasswordValue()).toBe('');
    await loginPage.clickLoginButton();
    expect(await loginPage.isErrorMessageVisible()).toBe(true);
    expect((await loginPage.getErrorMessage()).toLowerCase()).toContain('required');
  });
});
