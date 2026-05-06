import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages';
import * as loginData from '../../testData/loginCredentials.json';

test.describe('Locked Out User Scenario', () => {
  test('Verify locked out user receives error', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    expect(await loginPage.isLoginPageLoaded()).toBe(true);
    await loginPage.login(loginData.lockedOutUser.username, loginData.lockedOutUser.password);
    expect(await loginPage.isErrorMessageVisible()).toBe(true);
    expect((await loginPage.getErrorMessage()).toLowerCase()).toContain('locked out');
  });
});
