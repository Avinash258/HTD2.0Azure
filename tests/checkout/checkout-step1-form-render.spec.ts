import { test, expect } from '@playwright/test';
import { LoginPage, InventoryPage, CartPage, CheckoutPage } from '../../pages';
import * as loginData from '../../testData/loginCredentials.json';
import * as pageData from '../../testData/pageData.json';

test.describe('1.1 - Verify checkout information form displays correctly', () => {
  test('Verify checkout Step 1 form displays with all required fields', async ({ page }) => {
    // 1. Log in to Sauce Demo with valid credentials (standard_user/secret_sauce)
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    expect(await loginPage.isLoginPageLoaded()).toBe(true);
    await loginPage.login(loginData.validCredentials.username, loginData.validCredentials.password);
    await page.waitForURL('**/inventory.html', { timeout: 5000 });
    
    // Verify: Inventory page loads successfully
    const inventoryPage = new InventoryPage(page);
    expect(await inventoryPage.isInventoryPageLoaded()).toBe(true);

    // 2. Add at least one item to cart
    await inventoryPage.addBackpackToCart();
    await page.waitForTimeout(500);
    
    // Verify: Item added to cart, cart badge shows item count
    const cartBadgeCount = await inventoryPage.getCartBadgeCount();
    expect(cartBadgeCount).toBe('1');

    // 3. Navigate to cart by clicking cart icon
    await inventoryPage.goToCart();
    await page.waitForURL('**/cart.html', { timeout: 5000 });
    
    // Verify: Cart page displays with added items
    const cartPage = new CartPage(page);
    expect(await cartPage.isCartPageLoaded()).toBe(true);
    expect(await cartPage.hasCartItems()).toBe(true);

    // 4. Click Checkout button
    await cartPage.clickCheckout();
    await page.waitForURL('**/checkout-step-one.html', { timeout: 5000 });

    // Initialize CheckoutPage object
    const checkoutPage = new CheckoutPage(page);

    // Verify: Checkout Step 1 form appears with title 'Checkout: Your Information'
    expect(await checkoutPage.isCheckoutStep1Loaded()).toBe(true);
    const pageTitle = await checkoutPage.getCheckoutPageTitle();
    expect(pageTitle).toContain('Your Information');

    // Verify: First Name input field is visible
    expect(await checkoutPage.isFirstNameFieldVisible()).toBe(true);

    // Verify: Last Name input field is visible
    expect(await checkoutPage.isLastNameFieldVisible()).toBe(true);

    // Verify: Zip/Postal Code input field is visible
    expect(await checkoutPage.isPostalCodeFieldVisible()).toBe(true);

    // Verify: Cancel button is present
    expect(await checkoutPage.isCancelButtonVisible()).toBe(true);

    // Verify: Continue button is present
    expect(await checkoutPage.isContinueButtonVisible()).toBe(true);
  });
});
