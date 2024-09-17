export enum InspectionStatus {
  UNCHECKED = 'UNCHECKED',
  NORMAL = 'NORMAL',
  DEFECTIVE = 'DEFECTIVE',
  REQUIRE_VERIFICATION = 'REQUIRE_VERIFICATION'
}

export type TInspection = {
  id: number
  sector_id: number
  multiboard_id: number
  url_image: string
  status: InspectionStatus
  time: Date
  side: string
}
