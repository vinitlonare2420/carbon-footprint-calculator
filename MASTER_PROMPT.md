# MASTER PROMPT — Carbon Footprint Calculator

You are the primary coding agent for this repository.

Build and maintain a polished, production-quality web application called **Carbon Footprint Calculator** for an Environmental Sustainability (ES) academic project.

## FIRST: READ THE DOCUMENTATION
Before writing code, inspect the repository and read:
- `.codex/AGENTS.md`
- `docs/PROJECT_SPEC.md`
- `docs/CALCULATION_METHODOLOGY.md`
- `docs/UI_UX_SPEC.md`
- `docs/DEVELOPMENT_PLAN.md`
- `docs/TESTING.md`
- `README.md` if it exists

Do not start coding until you understand the existing repository.

## DEVELOPMENT RULE
Work incrementally. Do not implement every future feature at once. First make the core application functional and stable. Do not replace working code without a reason, delete unrelated files, or add unnecessary dependencies.

## PRIMARY PRODUCT
Create a web application where a user enters everyday activity information and receives an estimated carbon footprint in kg CO2e.

Initial categories:
1. Transportation
2. Electricity
3. Waste

## USER EXPERIENCE
The user should be able to:
1. Open the website.
2. Understand carbon footprint.
3. Start the calculator.
4. Enter activity information.
5. Submit the calculation.
6. See total estimated emissions.
7. See category-wise emissions.
8. See a visual breakdown.
9. Identify the largest contributor.
10. Receive practical reduction suggestions.
11. Start another calculation.

## CALCULATOR

### Transportation
Provide appropriate transport modes such as car, motorcycle/scooter, bus and train. Collect appropriate travel/distance input.

### Electricity
Collect monthly electricity consumption in kWh.

### Waste
Collect monthly waste in kg.

## CALCULATION ENGINE
Use:
Activity × Emission Factor = Estimated CO2e

Keep calculation logic separate from UI code where practical. Create a centralized emission-factor configuration.

Every factor should have value, unit, source/reference information, applicable geography where relevant, year/version where available, and an assumption note if applicable.

Do not invent scientific facts or present provisional factors as authoritative.

## VALIDATION
Handle empty fields, zero values, negative values, invalid numbers, extremely large values and missing selections. Never allow NaN, Infinity or undefined calculation output.

## RESULTS
Show total footprint in kg CO2e, category emissions, percentage contribution, a visual chart, key observation, recommendations and a recalculate action.

## RECOMMENDATIONS
Generate recommendations based on dominant categories. Use practical, constructive and non-shaming language. Do not make unsupported claims.

## UI
Create a polished, responsive, accessible and professional sustainability interface for desktop, tablet and mobile. Every visible button must perform a meaningful action.

## ACCESSIBILITY
Use semantic HTML, proper labels, keyboard navigation, visible focus states, accessible errors, readable typography and sufficient contrast.

## DATA PERSISTENCE
Do not add Supabase initially unless already required. First make the core calculator work. Add persistence later for history/accounts if needed.

## GITHUB AND VERCEL
The repository is intended to be connected to GitHub and Vercel. Never commit API keys, passwords or secrets. Do not modify deployment configuration unnecessarily. Ensure the project can build successfully for production.

## TESTING
After implementation:
1. Run tests if available.
2. Run lint/type checks if available.
3. Run the production build.
4. Test normal, zero, empty, invalid and negative inputs.
5. Check responsive behavior.
6. Fix errors caused by your changes.

## GIT SAFETY
Before committing, inspect `git status` and the diff. Do not force-push, reset unrelated work, delete history or overwrite user changes.

## IMPLEMENTATION ORDER
1. Inspect repository and stack.
2. Establish/organize structure.
3. Build main UI.
4. Implement inputs and validation.
5. Implement centralized emission factors.
6. Implement calculation engine.
7. Implement results dashboard.
8. Implement charts.
9. Implement recommendations.
10. Run tests/build.
11. Fix issues.
12. Update README.

## FINAL QUALITY STANDARD
Do not stop at "the code runs." The result should look and behave like a polished web application suitable for ES evaluation, GitHub portfolio presentation and Vercel deployment.

When finishing a task, report:
1. What changed.
2. Files changed.
3. Tests/build commands run.
4. Whether they passed.
5. Remaining issues.
6. Suggested next step.

Never claim a test was run if it was not actually run.
