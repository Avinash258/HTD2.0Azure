import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

/**
 * CartPage - Page Object Model for the Sauce Demo shopping cart page
 */
export class CartPage extends BasePage {
  // Locators
  readonly cartItems: Locator;
  readonly cartItemName: Locator;
  readonly continueShoppingButton: Locator;
  readonly checkoutButton: Locator;
  readonly removeButton: Locator;
  readonly pageTitle: Locator;

  constructor(page: Page) {
    super(page);
    // Initialize locators using Playwright default locators
    this.cartItems = page.getByTestId('inventory-item');
    this.cartItemName = page.getByTestId('inventory-item-name');
    this.continueShoppingButton = page.getByRole('button', { name: /continue shopping/i });
    this.checkoutButton = page.getByTestId('checkout');
    this.removeButton = page.getByRole('button', { name: /remove/i });
    this.pageTitle = page.getByTestId('title');
  }

  /**
   * Navigate to cart page
   */
  async goto(): Promise<void> {
    await super.goto("https://www.saucedemo.com/cart.html");
  }

  /**
   * Verify cart page is loaded
   */
  async isCartPageLoaded(): Promise<boolean> {
    return await this.pageTitle.isVisible();
  }

  /**
   * Get count of items in cart
   */
  async getCartItemCount(): Promise<number> {
    return await this.cartItems.count();
  }

  /**
   * Verify cart contains items
   */
  async hasCartItems(): Promise<boolean> {
    const count = await this.getCartItemCount();
    return count > 0;
  }

  /**
   * Get first cart item name
   */
  async getFirstCartItemName(): Promise<string | null> {
    return await this.cartItemName.first().textContent();
  }

  /**
   * Click continue shopping button
   */
  async clickContinueShopping(): Promise<void> {
    await this.continueShoppingButton.click();
  }

  /**
   * Click checkout button
   */
  async clickCheckout(): Promise<void> {
    await this.checkoutButton.click();
  }

  /**
   * Remove item from cart
   */
  async removeItem(index: number = 0): Promise<void> {
    const removeButtons = await this.removeButton.all();
    if (removeButtons[index]) {
      await removeButtons[index].click();
    }
  }

  /**
   * Verify cart page title
   */
  async getPageTitle(): Promise<string | null> {
    return await this.pageTitle.textContent();
  }
}
