import { useQuery, useQueryClient } from 'react-query'
import { getLastImage } from '../services/getLastImage'
import { useState } from 'react'
import { LatestImageResponseType } from '../types/latestImageResponseType'

export const useLastImageGet = (
  refetchDelay: number
) => {
  
  const queryClient = useQueryClient()

  const [sectorId, setSectorId] = useState<number | undefined>()
  const [step, setStep] = useState<number>(0)

  const updateSector = (updatedSectorId: number | undefined) => {
    queryClient.invalidateQueries(['lastImage', {
      id: sectorId, step: step
    }])
    setSectorId(updatedSectorId)
  }

  const updateStep = (updatedStep: number) => {
    setStep(updatedStep)
  }

  const {data, status, refetch} = 
  useQuery<LatestImageResponseType | undefined, string>(
    ['lastImage', {id: sectorId, step: step}],
    {
      queryFn: () => sectorId === undefined 
        ? undefined 
        : getLastImage(sectorId, step),
      refetchInterval: refetchDelay,
    }
  )
  
  return {
    lastImage: data, 
    
    lastImageStatus: status, 
    selectedSector: sectorId,
    currentStep: step,
    lastImageRefetch: refetch,
    updateSectorId: updateSector,
    updateImageStep: updateStep
  }
}