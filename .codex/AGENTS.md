# Codex Project Instructions

## Project

Build and maintain a polished, production-quality Carbon Footprint Calculator
for an Environmental Sustainability academic project.

## Before Coding

Read `MASTER_PROMPT.md` and all documentation in `docs/` before changing the
application. Inspect the existing repository and work incrementally; do not
replace working code, delete unrelated files, or add unnecessary dependencies.

## Product Scope

The core calculator covers transportation, electricity, and waste. Keep
calculation logic separate from UI code where practical. Do not add Supabase,
authentication, or persistence until the core calculator is stable.

## Emissions Methodology

Use `Activity × Emission Factor = Estimated CO2e`. Store emission factors
centrally. Every factor must document its value, unit, source/reference,
applicable geography, year/version where available, and any assumption. Do not
invent scientific facts or present provisional factors as authoritative.

## Validation and Results

Handle empty, zero, negative, invalid, extremely large, and missing-selection
inputs. Zero is valid. Never render `NaN`, `Infinity`, `undefined`, or invalid
calculation output. Results should eventually include total and category kg
CO2e, percentages, a visual breakdown, key observation, practical
recommendations, and a recalculate action.

## UI and Accessibility

Build a polished, responsive, accessible interface for desktop, tablet, and
mobile. Use semantic HTML, explicit labels, keyboard navigation, visible focus
states, accessible errors, readable typography, sufficient contrast, and no
hover-only essential interactions. Every visible button must have a meaningful
action.

## Quality and Git Safety

Run available tests, lint/type checks, and a production build after changes.
Test normal, zero, empty, invalid, and negative input states, and check
responsive behavior. Before committing, inspect `git status` and the diff. Do
not force-push, reset unrelated work, delete history, or overwrite user
changes. Never commit secrets.
