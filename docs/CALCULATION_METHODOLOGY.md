# Carbon Calculation Methodology

## Purpose
The calculator provides educational estimates of carbon emissions.

## General Formula
Emissions = Activity × Emission Factor

The primary output is kg CO2e.

## Transportation
Transportation CO2e = Distance × Emission Factor

The factor must correspond to the selected transport mode and have documented units, source, geography and year/version where available.

## Electricity
Electricity CO2e = Electricity Consumption × Electricity Emission Factor

Primary input: kWh/month.

Annual estimate = Monthly kWh × Emission Factor × 12.

Electricity factors should be configurable because grid intensity varies by region and time.

## Waste
Waste CO2e = Waste Quantity × Waste Emission Factor

Primary input: kg waste/month.

The methodology must clearly state the relevant disposal/treatment or lifecycle boundary.

## Emission Factor Requirements
Every factor must:
1. Have a documented source.
2. Include units.
3. Include geography where relevant.
4. Include year/version where available.
5. Be stored centrally.
6. Be updated in documentation when changed.

Do not fabricate emission factors. If a provisional factor is required during development, clearly label it as an assumption requiring verification.

## Rounding
Keep sufficient internal precision and display sensible rounded values, e.g. 123.46 kg CO2e.

## Validation
Zero is valid. Negative activity must be rejected. Missing or non-numeric values must not produce NaN, Infinity or broken output.

## Transparency
Provide a methodology section explaining formulas, factors, units, assumptions, limitations and sources.
