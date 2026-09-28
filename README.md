# HTD 2.0 Azure Ã¢â‚¬â€ Playwright Test Framework

Page Object Model Playwright framework for **Sauce Demo**, structured for Azure-oriented delivery and CoE-style training.

> Companion to [PlaywrightTSFrameWork](https://github.com/Avinash258/PlaywrightTSFrameWork) Ã‚Â· [Portfolio](https://avinash258.github.io/portfolio/)

## Overview

Clean POM layout with pages, specs, shared utils and test data Ã¢â‚¬â€ suitable as a teaching / onboarding baseline for Playwright on Azure DevOps programs (HTD 2.0 style workshops).

## Features

- Page Object Model (`pages/`)
- Specs and focused suites (`tests/`, `specs/`)
- Shared utilities and test data
- Playwright config ready for headed / UI / debug runs
- Framework structure notes (`FRAMEWORK_STRUCTURE.md`, `SETUP_SUMMARY.md`)

## Stack

- TypeScript Ã‚Â· Playwright
- Azure / GitHub workflowÃ¢â‚¬â€œfriendly layout

## Getting started

```bash
npm install
npx playwright install

npm test
npm run test:headed
npm run test:ui
npm run test:debug
npm run test:login
npm run test:inventory
npm run report
```

## Project layout

```
pages/      page objects
tests/      executable suites
specs/      additional specs
utils/      helpers
testData/   fixtures
testPlan/   planning artefacts
```

## Author

**Avinash Sharma** Ã¢â‚¬â€ QA Automation Architect / Lead SDET  
[GitHub](https://github.com/Avinash258) Ã‚Â· [LinkedIn](https://www.linkedin.com/in/p-avinash-sharma-8b0203b9/) Ã‚Â· [Portfolio](https://avinash258.github.io/portfolio/)
