# TerraTrack — Carbon Footprint Calculator

A responsive Environmental Sustainability project that estimates monthly household carbon emissions from transportation, electricity, and organic waste.

## Current scope

The calculator validates monthly activity inputs, accepts zero values, and displays monthly and annual estimates with a category breakdown. It uses centrally configured India-specific factors: ITF/OECD (2023) passenger transport factors, Central Electricity Authority Version 21.0 (FY 2024-25) electricity intensity, and Ministry of Environment, Forest and Climate Change organic-waste treatment factors. Full factor metadata, formulas, sources, and limitations are in [`docs/CALCULATION_METHODOLOGY.md`](docs/CALCULATION_METHODOLOGY.md).

## Requirements

- Node.js 20.19+ or 22.12+
- npm

## Getting started

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

## Available commands

```bash
npm run lint       # Run ESLint
npm run typecheck  # Check TypeScript types
npm test           # Run unit and component tests
npm run build      # Type-check and create the production build
```

## Project structure

- `src/App.tsx` — landing page and application layout
- `src/features/calculator/` — calculator form and validation logic
- `src/styles.css` — responsive visual system
- `docs/` — product, UI, methodology, development, and testing requirements

## Important limitations

The calculator is an educational estimate for the supplied India-specific methodology. Actual emissions depend on individual travel conditions and occupancy, grid procurement, waste composition, and treatment operations. It does not provide recommendations, accounts, data persistence, or external calculation APIs.
