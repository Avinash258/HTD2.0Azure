import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * InventoryPage - Page Object Model for the Sauce Demo inventory/dashboard page
 */
export class InventoryPage extends BasePage {
  // Locators
  readonly inventoryList: Locator;
  readonly inventoryItems: Locator;
  readonly sortDropdown: Locator;
  readonly cartBadge: Locator;
  readonly cartLink: Locator;
  readonly addToCartButton: Locator;

  constructor(page: Page) {
    super(page);
    // Initialize locators using data-test attributes
    this.inventoryList = page.locator('[data-test="inventory-list"]');
    this.inventoryItems = page.locator('[data-test="inventory-item"]');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
    this.addToCartButton = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
  }

  /**
   * Verify inventory page is loaded
   */
  async isInventoryPageLoaded(): Promise<boolean> {
    return await this.isElementVisible(this.inventoryList);
  }

  /**
   * Get count of inventory items displayed
   */
  async getInventoryItemCount(): Promise<number> {
    return await this.inventoryItems.count();
  }

  /**
   * Verify page title
   */
  async verifyPageTitle(expectedTitle: string): Promise<boolean> {
    const title = await this.getPageTitle();
    return title === expectedTitle;
  }

  /**
   * Add specific item to cart by data-test ID
   */
  async addItemToCart(itemId: string): Promise<void> {
    const addButton = this.page.locator(`[data-test="add-to-cart-${itemId}"]`);
    await addButton.click();
  }

  /**
   * Add default item (Backpack) to cart
   */
  async addBackpackToCart(): Promise<void> {
    await this.addToCartButton.click();
  }

  /**
   * Get cart badge count
   */
  async getCartBadgeCount(): Promise<string | null> {
    return await this.cartBadge.textContent();
  }

  /**
   * Check if cart badge is visible
   */
  async isCartBadgeVisible(): Promise<boolean> {
    return await this.cartBadge.isVisible();
  }

  /**
   * Click on cart link
   */
  async goToCart(): Promise<void> {
    await this.cartLink.click();
  }
}
