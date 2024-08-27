import {useQuery} from 'react-query'
import {
  getInspections,
  getInspectionsTotal
} from '../../../services/inspectionService'
import {queryClient} from '../../../App'
import {TInspection} from '../../../types/inspectionType'




function generateQuery( 
  offset?: number, 
  limit?: number
): URLSearchParams {    
  let target = new URLSearchParams()
  if (offset != null)
    target.append('skip', ((offset-1) * 10).toString())
  if (limit != null)
    target.append('limit', limit.toString())
  target.append('status', 'REQUIRE_VERIFICATION')
  return target
}


export default function useUnverifiedInspectionsGet(
  offset: number, 
  limit: number
) {
  const total = useQuery<number>({queryKey: ['inspectionsTotal'], 
    queryFn: async () => await getInspectionsTotal(
      generateQuery(offset, limit)
    )
  })

  const {
    data,
    status,
    refetch
  } = useQuery<TInspection[], string>(
    {
      queryKey: ['inspectionsHistory'],
      queryFn: () => getInspections(
        generateQuery(offset, limit)
      ), 
      initialData: () => {
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