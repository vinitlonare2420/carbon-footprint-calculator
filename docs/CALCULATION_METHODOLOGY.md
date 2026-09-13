# Carbon Calculation Methodology

## Purpose
The calculator provides educational estimates of carbon emissions.

## Reporting Period
All activity inputs and category results represent one month. The primary result is kg CO2e/month. The annual estimate is the monthly total multiplied by 12.

## General Formula
Emissions = Activity × Emission Factor

The primary output is kg CO2e.

## Transportation
Transportation CO2e = monthly distance in km × transport factor

The calculator uses India-specific passenger transport factors:

| Mode | Factor | Source and note |
| --- | ---: | --- |
| Two-wheeler | 0.1609 kg CO2e/passenger-km | International Transport Forum / OECD, *Life-cycle assessment of passenger transport: An Indian case study* (2023). |
| Car | 0.3591 kg CO2e/passenger-km | International Transport Forum / OECD, *Life-cycle assessment of passenger transport: An Indian case study* (2023). |
| Bus | 0.0315 kg CO2e/passenger-km | International Transport Forum / OECD, *Life-cycle assessment of passenger transport: An Indian case study* (2023). |
| Train | 0.007837 kg CO2/passenger-km | Indian Railways/Planning Commission-referenced non-suburban passenger-km factor. This is an older CO2 reference value and is documented separately from the 2023 life-cycle factors. |

## Electricity
Electricity CO2e = monthly electricity consumption × 0.7117 kg CO2/kWh

Primary input: kWh/month.

The factor is from the Central Electricity Authority, *CO2 Baseline Database for the Indian Power Sector*, Version 21.0, FY 2024-25, India. It is a CEA grid emission baseline value; calculations retain 0.7117 precision (the display configuration may round it to 0.712 kg CO2e/kWh).

Electricity factors should be configurable because grid intensity varies by region and time.

## Waste
Waste CO2e = monthly organic waste quantity × waste-treatment factor

Primary input: kg waste/month.

The calculator asks for a treatment pathway rather than applying a mixed-household-waste factor. The factors, from the Ministry of Environment, Forest and Climate Change, Government of India, *Low Carbon Lifestyles* material, are 0.32 kg CO2e/kg organic waste for composting and 1.29 kg CO2e/kg organic waste for landfill. These estimates apply only to the selected organic waste treatment pathway.

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

## Limitations
These are educational estimates based on the stated India-specific sources and reporting period. They do not capture individual vehicle occupancy, route conditions, household electricity procurement, actual waste composition, or the operational details of waste treatment.
