# Sauce Demo Payment & Checkout Test Plan

## Application Overview

Comprehensive test plan for the Sauce Demo payment and checkout process. Covers user information validation, order overview verification, payment processing, and order confirmation. Tests include happy path scenarios, edge cases, error handling, and accessibility checks across a 3-step checkout flow.

## Test Scenarios

### 1. Checkout User Information (Step 1)

**Seed:** `tests/seed.spec.ts`

#### 1.1. Verify checkout information form displays correctly

**File:** `tests/checkout/checkout-step1-form-render.spec.ts`

**Steps:**
  1. Log in to Sauce Demo with valid credentials (standard_user/secret_sauce)
    - expect: Inventory page loads successfully
  2. Add at least one item to cart
    - expect: Item added to cart, cart badge shows item count
  3. Navigate to cart by clicking cart icon
    - expect: Cart page displays with added items
  4. Click Checkout button
    - expect: Checkout Step 1 form appears with title 'Checkout: Your Information'
    - expect: First Name input field is visible
    - expect: Last Name input field is visible
    - expect: Zip/Postal Code input field is visible
    - expect: Cancel button is present
    - expect: Continue button is present

#### 1.2. Complete checkout with valid user information

**File:** `tests/checkout/checkout-step1-valid-data.spec.ts`

**Steps:**
  1. Navigate to Checkout Step 1 page with items in cart
    - expect: Checkout form displays
  2. Enter 'Avinash' in First Name field
    - expect: First Name field contains 'Avinash'
  3. Enter 'Sharma' in Last Name field
    - expect: Last Name field contains 'Shama'
  4. Enter '12345' in Zip/Postal Code field
    - expect: Zip/Postal Code field contains '12345'
  5. Click Continue button
    - expect: Page navigates to Checkout Step 2 (Order Overview)
    - expect: URL is checkout-step-two.html

#### 1.3. Verify validation error when First Name is missing

**File:** `tests/checkout/checkout-step1-missing-firstname.spec.ts`

**Steps:**
  1. Navigate to Checkout Step 1 page
    - expect: Checkout form displays
  2. Leave First Name field empty
    - expect: First Name field is empty
  3. Enter 'Doe' in Last Name field
    - expect: Last Name field contains 'Doe'
  4. Enter '12345' in Zip/Postal Code field
    - expect: Zip/Postal Code field contains '12345'
  5. Click Continue button
    - expect: Error message appears: 'First Name is required'
    - expect: Page remains on Checkout Step 1
    - expect: Error button/close icon is visible

#### 1.4. Verify validation error when Last Name is missing

**File:** `tests/checkout/checkout-step1-missing-lastname.spec.ts`

**Steps:**
  1. Navigate to Checkout Step 1 page
    - expect: Checkout form displays
  2. Enter 'John' in First Name field
    - expect: First Name field contains 'John'
  3. Leave Last Name field empty
    - expect: Last Name field is empty
  4. Enter '12345' in Zip/Postal Code field
    - expect: Zip/Postal Code field contains '12345'
  5. Click Continue button
    - expect: Error message appears: 'Last Name is required'
    - expect: Page remains on Checkout Step 1

#### 1.5. Verify validation error when Zip/Postal Code is missing

**File:** `tests/checkout/checkout-step1-missing-zipcode.spec.ts`

**Steps:**
  1. Navigate to Checkout Step 1 page
    - expect: Checkout form displays
  2. Enter 'John' in First Name field
    - expect: First Name field contains 'John'
  3. Enter 'Doe' in Last Name field
    - expect: Last Name field contains 'Doe'
  4. Leave Zip/Postal Code field empty
    - expect: Zip/Postal Code field is empty
  5. Click Continue button
    - expect: Error message appears: 'Postal Code is required'
    - expect: Page remains on Checkout Step 1

#### 1.6. Verify Cancel button returns to cart

**File:** `tests/checkout/checkout-step1-cancel.spec.ts`

**Steps:**
  1. Navigate to Checkout Step 1 page with items in cart
    - expect: Checkout form displays
  2. Fill in form fields with valid data
    - expect: All fields are populated
  3. Click Cancel button
    - expect: Page navigates back to cart page
    - expect: Cart items remain in cart
    - expect: Previously entered data is not saved

#### 1.7. Verify special characters accepted in user information fields

**File:** `tests/checkout/checkout-step1-special-chars.spec.ts`

**Steps:**
  1. Navigate to Checkout Step 1 page
    - expect: Checkout form displays
  2. Enter 'Jean-Marie' in First Name field
    - expect: First Name field contains 'Jean-Marie'
  3. Enter "O'Connor" in Last Name field
    - expect: Last Name field contains "O'Connor'"
  4. Enter '12345-6789' in Zip/Postal Code field
    - expect: Zip/Postal Code field contains '12345-6789'
  5. Click Continue button
    - expect: Page navigates to Checkout Step 2 without errors

### 2. Checkout Order Overview (Step 2)

**Seed:** `tests/seed.spec.ts`

#### 2.1. Verify order overview displays correctly

**File:** `tests/checkout/checkout-step2-overview-render.spec.ts`

**Steps:**
  1. Complete Checkout Step 1 with valid information
    - expect: Navigated to Checkout Step 2
  2. Take snapshot of Checkout Step 2 page
    - expect: Page title shows 'Checkout: Overview'
    - expect: Cart items are displayed with quantities
    - expect: Product names and prices are visible
    - expect: Payment Information section shows 'SauceCard #31337'
    - expect: Shipping Information shows 'Free Pony Express Delivery!'
    - expect: Price breakdown shows Item total, Tax, and Total
    - expect: Cancel button is present
    - expect: Finish button is present

#### 2.2. Verify cart items display correctly on order overview

**File:** `tests/checkout/checkout-step2-items-display.spec.ts`

**Steps:**
  1. Add two different items (Backpack and Bike Light) to cart
    - expect: Both items added to cart
  2. Complete Checkout Step 1 and navigate to Step 2
    - expect: Order Overview page displays
  3. Verify item list on Step 2
    - expect: Sauce Labs Backpack shown with quantity 1
    - expect: Sauce Labs Bike Light shown with quantity 1
    - expect: Product descriptions are visible
    - expect: Product prices are displayed correctly ($29.99 and $9.99)

#### 2.3. Verify price calculation is correct

**File:** `tests/checkout/checkout-step2-price-calculation.spec.ts`

**Steps:**
  1. Add Sauce Labs Backpack ($29.99) and Sauce Labs Bike Light ($9.99) to cart
    - expect: Both items in cart
  2. Complete Checkout Step 1 and navigate to Step 2
    - expect: Order Overview page displays
  3. Verify price calculations
    - expect: Item total shows $39.98 (29.99 + 9.99)
    - expect: Tax is calculated (shows $3.20 for 8% tax)
    - expect: Total amount shows $43.18 (39.98 + 3.20)

#### 2.4. Verify Cancel button returns to Step 1

**File:** `tests/checkout/checkout-step2-cancel.spec.ts`

**Steps:**
  1. Complete Checkout Step 1 and navigate to Step 2
    - expect: Order Overview page displays
  2. Click Cancel button
    - expect: Page navigates back to Checkout Step 1
    - expect: User information fields are empty or reset
    - expect: URL is checkout-step-one.html

#### 2.5. Verify payment information is displayed

**File:** `tests/checkout/checkout-step2-payment-info.spec.ts`

**Steps:**
  1. Complete Checkout Step 1 and navigate to Step 2
    - expect: Order Overview page displays
  2. Verify Payment Information section
    - expect: Payment Information label is visible
    - expect: Payment method shows 'SauceCard #31337'
    - expect: Payment information is clearly displayed and not editable

#### 2.6. Verify shipping information is displayed

**File:** `tests/checkout/checkout-step2-shipping-info.spec.ts`

**Steps:**
  1. Complete Checkout Step 1 and navigate to Step 2
    - expect: Order Overview page displays
  2. Verify Shipping Information section
    - expect: Shipping Information label is visible
    - expect: Shipping method shows 'Free Pony Express Delivery!'
    - expect: Shipping information is clearly displayed

### 3. Order Confirmation

**Seed:** `tests/seed.spec.ts`

#### 3.1. Verify order confirmation page displays after successful payment

**File:** `tests/checkout/checkout-complete-confirmation.spec.ts`

**Steps:**
  1. Complete Checkout Step 1 with valid information
    - expect: Navigated to Checkout Step 2
  2. Review order overview
    - expect: All order details are visible
  3. Click Finish button to complete order
    - expect: Page navigates to checkout-complete.html
    - expect: Page title shows 'Checkout: Complete!'
    - expect: Confirmation message 'Thank you for your order!' is displayed
    - expect: Order dispatch confirmation message appears
    - expect: Pony Express graphic is visible
    - expect: Back Home button is present

#### 3.2. Verify all confirmation details are correct

**File:** `tests/checkout/checkout-complete-details.spec.ts`

**Steps:**
  1. Complete full checkout flow with known items and amounts
    - expect: Order confirmed
  2. Verify confirmation page content
    - expect: Heading 'Thank you for your order!' is visible
    - expect: Subheading 'Your order has been dispatched, and will arrive just as fast as the pony can get there!' appears
    - expect: Pony Express delivery image is displayed
    - expect: Back Home button is clickable

#### 3.3. Verify Back Home button returns to inventory

**File:** `tests/checkout/checkout-complete-backhome.spec.ts`

**Steps:**
  1. Complete full checkout flow
    - expect: Order confirmation page displays
  2. Click Back Home button
    - expect: Page navigates to inventory page
    - expect: URL is inventory.html
    - expect: Product catalog is displayed
    - expect: Shopping cart is reset (empty cart)

### 4. Multi-Item Checkout Scenarios

**Seed:** `tests/seed.spec.ts`

#### 4.1. Verify checkout with single item

**File:** `tests/checkout/checkout-single-item.spec.ts`

**Steps:**
  1. Log in and add only one item (Sauce Labs Onesie - $7.99) to cart
    - expect: Single item in cart
  2. Proceed through complete checkout flow
    - expect: Item quantity shows as 1 on overview
    - expect: Item total calculated correctly
    - expect: Order confirmation succeeds

#### 4.2. Verify checkout with maximum items

**File:** `tests/checkout/checkout-multiple-items.spec.ts`

**Steps:**
  1. Add multiple different items to cart (at least 5 products)
    - expect: All items added to cart
  2. Proceed to Checkout Step 2
    - expect: All items displayed on order overview
    - expect: Price calculation is correct for all items
    - expect: Cart badge shows correct count
  3. Complete checkout
    - expect: Order confirmation succeeds
    - expect: All items confirmed in order

#### 4.3. Verify checkout with quantity greater than 1

**File:** `tests/checkout/checkout-quantity-multiple.spec.ts`

**Steps:**
  1. Add items to cart and manually increase quantity (via developer tools or API)
    - expect: Cart shows multiple quantities of items
  2. Proceed through checkout
    - expect: Quantity is reflected in order overview
    - expect: Price calculations account for quantity
    - expect: Order confirmation shows correct totals

### 5. Edge Cases and Error Scenarios

**Seed:** `tests/seed.spec.ts`

#### 5.1. Verify checkout with very long user names

**File:** `tests/checkout/checkout-long-names.spec.ts`

**Steps:**
  1. Navigate to Checkout Step 1
    - expect: Form displays
  2. Enter very long first name (50+ characters) in First Name field
    - expect: Text is accepted and displayed
  3. Enter very long last name in Last Name field
    - expect: Text is accepted and displayed
  4. Enter long zip code in Zip/Postal Code field
    - expect: Text is accepted
  5. Click Continue
    - expect: Proceeds to Step 2 without truncation or errors

#### 5.2. Verify numeric only zip code validation

**File:** `tests/checkout/checkout-zipcode-format.spec.ts`

**Steps:**
  1. Navigate to Checkout Step 1
    - expect: Form displays
  2. Enter valid numeric zip code '90210'
    - expect: Zip code accepted
  3. Fill other fields and proceed
    - expect: Checkout continues successfully

#### 5.3. Verify checkout with empty cart

**File:** `tests/checkout/checkout-empty-cart.spec.ts`

**Steps:**
  1. Navigate to cart page with no items
    - expect: Checkout button may be disabled or removed
  2. Attempt to access checkout-step-one directly via URL
    - expect: System handles empty cart appropriately (either redirects to inventory or shows error)

#### 5.4. Verify checkout state persists after page refresh

**File:** `tests/checkout/checkout-page-refresh.spec.ts`

**Steps:**
  1. Enter information in Checkout Step 1 form
    - expect: Fields populated with data
  2. Refresh the page (F5 or Ctrl+R)
    - expect: Page reloads
    - expect: Form behavior is handled (data cleared or persisted based on app design)

#### 5.5. Verify back button navigation behavior

**File:** `tests/checkout/checkout-browser-back.spec.ts`

**Steps:**
  1. Complete Checkout Step 1 and navigate to Step 2
    - expect: Step 2 page displays
  2. Click browser back button
    - expect: Returns to Checkout Step 1 or cart depending on app behavior

### 6. Accessibility and UI/UX

**Seed:** `tests/seed.spec.ts`

#### 6.1. Verify form fields are properly labeled and focusable

**File:** `tests/checkout/checkout-accessibility-labels.spec.ts`

**Steps:**
  1. Navigate to Checkout Step 1
    - expect: Form displays
  2. Verify each input field has associated label
    - expect: First Name field has 'First Name' label
    - expect: Last Name field has 'Last Name' label
    - expect: Zip/Postal Code field has 'Zip/Postal Code' label
  3. Tab through form fields
    - expect: All fields are focusable in logical order
    - expect: Focus is visible on each field
    - expect: Tab order: First Name → Last Name → Zip Code → Buttons

#### 6.2. Verify required fields are marked/indicated

**File:** `tests/checkout/checkout-required-fields.spec.ts`

**Steps:**
  1. Navigate to Checkout Step 1
    - expect: Form displays
  2. Verify visual indication of required fields
    - expect: All fields are clearly indicated as required (via asterisk, text, or other visual marker)

#### 6.3. Verify error messages are accessible and clear

**File:** `tests/checkout/checkout-error-accessibility.spec.ts`

**Steps:**
  1. Try to submit form with missing First Name
    - expect: Error message appears and is clearly visible
  2. Verify error message text
    - expect: Error message clearly states which field is required
    - expect: Error message is associated with the problematic field
    - expect: Focus moves to error message or invalid field

#### 6.4. Verify buttons are properly sized and clickable

**File:** `tests/checkout/checkout-button-usability.spec.ts`

**Steps:**
  1. Navigate to Checkout Step 1
    - expect: Form displays
  2. Verify button sizes and spacing
    - expect: Continue button has adequate size (minimum 44x44px)
    - expect: Cancel button has adequate size
    - expect: Buttons are clearly distinct
    - expect: Buttons have sufficient spacing between them
