import { EmissionCategory, FootprintResult } from './types'

export type Recommendation = { title: string; detail: string }

const recommendations: Record<EmissionCategory, Recommendation[]> = {
  transportation: [
    { title: 'Use public transport where practical', detail: 'For suitable journeys, consider bus or train options that fit your routine.' },
    { title: 'Choose active travel for short trips', detail: 'Walking or cycling can be practical alternatives for suitable nearby journeys.' },
    { title: 'Share car journeys where practical', detail: 'Carpooling can help reduce the number of individual car trips.' },
  ],
  electricity: [
    { title: 'Reduce unnecessary electricity use', detail: 'Notice routine consumption that is not needed for comfort or safety.' },
    { title: 'Prioritise efficient appliances', detail: 'When replacing appliances, consider energy-efficient options that meet your needs.' },
    { title: 'Switch off unused devices', detail: 'Turn off lights and devices when they are no longer in use.' },
  ],
  waste: [
    { title: 'Reduce unnecessary consumption', detail: 'Plan purchases to avoid materials that are unlikely to be used.' },
    { title: 'Reuse and separate materials', detail: 'Reuse suitable items and separate recyclable waste where local collection accepts it.' },
    { title: 'Consider composting organic waste', detail: 'Where appropriate, composting is an alternative to sending organic waste to landfill.' },
  ],
}

export function getDominantMessage(result: FootprintResult): string {
  if (!result.dominantCategory) return 'No emissions were recorded for the activities entered.'
  const label = result.dominantCategory === 'waste' ? 'Waste' : `${result.dominantCategory[0].toUpperCase()}${result.dominantCategory.slice(1)}`
  return `${label} is your largest emission source, contributing approximately ${result.percentages[result.dominantCategory].toFixed(0)}% of your monthly footprint.`
}

export function getRecommendations(dominantCategory: EmissionCategory | null): Recommendation[] {
  return dominantCategory ? recommendations[dominantCategory] : []
}
