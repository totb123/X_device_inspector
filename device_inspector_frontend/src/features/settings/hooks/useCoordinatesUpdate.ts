
import { useMutation } from 'react-query'

import { 
  updateCoordinates 
} from '../services/coordinatesService'
import { useEffect, useState } from 'react'
import { 
  TCoordinatesSearchFormInput
} from '../types/coordinatesSearchFormInput'


export const useCoordinatesUpdate = (
  coordinatesSearchFormInput: TCoordinatesSearchFormInput,
  initialCoordinates: string[]
) => {
  const [
    coordinates, setCoordinates
  ] = useState<string[]>(initialCoordinates)

  const setNewCoordinates = (coordinates: string[]) => {
    setCoordinates(coordinates)
  }

  const mutation = useMutation(
    async (
      coordinates: string[]
    ) => await updateCoordinates(
      {
        sectorId: coordinatesSearchFormInput.sectorId, 
        side: coordinatesSearchFormInput.side, 
        specificationId: coordinatesSearchFormInput.specificationId, 
        coordinates: coordinates
      } 
    ), {
      
    }
  )
  
  useEffect(() => {
    if (!mutation.isLoading) 
      mutation.mutate(coordinates)
  }, [coordinates, mutation])

  
  return {
    updateStatus: mutation.status,
    updateCoordinates: setNewCoordinates,
  }
}