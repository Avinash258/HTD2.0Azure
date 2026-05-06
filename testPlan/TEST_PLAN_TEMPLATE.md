# Test Plan Template

Use this template when creating new test plans.

```markdown
# [Feature Name] Test Plan

## Application Overview

Brief description of the feature/module being tested, its purpose, and what aspects will be covered in this test plan.

## Test Scenarios

### [Feature Group/Section Name]

**Module:** [Module or component being tested]

#### [Scenario #]. [Scenario Name]

**File:** `testPlan/[scenario-name]-plan.md`

**Description:** Brief description of what this scenario validates.

**Prerequisites:**
- [Any setup required]
- [Any dependencies]

**Steps:**
  1. [Action/Navigation step]
    - expect: [Expected result or assertion]
    - expect: [Another expected result if applicable]
  
  2. [Next action]
    - expect: [Expected result]

#### [Scenario #]. [Another Scenario]

**File:** `testPlan/[scenario-name]-plan.md`

**Description:** Description of this test scenario.

**Steps:**
  1. [Action]
    - expect: [Result]

## Test Coverage Summary

| Scenario | Type | Coverage |
|----------|------|----------|
| [Scenario Name] | [Positive/Negative/Edge] | [What it validates] |

## Test Data Requirements

- **Files Required:** List JSON test data files needed
- **Sample Data:** Example data structure

## Page Objects Required

- `[PageName1]`
- `[PageName2]`

## Related Tests

- `tests/[test-file-1].spec.ts`
- `tests/[test-file-2].spec.ts`

## Notes

- Any special considerations
- Known limitations
- Browser compatibility notes

## Revision History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | YYYY-MM-DD | Initial test plan |
```

## Quick Tips

1. **Be Specific:** Write steps that are clear and unambiguous
2. **Expected Results:** Always include what the test should achieve
3. **Test Data:** Reference the JSON files used in testing
4. **Page Objects:** Mention which POM classes are involved
5. **Traceability:** Link to actual test implementations

## File Naming

- Use kebab-case: `feature-description-plan.md`
- Examples:
  - `login-validation-plan.md`
  - `checkout-process-plan.md`
  - `search-functionality-plan.md`
