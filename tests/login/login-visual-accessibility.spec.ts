import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages';
import * as pageData from '../../testData/pageData.json';

test.describe('1.7 - Login page visual and accessibility checks', () => {
  test('Verify visual elements and placeholders', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    expect(await loginPage.isLogoVisible()).toBe(true);
    expect(await loginPage.usernameInput.getAttribute('placeholder')).toBe(pageData.loginPage.placeholders.username);
    expect(await loginPage.passwordInput.getAttribute('placeholder')).toBe(pageData.loginPage.placeholders.password);
    expect((await loginPage.loginButton.getAttribute('value'))?.toLowerCase()).toContain('login');
  });

  test('Verify tab navigation order', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.usernameInput.focus();
    let focused = await page.evaluate(() => (document.activeElement as HTMLElement).getAttribute('name'));
    expect(focused).toBe('user-name');
    await page.keyboard.press('Tab');
    focused = await page.evaluate(() => (document.activeElement as HTMLElement).getAttribute('name'));
    expect(focused).toBe('password');
    await page.keyboard.press('Tab');
    focused = await page.evaluate(() => (document.activeElement as HTMLElement).getAttribute('type'));
    expect(focused).toBe('submit');
  });
});
