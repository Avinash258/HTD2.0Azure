import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * LoginPage - Page Object Model for the Sauce Demo login page
 */
export class LoginPage extends BasePage {
  // Locators
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;
  readonly appLogo: Locator;

  constructor(page: Page) {
    super(page);
    // Initialize locators using Playwright default locators
    this.usernameInput = page.getByPlaceholder('Username');
    this.passwordInput = page.getByPlaceholder('Password');
    this.loginButton = page.getByRole('button', { name: /login/i });
    this.errorMessage = page.getByTestId('error');
    this.appLogo = page.getByAltText('Swag Labs');
  }

  /**
   * Navigate to login page
   */
  async goto(): Promise<void> {
    await super.goto('https://www.saucedemo.com/');
  }

  /**
   * Verify login page is loaded
   */
  async isLoginPageLoaded(): Promise<boolean> {
    return await this.usernameInput.isVisible();
  }

  /**
   * Verify page title
   */
  async verifyPageTitle(expectedTitle: string): Promise<boolean> {
    const title = await this.getPageTitle();
    return title === expectedTitle;
  }

  /**
   * Enter username
   */
  async enterUsername(username: string): Promise<void> {
    await this.fillInput(this.usernameInput, username);
  }

  /**
   * Enter password
   */
  async enterPassword(password: string): Promise<void> {
    await this.fillInput(this.passwordInput, password);
  }

  /**
   * Click login button
   */
  async clickLoginButton(): Promise<void> {
    await this.clickElement(this.loginButton);
  }

  /**
   * Perform login with username and password
   */
  async login(username: string, password: string): Promise<void> {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLoginButton();
  }

  /**
   * Get error message text
   */
  async getErrorMessage(): Promise<string> {
    if (await this.isErrorMessageVisible()) {
      return await this.getElementText(this.errorMessage);
    }
    return '';
  }

  /**
   * Verify error message is displayed
   */
  async isErrorMessageVisible(): Promise<boolean> {
    return await this.isElementVisible(this.errorMessage);
  }

  /**
   * Verify username field is visible
   */
  async isUsernameFieldVisible(): Promise<boolean> {
    return await this.isElementVisible(this.usernameInput);
  }

  /**
   * Verify password field is visible
   */
  async isPasswordFieldVisible(): Promise<boolean> {
    return await this.isElementVisible(this.passwordInput);
  }

  /**
   * Verify login button is visible and enabled
   */
  async isLoginButtonReady(): Promise<boolean> {
    return (
      (await this.isElementVisible(this.loginButton)) &&
      (await this.isElementEnabled(this.loginButton))
    );
  }

  /**
   * Verify Swag Labs logo is visible
   */
  async isLogoVisible(): Promise<boolean> {
    return await this.isElementVisible(this.appLogo);
  }

  /**
   * Get username field value
   */
  async getUsernameValue(): Promise<string> {
    return await this.usernameInput.inputValue();
  }

  /**
   * Get password field value
   */
  async getPasswordValue(): Promise<string> {
    return await this.passwordInput.inputValue();
  }
}
