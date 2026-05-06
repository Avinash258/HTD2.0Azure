# HTD 2.0 Azure - Playwright Test Framework

Page Object Model structure for Sauce Demo automated testing.

## 📁 Project Structure

```
d:\HTD2.0Azure\
│
├── pages/                          # Page Object Models
│   ├── BasePage.ts                # Common base methods
│   ├── LoginPage.ts               # Login page interactions
│   ├── InventoryPage.ts           # Inventory page interactions
│   └── index.ts                   # Page exports
│
├── testData/                       # Test data (JSON format)
│   ├── loginCredentials.json      # User credentials
│   ├── pageData.json              # Page element data
│   └── inventoryData.json         # Product/inventory data
│
├── testPlan/                       # Test plan documentation
│   ├── saucedemo-login-plan.md    # Login feature test plan
│   ├── TEST_PLAN_TEMPLATE.md      # Template for new test plans
│   └── README.md                  # Test plan guidelines
│
├── tests/                          # Test specifications
│   ├── login.spec.ts              # Login test suite
│   ├── inventory.spec.ts          # Inventory test suite
│   └── advanced-login.spec.ts     # Advanced login patterns
│
├── utils/                          # Utility files
│   ├── fixtures.ts                # Test fixtures
│   ├── testConstants.ts           # Test constants
│   └── testHelpers.ts             # Helper functions
│
├── playwright.config.ts            # Playwright configuration
├── package.json                    # Dependencies & scripts
└── FRAMEWORK_STRUCTURE.md          # Framework documentation
```

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ installed
- npm or yarn package manager

### Installation

```bash
# Install dependencies
npm install

# Install Playwright browsers
npx playwright install
```

## 🧪 Running Tests

```bash
# Run all tests
npm test

# Run tests in UI mode (interactive)
npm run test:ui

# Run tests in headed mode (see browser)
npm run test:headed

# Run specific test file
npm run test:login
npm run test:inventory

# Run tests in debug mode
npm run test:debug

# View test report
npm run report
```

## 📋 Test Plans

All test plan documentation is housed in the `testPlan/` folder:

- **[saucedemo-login-plan.md](testPlan/saucedemo-login-plan.md)** - Login feature test scenarios
- **[TEST_PLAN_TEMPLATE.md](testPlan/TEST_PLAN_TEMPLATE.md)** - Template for creating new test plans
- **[README.md](testPlan/README.md)** - Guidelines and conventions for test plans

### Creating New Test Plans

1. Create a new `.md` file in the `testPlan/` folder
2. Follow the template structure in `TEST_PLAN_TEMPLATE.md`
3. Use kebab-case naming: `feature-name-plan.md`
4. Include clear steps, expectations, and references to implementation

## 📖 Page Object Model Structure

### Creating a New Page Object

1. **Create file in `pages/` folder**

```typescript
// pages/CheckoutPage.ts
import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutPage extends BasePage {
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;

  constructor(page: Page) {
    super(page);
    this.firstNameInput = page.locator('input[name="first-name"]');
    this.lastNameInput = page.locator('input[name="last-name"]');
    this.postalCodeInput = page.locator('input[name="postalCode"]');
    this.continueButton = page.locator('#continue');
  }

  async fillCheckoutInfo(firstName: string, lastName: string, postalCode: string): Promise<void> {
    await this.fillInput(this.firstNameInput, firstName);
    await this.fillInput(this.lastNameInput, lastName);
    await this.fillInput(this.postalCodeInput, postalCode);
  }

  async clickContinue(): Promise<void> {
    await this.clickElement(this.continueButton);
  }
}
```

2. **Export from `pages/index.ts`**

```typescript
export { CheckoutPage } from './CheckoutPage';
```

## 📊 Test Data Management

### JSON Format Structure

```json
{
  "validCredentials": {
    "username": "standard_user",
    "password": "secret_sauce"
  },
  "testUser": {
    "username": "test_user",
    "password": "test_password"
  }
}
```

### Using Test Data in Tests

```typescript
import * as loginData from '../testData/loginCredentials.json';

test('Login with valid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.login(
    loginData.validCredentials.username,
    loginData.validCredentials.password
  );
});
```

## 🛠️ Using Fixtures and Utilities

### Test Fixtures

Pre-configured page objects and authenticated states:

```typescript
import { test, expect } from '../utils/fixtures';

test('Test with authenticated user', async ({ authenticatedPage }) => {
  // Already logged in, on inventory page
  expect(authenticatedPage.url()).toContain('inventory');
});

test('Test with login page', async ({ loginPage }) => {
  await loginPage.goto();
  expect(await loginPage.isLoginPageLoaded()).toBe(true);
});
```

### Test Constants

```typescript
import { TEST_URLS, TEST_TIMEOUTS, VALID_USERS } from '../utils/testConstants';

test('Use constants', async ({ page }) => {
  await page.goto(TEST_URLS.INVENTORY);
  await page.waitForURL(TEST_URLS.INVENTORY, { timeout: TEST_TIMEOUTS.PAGE_LOAD });
});
```

### Test Helpers

```typescript
import { verifyElementsExist, delay } from '../utils/testHelpers';

test('Use helpers', async ({ page }) => {
  const selectors = ['#username', '#password', '#login'];
  const allExist = await verifyElementsExist(page, selectors);
  expect(allExist).toBe(true);

  await delay(2000); // Wait 2 seconds
});
```

## ✅ Best Practices

### 1. Page Object Methods Should Be Descriptive
```typescript
// Good
async login(username: string, password: string): Promise<void>

// Bad
async fillAndClick(): Promise<void>
```

### 2. Keep Locators Centralized
```typescript
// Page objects define all locators
export class LoginPage extends BasePage {
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  // ... methods use these locators
}
```

### 3. Organize Test Data by Feature
```
testData/
  ├── loginCredentials.json      # Login data
  ├── pageData.json              # Page structure data
  └── inventoryData.json         # Product/inventory data
```

### 4. Use Proper Wait Strategies
```typescript
// Good - wait for navigation
await page.waitForURL('**/inventory.html');

// Bad - arbitrary delays
await page.waitForTimeout(2000);
```

### 5. Test Data in JSON, Logic in Code
```typescript
// JSON: Test data
{
  "validUser": {
    "username": "standard_user",
    "password": "secret_sauce"
  }
}

// TypeScript: Test logic
await loginPage.login(testData.validUser.username, testData.validUser.password);
```

## 🔍 Test Examples

### Simple Login Test
```typescript
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages';
import * as loginData from '../testData/loginCredentials.json';

test('Login with valid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  
  await loginPage.login(
    loginData.validCredentials.username,
    loginData.validCredentials.password
  );
  
  await page.waitForURL('**/inventory.html');
  expect(page.url()).toContain('inventory');
});
```

### Multi-Scenario Test
```typescript
test('Test multiple login scenarios', async ({ page }) => {
  const loginPage = new LoginPage(page);

  // Scenario 1: Valid login
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
  await page.waitForURL('**/inventory.html');

  // Scenario 2: Invalid credentials
  await page.goto('https://www.saucedemo.com/');
  await loginPage.login('invalid', 'wrong');
  expect(await loginPage.isErrorMessageVisible()).toBe(true);
});
```

### Using Fixtures
```typescript
test('Use authenticated fixture', async ({ authenticatedPage, inventoryPage }) => {
  // Already logged in via fixture
  expect(await inventoryPage.isInventoryPageLoaded()).toBe(true);
  
  const itemCount = await inventoryPage.getInventoryItemCount();
  expect(itemCount).toBeGreaterThan(0);
});
```

## 🐛 Debugging Tests

```bash
# Run in debug mode with inspector
npm run test:debug

# Run headed (see browser)
npm run test:headed

# Run specific test with logging
npx playwright test tests/login.spec.ts --debug
```

## 📈 Test Reports

```bash
# View HTML report
npm run report
```

## 🤝 Contributing

When adding new tests:
1. Create page objects in `pages/` folder
2. Add test data to `testData/` folder (JSON format)
3. Write tests using page objects
4. Use existing fixtures and helpers
5. Follow naming conventions

## 📝 File Naming Conventions

- **Page Objects**: `PascalCasePageName.ts` (e.g., `LoginPage.ts`)
- **Test Files**: `kebab-case.spec.ts` (e.g., `login.spec.ts`)
- **Test Data**: `kebab-case.json` (e.g., `login-credentials.json`)
- **Utilities**: `camelCase.ts` (e.g., `testHelpers.ts`)

## 🆘 Troubleshooting

### Tests timing out
- Check `TEST_TIMEOUTS` in `utils/testConstants.ts`
- Verify page load times
- Ensure selectors are correct

### Selectors not found
- Use Playwright Inspector: `npx playwright codegen https://www.saucedemo.com/`
- Check if selectors exist in `pages/` objects
- Verify test data URLs are correct

### Authentication issues
- Ensure credentials in `testData/loginCredentials.json` are valid
- Check authentication flow hasn't changed
- Use `authenticatedPage` fixture for pre-logged tests

## 📚 Resources

- [Playwright Documentation](https://playwright.dev)
- [Page Object Model Guide](https://playwright.dev/docs/pom)
- [Best Practices](https://playwright.dev/docs/best-practices)

## 📄 License

ISC
