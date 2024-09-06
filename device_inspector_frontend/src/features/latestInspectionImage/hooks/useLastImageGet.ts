import { useQuery, useQueryClient } from 'react-query'
import { getLastImage } from '../services/getLastImage'
import { useEffect, useState } from 'react'
import { useDebounce } from '../../../hooks/useDebounce'
import { TSector } from '../../../types/sectorType'

export const useLastImageGet = (
  refetchDelay: number
) => {
  const debounce = useDebounce()
  
  const queryClient = useQueryClient()

  const [sectorId, setSectorId] = useState<number | undefined>()
  const updateSector = (updatedSectorId: number | undefined) => {
    console.log(updatedSectorId)
    queryClient.invalidateQueries(['lastImage', {id: sectorId}])
    setSectorId(updatedSectorId)
  }

  const {data, status, refetch, dataUpdatedAt} = 
  useQuery<string | undefined, string>(
    ['lastImage', {id: sectorId}],
    {
      queryFn: () => sectorId === undefined 
        ? undefined 
        : getLastImage(sectorId),
      refetchInterval: refetchDelay,
    }
  )
  
  return {
    lastImageString: data, 
    lastImageStatus: status, 
    lastImageUpdatedAt: dataUpdatedAt,
    selectedSector: sectorId,
    lastImageRefetch: refetch,
    updateSectorId: updateSector,
  }
}