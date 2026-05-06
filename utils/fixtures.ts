/**
 * Fixtures for setting up test data and common test conditions
 */

import { test as base, Page } from '@playwright/test';
import { LoginPage, InventoryPage } from '../pages';

type TestFixtures = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  authenticatedPage: Page;
};

export const test = base.extend<TestFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  inventoryPage: async ({ page }, use) => {
    const inventoryPage = new InventoryPage(page);
    await use(inventoryPage);
  },

  authenticatedPage: async ({ page }, use) => {
    // Login before test
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await page.waitForURL('**/inventory.html');

    await use(page);
  },
});

export { expect } from '@playwright/test';
