# AGENTS.md — Carbon Footprint Calculator

## Project

Build and maintain a polished, responsive Carbon Footprint Calculator for an
Environmental Sustainability academic project. The application estimates kg
CO2e from everyday activities and provides practical reduction guidance.

## Before Coding

Read `MASTER_PROMPT.md` and all documentation in `docs/` before changing the
application. Inspect the existing repository and work incrementally; do not
rewrite, replace, or delete working code unless there is a clear reason.

## Development Principles

1. Preserve existing functionality while making small, logical, testable
   changes.
2. Prefer simple, maintainable architecture and focused functions with
   meaningful names.
3. Do not add dependencies unless they provide clear value.
4. Keep calculation logic separate from UI code and avoid duplicated logic.
5. Use semantic HTML, accessible form controls, clear units, and kg CO2e
   consistently.
6. Build responsive desktop, tablet, and mobile experiences. Do not add fake
   buttons or hover-only essential interactions.

## Emissions Methodology

Use `Activity × Emission Factor = Estimated CO2e`. Store factors centrally.
Every factor must document its value, unit, source/reference, applicable
geography, year/version where available, and any assumption. Do not invent
scientific facts or present provisional factors as authoritative. Clearly
document calculation assumptions and factors.

## Validation and Results

Validate all user input. Handle empty, zero, negative, invalid, extremely
large, and missing-selection inputs; zero is valid. Never render `NaN`,
`Infinity`, `undefined`, or invalid calculation output. Results should include
total and category kg CO2e, percentages, a visual breakdown, interpretation,
practical recommendations, and a recalculate action.

## UI/UX and Accessibility

Create a clean, modern sustainability product with readable typography, clear
hierarchy, accessible contrast, responsive layouts, useful feedback, and
polished states. Avoid excessive animation, visual clutter, fake statistics,
and inaccessible color-only communication. Use keyboard navigation, visible
focus states, accessible errors, and sufficient contrast.

## Testing and Quality

Before considering a feature complete, run available tests, lint/type checks,
and a production build. Test normal, zero, empty, invalid, and negative input
states, then check responsive behavior. Add comments only for non-obvious
logic.

## Git and Security

Inspect `git status` and the diff before committing. Do not reset, force-push,
delete history, overwrite unrelated work, or commit secrets/API keys. Do not
add Supabase, authentication, persistence, or backend complexity before the
core calculator is stable.

## Scope and Future Work

The initial calculator supports Transportation, Electricity, and Waste; keep
the architecture extensible for later categories. Future work may include
persistence, accounts, history, comparisons, goals, downloadable reports, and
additional recommendations only after the core calculator is stable.
