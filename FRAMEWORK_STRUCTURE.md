# Test Framework Structure - Page Object Model

## Overview
This project uses the **Page Object Model (POM)** pattern to organize Playwright tests for better maintainability, scalability, and reusability.

## Directory Structure

```
d:\HTD2.0Azure\
├── pages/                          # Page Object Models
│   ├── BasePage.ts                # Base class with common methods
│   ├── LoginPage.ts               # Login page POM
│   ├── InventoryPage.ts           # Inventory page POM
│   └── index.ts                   # Exports all pages
│
├── testData/                       # Test data in JSON format
│   ├── loginCredentials.json      # Login test data
│   ├── pageData.json              # Page element data and messages
│   ├── inventoryData.json         # Inventory test data
│   └── [other-data].json          # Additional test data files
│
├── testPlan/                       # Test plan documentation
│   ├── saucedemo-login-plan.md    # Login feature test plan
│   ├── TEST_PLAN_TEMPLATE.md      # Template for new test plans
│   ├── README.md                  # Test plan guidelines
│   └── [other-plan].md            # Additional test plans
│
├── tests/                          # Test specification files
│   ├── login.spec.ts              # Login tests
│   ├── inventory.spec.ts          # Inventory tests
│   └── [other].spec.ts            # Additional test files
│
├── playwright.config.ts            # Playwright configuration
├── package.json                    # Dependencies
└── README.md                       # Project documentation
```

## Page Objects

### BasePage
Base class containing common methods used across all pages:
- `goto()` - Navigate to URL
- `getPageTitle()` - Get page title
- `waitForElement()` - Wait for element visibility
- `fillInput()` - Fill input fields
- `clickElement()` - Click elements
- `isElementVisible()` - Check element visibility

### LoginPage (extends BasePage)
Handles login page interactions:
- `goto()` - Navigate to login page
- `login()` - Perform login with username and password
- `enterUsername()` - Enter username
- `enterPassword()` - Enter password
- `clickLoginButton()` - Click login button
- `getErrorMessage()` - Get error message text
- `isErrorMessageVisible()` - Check if error is shown
- Other verification methods

### InventoryPage (extends BasePage)
Handles inventory/dashboard page interactions:
- `isInventoryPageLoaded()` - Verify inventory page is loaded
- `getInventoryItemCount()` - Get count of items
- Other inventory-related methods

## Test Plans

All test plan documentation is organized in the `testPlan/` folder:

### saucedemo-login-plan.md
Comprehensive test plan covering:
- Login page rendering
- Valid/invalid credentials
- Missing field validation
- Error messages
- UI/accessibility checks
- Locked out user scenarios

### TEST_PLAN_TEMPLATE.md
Template for creating new test plans with:
- Standardized structure
- Example format
- Best practices
- Naming conventions

### Guidelines (README.md)
Documentation on:
- Test plan structure
- When to create new plans
- How to reference implementations
- Naming conventions

## Test Data Files

### loginCredentials.json
Contains login credentials for different user types:
- `validCredentials` - Standard user credentials
- `lockedOutUser` - Locked out user credentials
- `problemUser` - Problem user credentials
- `invalidCredentials` - Invalid test credentials
- Other user types

### pageData.json
Contains page-specific data:
- Login page URLs, titles, and labels
- Expected error messages
- Page identifiers and selectors
- UI placeholders

### inventoryData.json
Contains inventory/product test data:
- Product information
- Sort options
- Cart operations data

## How to Use

### Writing Tests
```typescript
import { test, expect } from '@playwright/test';
import { LoginPage, InventoryPage } from '../pages';
import * as loginData from '../testData/loginCredentials.json';

test('example test', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(loginData.validCredentials.username, loginData.validCredentials.password);
});
```

### Adding New Pages
1. Create a new file in `pages/` folder (e.g., `CheckoutPage.ts`)
2. Extend `BasePage` class
3. Define locators and methods
4. Export from `pages/index.ts`

### Adding New Test Data
1. Create a new JSON file in `testData/` folder
2. Organize data logically (by feature/page)
3. Import in test files using:
   ```typescript
   import * as testData from '../testData/newData.json';
   ```

## Benefits of POM Pattern

1. **Maintainability** - Changes to UI selectors only need to be updated in one place
2. **Reusability** - Page objects can be reused across multiple tests
3. **Readability** - Tests are more readable and closer to natural language
4. **Scalability** - Easy to add new pages and tests
5. **Separation of Concerns** - UI interaction logic is separated from test logic

## Running Tests

```bash
# Run all tests
npx playwright test

# Run specific test file
npx playwright test tests/login.spec.ts

# Run in UI mode
npx playwright test --ui

# Run with specific browser
npx playwright test --project=chromium
```

## Best Practices

1. **Keep Page Objects Focused** - Each page object should handle one page/component
2. **Use Descriptive Methods** - Method names should describe what they do
3. **Centralize Locators** - Define all locators in the page object
4. **Organize Test Data** - Group related test data in JSON files by feature
5. **Use Type Safety** - Leverage TypeScript for better development experience
6. **Minimal Logic in Tests** - Move complex logic to page objects
