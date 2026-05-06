import { Page, Locator } from '@playwright/test';

/**
 * Base Page class - contains common actions used across all pages
 */
export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigate to a URL
   */
  async goto(url: string): Promise<void> {
    await this.page.goto(url);
  }

  /**
   * Get page title
   */
  async getPageTitle(): Promise<string> {
    return await this.page.title();
  }

  /**
   * Wait for element to be visible
   */
  async waitForElement(locator: Locator, timeout?: number): Promise<void> {
    await locator.waitFor({ state: 'visible', timeout });
  }

  /**
   * Get text content of an element
   */
  async getElementText(locator: Locator): Promise<string> {
    return await locator.textContent() || '';
  }

  /**
   * Check if element is visible
   */
  async isElementVisible(locator: Locator): Promise<boolean> {
    return await locator.isVisible();
  }

  /**
   * Check if element is enabled
   */
  async isElementEnabled(locator: Locator): Promise<boolean> {
    return await locator.isEnabled();
  }

  /**
   * Fill input field with text
   */
  async fillInput(locator: Locator, text: string): Promise<void> {
    await locator.fill(text);
  }

  /**
   * Click on an element
   */
  async clickElement(locator: Locator): Promise<void> {
    await locator.click();
  }
}
