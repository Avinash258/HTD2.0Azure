import { Page } from '@playwright/test';

/**
 * Utility functions for common test operations
 */

/**
 * Load JSON test data file
 */
export function loadTestData(filePath: string): any {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    return require(filePath);
  } catch (error) {
    throw new Error(`Failed to load test data from ${filePath}: ${error}`);
  }
}

/**
 * Wait for page navigation
 */
export async function waitForNavigation(
  page: Page,
  urlPattern: string,
  timeout = 5000
): Promise<void> {
  await page.waitForURL(urlPattern, { timeout });
}

/**
 * Clear input field
 */
export async function clearInput(
  page: Page,
  selector: string
): Promise<void> {
  const input = page.locator(selector);
  await input.fill('');
}

/**
 * Delay execution for a specified time (in milliseconds)
 */
export async function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Take screenshot of element
 */
export async function takeElementScreenshot(
  page: Page,
  selector: string,
  filename: string
): Promise<void> {
  const element = page.locator(selector);
  await element.screenshot({ path: `screenshots/${filename}.png` });
}

/**
 * Get all text content from multiple elements
 */
export async function getAllElementTexts(
  page: Page,
  selector: string
): Promise<string[]> {
  return await page.locator(selector).allTextContents();
}

/**
 * Verify multiple elements exist
 */
export async function verifyElementsExist(
  page: Page,
  selectors: string[]
): Promise<boolean> {
  for (const selector of selectors) {
    const element = page.locator(selector);
    if (!(await element.isVisible())) {
      return false;
    }
  }
  return true;
}

/**
 * Get text from locator and verify it contains expected text
 */
export async function verifyTextContent(
  locator: any,
  expectedText: string
): Promise<boolean> {
  const text = await locator.textContent();
  return text?.includes(expectedText) || false;
}
