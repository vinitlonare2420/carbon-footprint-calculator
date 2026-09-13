# AGENTS.md

## Project
This repository contains a web-based Carbon Footprint Calculator developed as an Environmental Sustainability (ES) academic project.

## Primary Objective
Build a polished, responsive and functional web application that lets users estimate their carbon footprint in kg CO2e from everyday activities and receive practical reduction recommendations.

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

## Code Quality
- Use meaningful names.
- Keep functions focused.
- Avoid duplicated calculation logic.
- Follow the conventions of the selected framework.
- Add comments only for non-obvious logic.

## UI/UX
Create a clean, modern sustainability product. Prioritize readable typography, clear hierarchy, accessible contrast, responsive layouts, useful feedback, and polished states. Avoid excessive animation, visual clutter, fake statistics, and inaccessible colors.

## Carbon Calculations
Use:
Activity × Emission Factor = Estimated CO2e

Keep emission factors centralized and documented. Do not invent factors without clearly labeling them as assumptions.

## Testing
Before considering a feature complete:
1. Run tests.
2. Run the build.
3. Run lint/type checks where applicable.
4. Test normal, zero, empty, invalid and negative inputs.
5. Check responsive behavior.

## Git
Do not reset, force-push, or delete history. Do not overwrite unrelated user work. Inspect the diff before committing.

## Security
Never expose secrets or API keys. Do not commit secret .env files.

## Initial Scope
The initial calculator supports Transportation, Electricity and Waste. Design the architecture so more categories can be added later.

## Future Features
Possible later features: Supabase persistence, accounts, calculation history, monthly comparisons, sustainability score, reduction goals, recommendations and downloadable reports.

## Important Rule
If working code exists, understand it first and improve incrementally. Do not introduce backend complexity before the core calculator works.
