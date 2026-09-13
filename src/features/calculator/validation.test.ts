import { describe, expect, it } from 'vitest'
import { validateCalculator } from './validation'

const validValues = { transportMode: 'train' as const, distance: '18', electricity: '240', wasteTreatment: 'composting' as const, waste: '12' }

describe('validateCalculator', () => {
  it('accepts valid values including zero activity', () => {
    expect(validateCalculator({ ...validValues, distance: '0', electricity: '0', waste: '0' })).toEqual({})
  })
  it('reports missing values and transport mode', () => {
    expect(validateCalculator({ transportMode: '', distance: '', electricity: '', wasteTreatment: '', waste: '' })).toEqual({ transportMode: 'Select a transport mode.', distance: 'Enter a travel distance value greater than or equal to 0.', electricity: 'Enter a monthly electricity value greater than or equal to 0.', wasteTreatment: 'Select an organic waste treatment.', waste: 'Enter a monthly organic waste value greater than or equal to 0.' })
  })
  it('rejects negative and invalid values', () => {
    expect(validateCalculator({ ...validValues, distance: '-1', electricity: 'not-a-number', waste: '1000001' })).toEqual({ distance: 'Enter a travel distance value greater than or equal to 0.', electricity: 'Enter a valid monthly electricity number.', waste: 'Enter a monthly organic waste value below 1,000,000.' })
  })
})
