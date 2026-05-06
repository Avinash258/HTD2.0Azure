import { test, expect } from '@playwright/test';
import { LoginPage, InventoryPage, CartPage, CheckoutPage } from '../../pages';
import * as loginData from '../../testData/loginCredentials.json';
import * as pageData from '../../testData/pageData.json';

test.describe('1.2 - Complete checkout with valid user information', () => {
  test('Verify successful checkout progression from Step 1 to Step 2', async ({ page }) => {
    // 1. Navigate to Checkout Step 1 page with items in cart
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    expect(await loginPage.isLoginPageLoaded()).toBe(true);
    
    // Log in first
    await loginPage.login(loginData.validCredentials.username, loginData.validCredentials.password);
    await page.waitForURL('**/inventory.html', { timeout: 5000 });

    // Add item to cart
    const inventoryPage = new InventoryPage(page);
    expect(await inventoryPage.isInventoryPageLoaded()).toBe(true);
    await inventoryPage.addBackpackToCart();
    await page.waitForTimeout(500);

    // Navigate to cart
    await inventoryPage.goToCart();
    await page.waitForURL('**/cart.html', { timeout: 5000 });

    // Click Checkout
    const cartPage = new CartPage(page);
    expect(await cartPage.isCartPageLoaded()).toBe(true);
    await cartPage.clickCheckout();
    await page.waitForURL('**/checkout-step-one.html', { timeout: 5000 });
    
    // Initialize CheckoutPage object
    const checkoutPage = new CheckoutPage(page);
    
    // Verify: Checkout form displays
    expect(await checkoutPage.isCheckoutStep1Loaded()).toBe(true);

    // 2. Enter 'Avinash' in First Name field
    await checkoutPage.enterFirstName('Avinash');
    
    // Verify: First Name field contains 'Avinash'
    expect(await checkoutPage.getFirstNameValue()).toBe('Avinash');

    // 3. Enter 'Sharma' in Last Name field
    await checkoutPage.enterLastName('Sharma');
    
    // Verify: Last Name field contains 'Sharma'
    expect(await checkoutPage.getLastNameValue()).toBe('Sharma');

    // 4. Enter '12345' in Zip/Postal Code field
    await checkoutPage.enterPostalCode('12345');
    
    // Verify: Zip/Postal Code field contains '12345'
    expect(await checkoutPage.getPostalCodeValue()).toBe('12345');

    // 5. Click Continue button
    await checkoutPage.clickContinue();
    await page.waitForURL('**/checkout-step-two.html', { timeout: 5000 });

    // Verify: Page navigates to Checkout Step 2 (Order Overview)
    expect(await checkoutPage.isCheckoutStep2Loaded()).toBe(true);
    const step2Title = await checkoutPage.getCheckoutPageTitle();
    expect(step2Title).toContain('Overview');

    // Verify: URL is checkout-step-two.html
    expect(page.url()).toContain('checkout-step-two.html');
  });
});
