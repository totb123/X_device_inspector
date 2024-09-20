import { useState } from 'react'
import { 
  TCoordinatesSearchFormInput 
} from '../types/coordinatesSearchFormInput'
import { useQuery, useQueryClient } from 'react-query'
import { getCoordinates } from '../services/coordinatesService'
import { 
  TCoordinatesSearchResponse 
} from '../types/coordinatesSearchResponse'



export const useCoordinatesGet = () => {
  const queryClient = useQueryClient()
  const [
    coordinatesSearchFormInput, 
    setCoordinatesSearchFormInput
  ] = useState<Partial<TCoordinatesSearchFormInput>>({})
  
  const updateFormValues = (
    formData : Partial<TCoordinatesSearchFormInput>
  ) => {
    setCoordinatesSearchFormInput(formData)
    queryClient.invalidateQueries(
      ['coordinates', coordinatesSearchFormInput]
    )
  }
  
  const validateCoordinatesFormInput = (
    formData : Partial<TCoordinatesSearchFormInput>
  ) => {
    if (formData.specificationId === undefined) return false
    if (formData.sectorId === undefined) return false
    if (formData.side === undefined) return false
    return true
  }
  
  const {data, status, refetch} = useQuery<
  TCoordinatesSearchResponse, Error
  >(
    ['coordinates', coordinatesSearchFormInput],
    {
      retry: false,
      refetchOnWindowFocus: false,
      refetchInterval: false, 
      queryFn: () => {
        if (!validateCoordinatesFormInput(coordinatesSearchFormInput)) 
          throw new Error('Invalid fields')
        
        return getCoordinates(
          coordinatesSearchFormInput as TCoordinatesSearchFormInput
        ).then(response => response)
      }
    }
  )
  return {
    getCoordinates: data,
    getStatus: status,
    getRefetch: refetch,
    updateFormValues
  }
}
