import { FilterContextType } from '../../../types/filterContextType'

export type SearchFilterContextType = FilterContextType & {
  sectorIds: number[]
  multiboardIds: string[]
  datamatrices: string[]
  startDate?: Date
  endDate?: Date
}
export const defaultFilters: SearchFilterContextType = {
  sectorIds: [],
  multiboardIds: [],
  datamatrices: []
}