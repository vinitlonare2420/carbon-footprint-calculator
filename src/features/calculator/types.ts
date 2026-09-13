export type TransportMode = 'twoWheeler' | 'car' | 'bus' | 'train'
export type WasteTreatment = 'composting' | 'landfill'
export type EmissionCategory = 'transportation' | 'electricity' | 'waste'

export type EmissionFactor = {
  id: string
  category: EmissionCategory
  value: number
  unit: string
  source: string
  sourceOrganization: string
  version: string
  reportingYear: string
  geography: string
  methodology: string
  notes: string
}

export type CalculatorValues = {
  transportMode: '' | TransportMode
  distance: string
  electricity: string
  wasteTreatment: '' | WasteTreatment
  waste: string
}

export type NumericCalculatorValues = {
  transportMode: TransportMode
  monthlyDistanceKm: number
  monthlyKwh: number
  wasteTreatment: WasteTreatment
  monthlyOrganicWasteKg: number
}

export type FootprintResult = {
  transportationKg: number
  electricityKg: number
  wasteKg: number
  monthlyTotalKg: number
  annualTotalKg: number
  percentages: Record<EmissionCategory, number>
  dominantCategory: EmissionCategory | null
}
