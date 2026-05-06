/**
 * Test configuration and constants
 */

export const TEST_URLS = {
  LOGIN: 'https://www.saucedemo.com/',
  INVENTORY: 'https://www.saucedemo.com/inventory.html',
  CART: 'https://www.saucedemo.com/cart.html',
  CHECKOUT: 'https://www.saucedemo.com/checkout-step-one.html',
};

export const TEST_TIMEOUTS = {
  SHORT: 3000,
  MEDIUM: 5000,
  LONG: 10000,
  PAGE_LOAD: 15000,
};

export const PAGE_TITLES = {
  LOGIN: 'Swag Labs',
  INVENTORY: 'Swag Labs',
};

export const ERROR_MESSAGES = {
  INVALID_CREDENTIALS: 'Epic sadface: Username and password do not match',
  LOCKED_OUT: 'Epic sadface: Sorry, this user has been locked out',
  MISSING_USERNAME: 'Epic sadface: Username is required',
  MISSING_PASSWORD: 'Epic sadface: Password is required',
};

export const VALID_USERS = {
  STANDARD_USER: {
    username: 'standard_user',
    password: 'secret_sauce',
  },
  PROBLEM_USER: {
    username: 'problem_user',
    password: 'secret_sauce',
  },
  PERFORMANCE_GLITCH_USER: {
    username: 'performance_glitch_user',
    password: 'secret_sauce',
  },
};
