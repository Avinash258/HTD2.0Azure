import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

/**
 * CheckoutPage - Page Object Model for Sauce Demo checkout pages (Steps 1, 2, and Complete)
 */
export class CheckoutPage extends BasePage {
  // Step 1 Locators - User Information
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly cancelButton: Locator;
  readonly continueButton: Locator;
  readonly errorMessage: Locator;
  readonly errorCloseButton: Locator;
  readonly pageTitle: Locator;

  // Step 2 Locators - Order Overview
  readonly cartItems: Locator;
  readonly paymentInfo: Locator;
  readonly shippingInfo: Locator;
  readonly itemTotal: Locator;
  readonly tax: Locator;
  readonly totalAmount: Locator;
  readonly finishButton: Locator;

  // Complete Page Locators
  readonly confirmationHeading: Locator;
  readonly confirmationMessage: Locator;
  readonly ponyExpressImage: Locator;
  readonly backHomeButton: Locator;

  constructor(page: Page) {
    super(page);
    
    // Step 1 locators using Playwright default locators
    this.firstNameInput = page.getByTestId('firstName');
    this.lastNameInput = page.getByTestId('lastName');
    this.postalCodeInput = page.getByTestId('postalCode');
    this.cancelButton = page.getByTestId('cancel');
    this.continueButton = page.getByTestId('continue');
    this.errorMessage = page.getByTestId('error');
    this.errorCloseButton = page.getByTestId('error-button');
    this.pageTitle = page.getByTestId('title');

    // Step 2 locators
    this.cartItems = page.getByTestId('inventory-item');
    this.paymentInfo = page.getByText('Payment Information');
    this.shippingInfo = page.getByText('Shipping Information');
    this.itemTotal = page.getByText('Item total:');
    this.tax = page.getByText('Tax:');
    this.totalAmount = page.getByText('Total:');
    this.finishButton = page.getByTestId('finish');

    // Complete page locators
    this.confirmationHeading = page.getByRole('heading', { name: /thank you for your order/i });
    this.confirmationMessage = page.getByText(/Your order has been dispatched/i);
    this.ponyExpressImage = page.getByAltText('Pony Express');
    this.backHomeButton = page.getByTestId('back-to-products');
  }

  /**
   * Verify Step 1 form is loaded
   */
  async isCheckoutStep1Loaded(): Promise<boolean> {
    return await this.firstNameInput.isVisible();
  }

  /**
   * Verify Step 2 overview is loaded
   */
  async isCheckoutStep2Loaded(): Promise<boolean> {
    return await this.finishButton.isVisible();
  }

  /**
   * Verify completion page is loaded
   */
  async isCheckoutCompleteLoaded(): Promise<boolean> {
    return await this.confirmationHeading.isVisible();
  }

  /**
   * Get page title
   */
  async getCheckoutPageTitle(): Promise<string | null> {
    return await this.pageTitle.textContent();
  }

  /**
   * Fill user information (Step 1)
   */
  async fillUserInformation(
    firstName: string,
    lastName: string,
    postalCode: string
  ): Promise<void> {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  /**
   * Enter first name
   */
  async enterFirstName(firstName: string): Promise<void> {
    await this.firstNameInput.fill(firstName);
  }

  /**
   * Enter last name
   */
  async enterLastName(lastName: string): Promise<void> {
    await this.lastNameInput.fill(lastName);
  }

  /**
   * Enter postal code
   */
  async enterPostalCode(postalCode: string): Promise<void> {
    await this.postalCodeInput.fill(postalCode);
  }

  /**
   * Get first name value
   */
  async getFirstNameValue(): Promise<string | null> {
    return await this.firstNameInput.inputValue();
  }

  /**
   * Get last name value
   */
  async getLastNameValue(): Promise<string | null> {
    return await this.lastNameInput.inputValue();
  }

  /**
   * Get postal code value
   */
  async getPostalCodeValue(): Promise<string | null> {
    return await this.postalCodeInput.inputValue();
  }

  /**
   * Check if first name field is visible
   */
  async isFirstNameFieldVisible(): Promise<boolean> {
    return await this.firstNameInput.isVisible();
  }

  /**
   * Check if last name field is visible
   */
  async isLastNameFieldVisible(): Promise<boolean> {
    return await this.lastNameInput.isVisible();
  }

  /**
   * Check if postal code field is visible
   */
  async isPostalCodeFieldVisible(): Promise<boolean> {
    return await this.postalCodeInput.isVisible();
  }

  /**
   * Check if cancel button is visible
   */
  async isCancelButtonVisible(): Promise<boolean> {
    return await this.cancelButton.isVisible();
  }

  /**
   * Check if continue button is visible
   */
  async isContinueButtonVisible(): Promise<boolean> {
    return await this.continueButton.isVisible();
  }

  /**
   * Click continue button
   */
  async clickContinue(): Promise<void> {
    await this.continueButton.click();
  }

  /**
   * Click cancel button
   */
  async clickCancel(): Promise<void> {
    await this.cancelButton.click();
  }

  /**
   * Get error message text
   */
  async getErrorMessage(): Promise<string | null> {
    return await this.errorMessage.textContent();
  }

  /**
   * Check if error message is visible
   */
  async isErrorMessageVisible(): Promise<boolean> {
    return await this.errorMessage.isVisible();
  }

  /**
   * Close error message
   */
  async closeErrorMessage(): Promise<void> {
    await this.errorCloseButton.click();
  }

  /**
   * Get cart item count on Step 2
   */
  async getCartItemCount(): Promise<number> {
    return await this.cartItems.count();
  }

  /**
   * Check if payment info is visible
   */
  async isPaymentInfoVisible(): Promise<boolean> {
    return await this.paymentInfo.isVisible();
  }

  /**
   * Check if shipping info is visible
   */
  async isShippingInfoVisible(): Promise<boolean> {
    return await this.shippingInfo.isVisible();
  }

  /**
   * Get item total text
   */
  async getItemTotal(): Promise<string | null> {
    return await this.itemTotal.textContent();
  }

  /**
   * Get tax amount text
   */
  async getTaxAmount(): Promise<string | null> {
    return await this.tax.textContent();
  }

  /**
   * Get total amount text
   */
  async getTotalAmount(): Promise<string | null> {
    return await this.totalAmount.textContent();
  }

  /**
   * Click finish button
   */
  async clickFinish(): Promise<void> {
    await this.finishButton.click();
  }

  /**
   * Check if confirmation heading is visible
   */
  async isConfirmationHeadingVisible(): Promise<boolean> {
    return await this.confirmationHeading.isVisible();
  }

  /**
   * Get confirmation message text
   */
  async getConfirmationMessage(): Promise<string | null> {
    return await this.confirmationMessage.textContent();
  }

  /**
   * Check if pony express image is visible
   */
  async isPonyExpressImageVisible(): Promise<boolean> {
    return await this.ponyExpressImage.isVisible();
  }

  /**
   * Click back home button
   */
  async clickBackHome(): Promise<void> {
    await this.backHomeButton.click();
  }

  /**
   * Check if back home button is visible
   */
  async isBackHomeButtonVisible(): Promise<boolean> {
    return await this.backHomeButton.isVisible();
  }
}
