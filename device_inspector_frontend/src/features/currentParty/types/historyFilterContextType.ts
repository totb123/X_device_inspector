import { FilterContextType } from '../../../types/filterContextType'

export type HistoryFilterContextType = FilterContextType & {
  sectorIds: number[]
}
export const defaultFilters: HistoryFilterContextType = {
  sectorIds: []
}