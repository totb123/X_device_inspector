import {useQuery} from 'react-query'
import {
  getInspections,
  getInspectionsTotal
} from '../../../services/inspectionService'
import {queryClient} from '../../../App'
import {TInspection} from '../../../types/inspectionType'
import { 
  HistoryFilterContextType 
} from '../types/historyFilterContextType'



function generateQuery(filters: HistoryFilterContextType, 
  offset?: number, 
  limit?: number
): URLSearchParams {    
  let target = new URLSearchParams()
  if (offset != null)
    target.append('skip', ((offset-1) * 10).toString())
  if (limit != null)
    target.append('limit', limit.toString())
  
  if (filters.sectorIds.length) {
    filters.sectorIds.forEach(
      sector => target.append('sector_ids', sector.toString())
    )
  }
  return target
}


export default function useInspectionsHistoryGet(
  filters: HistoryFilterContextType, 
  offset: number, 
  limit: number
) {

  const total = useQuery<number>({queryKey: ['inspectionsTotal'], 
    queryFn: async () => await getInspectionsTotal(generateQuery(filters))
  })

  const {
    data,
    status,
    refetch
  } = useQuery<TInspection[], string>(
    {
      queryKey: ['inspectionsHistory'],
      queryFn: async ()  => await getInspections(
        generateQuery(filters, offset, limit)), initialData: () => {
        return queryClient.getQueryData('inspectionsHistory')
      }
    })


  return {
    inspectionsData: data, 
    inspectionsStatus: status, 
    inspectionsRefetch: refetch, 
    inspectionsTotal: total
  }
}