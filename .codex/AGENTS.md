# AGENTS.md

## Project

This repository contains a web-based Carbon Footprint Calculator developed as an Environmental Sustainability (ES) academic project.

## Primary Objective

Build a polished, responsive and functional web application that lets users estimate their carbon footprint in kg CO2e from everyday activities and receive practical reduction recommendations.

## Before Coding

Read `MASTER_PROMPT.md` and all documentation in `docs/` before changing the application. Inspect the existing repository and work incrementally; do not replace working code, delete unrelated files, or add unnecessary dependencies.

## Development Principles

1. Inspect the existing repository before making changes.
2. Do not rewrite or delete working code unnecessarily.
3. Preserve existing functionality when adding features.
4. Make small, logical and testable changes.
5. Prefer simple, maintainable architecture.
6. Do not add dependencies unless they provide clear value.
7. Keep calculation logic separate from UI code where practical.
8. Use semantic HTML and accessible form controls.
9. Make the application responsive for mobile, tablet and desktop.
10. Do not use fake buttons or non-functional UI.
11. Validate all user input.
12. Use clear units and kg CO2e consistently.
13. Clearly document assumptions and emission factors.

## Product Scope

The core calculator covers Transportation, Electricity, and Waste. Design the architecture so more categories can be added later.

Do not add Supabase, authentication, or persistence until the core calculator is stable.

## Code Quality

- Use meaningful names.
- Keep functions focused.
- Avoid duplicated calculation logic.
- Follow the conventions of the selected framework.
- Add comments only for non-obvious logic.

## UI/UX and Accessibility

Create a clean, modern sustainability product. Prioritize readable typography, clear hierarchy, accessible contrast, responsive layouts, useful feedback, and polished states.

Use semantic HTML, explicit labels, keyboard navigation, visible focus states, accessible errors, readable typography, sufficient contrast, and no hover-only essential interactions.

Avoid excessive animation, visual clutter, fake statistics, and inaccessible colors.

Every visible button must have a meaningful action.

## Carbon Calculations

Use:

Activity × Emission Factor = Estimated CO2e

Keep emission factors centralized and documented.

Every factor must document its value, unit, source/reference, applicable geography, year/version where available, and any assumption.

Do not invent scientific facts or present provisional factors as authoritative.

## Validation and Results

Handle empty, zero, negative, invalid, extremely large, and missing-selection inputs.

Zero is valid.

Never render `NaN`, `Infinity`, `undefined`, or invalid calculation output.

Results should include total and category kg CO2e, percentages, a visual breakdown, key observation, practical recommendations, and a recalculate action.

## Testing

Before considering a feature complete:

1. Run tests.
2. Run the production build.
3. Run lint/type checks where applicable.
4. Test normal, zero, empty, invalid, and negative inputs.
5. Check responsive behavior.

## Git Safety

Do not reset, force-push, or delete history.

Do not overwrite unrelated user work.

Inspect the diff before committing.

Never commit secrets.

## Security

Never expose secrets or API keys.

Do not commit secret `.env` files.

## Future Features

Possible later features include:

- Supabase persistence
- Accounts
- Calculation history
- Monthly comparisons
- Sustainability score
- Reduction goals
- Recommendations
- Downloadable reports

## Important Rule

If working code exists, understand it first and improve incrementally.

Do not introduce backend complexity before the core calculator works.