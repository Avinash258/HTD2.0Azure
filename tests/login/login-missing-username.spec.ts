import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages';
import * as loginData from '../../testData/loginCredentials.json';

test.describe('1.5 - Login with missing username', () => {
  test('Verify login blocked when username is missing', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    expect(await loginPage.isLoginPageLoaded()).toBe(true);
    await loginPage.enterPassword(loginData.validCredentials.password);
    expect(await loginPage.getPasswordValue()).toBe(loginData.validCredentials.password);
    expect(await loginPage.getUsernameValue()).toBe('');
    await loginPage.clickLoginButton();
    expect(await loginPage.isErrorMessageVisible()).toBe(true);
    expect((await loginPage.getErrorMessage()).toLowerCase()).toContain('required');
  });
});
