import { TSector } from '../../../types/sectorType'

export type ImageContextType = {
  selectedSector?: number
  latestImage?: string
  updateSector: (sector: number | undefined) => void
}
export const defaultImageContext: ImageContextType = {
  updateSector: function (sector: number | undefined): void {
    console.log('default updateSector', sector)
  }
}