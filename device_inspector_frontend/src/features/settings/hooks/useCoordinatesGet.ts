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

  const [
    statusCode, setStatusCode
  ] = useState<number>()
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
  TCoordinatesSearchResponse| undefined, Error
  >(
    ['coordinates', coordinatesSearchFormInput],
    {
      retry: false,
      refetchOnWindowFocus: false,
      refetchInterval: false, 
      refetchOnMount: false,
      queryFn: async () => {
        if (!validateCoordinatesFormInput(coordinatesSearchFormInput)) 
          throw new Error('Invalid fields')
        
        const response = await getCoordinates(
          coordinatesSearchFormInput as TCoordinatesSearchFormInput
        ).then(response => response)
        setStatusCode(response.status)
        return response.response
      }
      
    }
  )
  return {
    getCoordinates: data,
    searchValues: coordinatesSearchFormInput,
    getStatus: status,
    fetchStatusCode: statusCode,
    getRefetch: refetch,
    updateFormValues
  }
}
