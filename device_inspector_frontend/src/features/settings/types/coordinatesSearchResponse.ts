
export type TCoordinatesSearchResponse = {
  sector_id: number
  side: 'top' | 'bot'
  specification: number
  coordinates: string[]
}