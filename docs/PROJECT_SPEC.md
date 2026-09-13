# Carbon Footprint Calculator — Project Specification

## Overview
A web-based Environmental Sustainability project that helps users estimate carbon emissions from selected daily activities and understand ways to reduce their environmental impact.

## Target Users
- Students
- Individuals
- Households
- People interested in environmental sustainability

## Core User Flow
1. Open application.
2. Learn briefly about carbon footprint.
3. Start calculator.
4. Enter activity information.
5. Validate input.
6. Calculate estimated emissions.
7. Display total kg CO2e.
8. Display category breakdown.
9. Provide practical reduction recommendations.
10. Allow another calculation.

## Initial Categories

### Transportation
Support appropriate modes such as car, motorcycle/scooter, bus and train. Collect suitable distance/travel information.

### Electricity
Input monthly electricity consumption in kWh.

### Waste
Input estimated waste generated in kg per month.

## Results
Show:
- Total estimated footprint
- kg CO2e
- Category breakdown
- Percentage contribution
- Visual chart
- Key observation
- Reduction suggestions
- Recalculate action

## Calculation
CO2e = Activity × Emission Factor

Total CO2e = Transportation + Electricity + Waste

All assumptions must be documented.

## Accuracy Disclaimer
Results are estimates. Actual emissions vary with location, energy source, vehicle efficiency, travel conditions, waste treatment and behavior.

## Accessibility
Support keyboard navigation, semantic HTML, visible focus states, meaningful labels, accessible errors and sufficient contrast.

## Responsive Design
The application must work on desktop, tablet and mobile without horizontal scrolling or hover-only essential functionality.

## Extensibility
Future categories may include Food, Flights, LPG, Water, Shopping, Renewable Energy and offsets.
