# Test Plan Templates

## Structure for Writing Test Plans

When creating a new test plan, follow this structure:

```markdown
# [Feature Name] Test Plan

## Application Overview
Brief description of what the feature does and scope of testing.

## Test Scenarios

### [Feature Group/Module]

#### [Scenario Number]. [Scenario Name]

**File:** `testPlan/[scenario-name]-plan.md`

**Steps:**
  1. [Action/Navigation]
    - expect: [Expected Result 1]
    - expect: [Expected Result 2]
  2. [Action]
    - expect: [Expected Result]

## Test Coverage
Summary of test scenarios covered and any edge cases.

## Notes
Any special considerations or dependencies.
```

## Example Test Plans

### Login Feature Test Plan
- Located in: `saucedemo-login-plan.md`
- Coverage: 7 test scenarios
- Tests: Page rendering, valid/invalid credentials, missing fields, accessibility

## Adding New Test Plans

1. Create a markdown file: `[feature-name]-plan.md`
2. Follow the structure above
3. Include:
   - Clear scenario descriptions
   - Step-by-step actions
   - Expected results for each step
   - References to test file locations

## Test Plan Naming Convention

- Use kebab-case for file names: `feature-name-plan.md`
- Use descriptive names that indicate the feature being tested
- Examples:
  - `checkout-flow-plan.md`
  - `product-filter-plan.md`
  - `cart-management-plan.md`
  - `user-profile-plan.md`

## Linking to Implementation

Each test plan should reference:
- **Test File:** Where the test implementation is located (e.g., `tests/login.spec.ts`)
- **Page Objects:** Which page objects are used (e.g., `LoginPage.ts`)
- **Test Data:** Which JSON data files are needed (e.g., `loginCredentials.json`)
