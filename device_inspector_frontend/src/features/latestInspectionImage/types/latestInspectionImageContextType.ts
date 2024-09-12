
export type ImageContextType = {
  selectedSector?: number
  latestImageCreatedAt?: Date
  latestImage?: string
  updateSector: (sector: number | undefined) => void
}
export const defaultImageContext: ImageContextType = {
  updateSector: function (sector: number | undefined): void {
    console.log('default updateSector', sector)
  }
}