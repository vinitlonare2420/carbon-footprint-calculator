# Testing Plan

## Functional Tests

### Transportation
Test normal positive distance, zero, empty, negative, invalid text and different modes.

### Electricity
Test normal monthly kWh, zero, empty, negative and invalid text.

### Waste
Test normal monthly waste, zero, empty, negative and invalid text.

## Calculation Tests
Verify:
- Activity × Emission Factor
- Total = Transportation + Electricity + Waste
- Category percentages

Ensure results never contain NaN, Infinity, undefined or unintended negative values.

## UI Tests
Check desktop, tablet, mobile, keyboard navigation, focus states, validation messages, chart rendering and result rendering.

## Regression Testing
After significant changes:
1. Run tests.
2. Run production build.
3. Inspect affected UI.
4. Confirm existing calculator functionality still works.

## Production Testing
After deployment:
- open production URL
- complete a calculation
- verify results
- verify chart
- test mobile layout
- inspect browser console for errors
