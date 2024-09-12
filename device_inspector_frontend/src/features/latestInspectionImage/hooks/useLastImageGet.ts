import { useQuery, useQueryClient } from 'react-query'
import { getLastImage } from '../services/getLastImage'
import { useState } from 'react'
import { LatestImageResponseType } from '../types/latestImageResponseType'

export const useLastImageGet = (
  refetchDelay: number
) => {
  
  const queryClient = useQueryClient()

  const [sectorId, setSectorId] = useState<number | undefined>()
  const updateSector = (updatedSectorId: number | undefined) => {
    console.log(updatedSectorId)
    queryClient.invalidateQueries(['lastImage', {id: sectorId}])
    setSectorId(updatedSectorId)
  }

  const {data, status, refetch} = 
  useQuery<LatestImageResponseType | undefined, string>(
    ['lastImage', {id: sectorId}],
    {
      queryFn: () => sectorId === undefined 
        ? undefined 
        : getLastImage(sectorId),
      refetchInterval: refetchDelay,
    }
  )
  
  return {
    lastImage: data, 
    lastImageStatus: status, 
    selectedSector: sectorId,
    lastImageRefetch: refetch,
    updateSectorId: updateSector,
  }
}