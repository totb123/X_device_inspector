
export type ImageContextType = {
  selectedSector?: number
  currentStep?: number
  totalImages?: number
  latestImageCreatedAt?: Date
  latestImage?: string
  updateSector: (sector: number | undefined) => void
  updateStep: (step: number) => void
}
export const defaultImageContext: ImageContextType = {
  updateSector: function (sector: number | undefined): void {
    console.log('default updateSector', sector)
  },
  updateStep: function (step: number): void {
    console.log('default updateStep', step)
  }
}