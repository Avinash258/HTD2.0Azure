# Sauce Demo Login Test Plan

## Application Overview

Test plan for the Sauce Demo login page at https://www.saucedemo.com/, covering valid login, invalid credentials, missing fields, and UI verification.

## Test Scenarios

### 1. Sauce Demo Login

**Seed:** `tests/seed.spec.ts`

#### 1.1. Login page renders correctly

**File:** `specs/saucedemo-login-plan.md`

**Steps:**
  1. -
    - expect: The page loads successfully at https://www.saucedemo.com/
    - expect: The browser title is 'Swag Labs'
    - expect: The login form displays 'Username' and 'Password' input fields
    - expect: The 'Login' button is present and enabled

#### 1.2. Login with valid credentials

**File:** `specs/saucedemo-login-plan.md`

**Steps:**
  1. Navigate to https://www.saucedemo.com/
    - expect: The login page is displayed
  2. Enter a valid username into the Username field
    - expect: The Username field contains the entered text
  3. Enter a valid password into the Password field
    - expect: The Password field contains the entered password
  4. Click the Login button
    - expect: The app navigates away from the login page
    - expect: A successful inventory or home page is displayed

#### 1.3. Login with invalid username

**File:** `specs/saucedemo-login-plan.md`

**Steps:**
  1. Navigate to the login page
    - expect: Login page is visible
  2. Enter an invalid username and valid password
    - expect: The Username field contains the invalid username
    - expect: The Password field contains the password
  3. Click the Login button
    - expect: The login attempt fails
    - expect: An error message is displayed indicating username/password is incorrect

#### 1.4. Login with invalid password

**File:** `specs/saucedemo-login-plan.md`

**Steps:**
  1. Open the Sauce Demo login page
    - expect: Login page is displayed
  2. Enter a valid username and invalid password
    - expect: Fields contain the entered values
  3. Click Login
    - expect: An error message appears for invalid credentials

#### 1.5. Login with missing username

**File:** `specs/saucedemo-login-plan.md`

**Steps:**
  1. Load the login page
    - expect: The login page loads
  2. Leave the Username field blank and enter a valid password
    - expect: The Password field contains the entered password
    - expect: Username field is empty
  3. Click the Login button
    - expect: Login is blocked or shows an error
    - expect: A validation message indicates username is required

#### 1.6. Login with missing password

**File:** `specs/saucedemo-login-plan.md`

**Steps:**
  1. Open the login page
    - expect: The page is visible
  2. Enter a valid username and leave Password blank
    - expect: Username field contains the entered text
    - expect: Password field is empty
  3. Click Login
    - expect: A validation error is shown
    - expect: Login does not proceed

#### 1.7. Login page visual and accessibility checks

**File:** `specs/saucedemo-login-plan.md`

**Steps:**
  1. Open https://www.saucedemo.com/
    - expect: The Swag Labs logo or branding appears
    - expect: Username and Password placeholders are visible
    - expect: Login button is clearly labelled
  2. Tab through the form fields
    - expect: Focus moves from Username to Password to Login button in order
