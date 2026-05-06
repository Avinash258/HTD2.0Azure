import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages';
import * as pageData from '../../testData/pageData.json';

test.describe('1.1 - Login page renders correctly', () => {
  test('Verify login page loads with correct title and form elements', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    expect(await loginPage.isLoginPageLoaded()).toBe(true);
    expect(await loginPage.getPageTitle()).toBe(pageData.loginPage.pageTitle);
    expect(await loginPage.isUsernameFieldVisible()).toBe(true);
    expect(await loginPage.isPasswordFieldVisible()).toBe(true);
    expect(await loginPage.isLoginButtonReady()).toBe(true);
  });
});
