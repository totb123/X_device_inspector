import {useQuery} from 'react-query'
import {
  getInspections,
  getInspectionsTotal
} from '../../../services/inspectionService'
import {queryClient} from '../../../App'
import {TInspection} from '../../../types/inspectionType'
import { 
  SearchFilterContextType 
} from '../types/searchFilterContextType'

function generateQuery(filters: SearchFilterContextType, 
  offset: number, 
  limit: number
): URLSearchParams {    
  let target = new URLSearchParams()
  target.append('skip', ((offset - 1) * 10).toString())
  target.append('limit', limit.toString())
  if (filters.sectorIds.length) {
    filters.sectorIds.forEach(
      sectorId => target.append('sector_ids', sectorId.toString())
    )
  }
  if (filters.multiboardIds.length) {
    filters.multiboardIds.forEach(
      multiboardId => target.append('multi_board_ids', multiboardId)
    )
  }
  
  if (filters.datamatrices.length) {
    filters.datamatrices.forEach(
      datatmatrix => target.append('datamatrices', datatmatrix)
    )
  }
  if (filters.parties.length) {
    filters.parties.forEach(
      parties => target.append('parties', parties)
    )
  }
  if (filters.statuses.length) {
    filters.statuses.forEach(
      status => target.append('status', status)
    )
  }
  if (filters.startDate !== undefined)
    target.append('start_date', filters.startDate.toISOString())
  
  if (filters.endDate !== undefined)
    target.append('end_date', filters.endDate.toISOString())
  return target
}


export default function useInspectionsSearchGet(
  filters: SearchFilterContextType, 
  offset: number, 
  limit: number
) {

  const total = useQuery<number>({queryKey: ['inspectionsTotal'], 
    queryFn: async () => 
      await getInspectionsTotal(generateQuery(filters, offset, limit))
  })
  
  const {
    data,
    status,
    refetch
  } = useQuery<TInspection[], string>(
    {
      queryKey: ['inspectionsSearch'],
      queryFn: async ()  => await getInspections(
        generateQuery(filters, offset, limit)), initialData: () => {
        return queryClient.getQueryData('inspectionsSearch')
      }
    })


  return {
    inspectionsData: data?.sort((i1, i2) => i1.id - i2.id), 
    inspectionsStatus: status, 
    inspectionsRefetch: refetch, 
    inspectionsTotal: total
  }
}