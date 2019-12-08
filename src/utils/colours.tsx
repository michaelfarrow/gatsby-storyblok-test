
const COLOUR_UNASSIGNED = '#ff00ff'

export const COLOURS = {
  brand_primary: '#ce495b',
  text_mid: '#777777',
}

export function colour(name: string): string {
  return COLOURS[name] || COLOUR_UNASSIGNED
}