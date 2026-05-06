import { test, expect } from '@playwright/test';
import { LoginPage, InventoryPage } from '../../pages';
import * as loginData from '../../testData/loginCredentials.json';

test.describe('1.2 - Login with valid credentials', () => {
  test('Verify successful login with valid username and password', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    expect(await loginPage.isLoginPageLoaded()).toBe(true);
    await loginPage.enterUsername(loginData.validCredentials.username);
    expect(await loginPage.getUsernameValue()).toBe(loginData.validCredentials.username);
    await loginPage.enterPassword(loginData.validCredentials.password);
    expect(await loginPage.getPasswordValue()).toBe(loginData.validCredentials.password);
    await loginPage.clickLoginButton();
    await page.waitForURL('**/inventory.html', { timeout: 5000 });
    const inventoryPage = new InventoryPage(page);
    expect(await inventoryPage.isInventoryPageLoaded()).toBe(true);
  });
});
