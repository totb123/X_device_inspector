
import { useMutation, useQuery } from 'react-query'
import { TSettings } from '../types/settingsType'
import { 
  getCoordinates, 
  updateCoordinates 
} from '../services/coordinatesService'
import { useEffect, useRef, useState } from 'react'


export const useSettingsHandler = (
  sectorId: number, 
  side: 'Top' | 'Bot'
) => {
  const {
    data, status, refetch
  } = useQuery(['coordinates'],
    {
      queryFn: () => 
        getCoordinates(sectorId, side)
    }
  )
  const [initialFetch, setInitialFetch] = useState(true)
  const [
    settings, setSettings
  ] = useState<TSettings | undefined>(undefined)
  
  const prevSectorId = usePrevious(sectorId)
  const prevSide = usePrevious(side)
  
  useEffect(() => {
    if (initialFetch || prevSectorId!== sectorId || prevSide!== side) {
      setSettings(data)
      setInitialFetch(false)
    }
  }, [data, sectorId, side, initialFetch, prevSectorId, prevSide])
  
  const mutation = useMutation(
    async (
      coordinates: string[]
    ) => await updateCoordinates(
      {sector: sectorId, side: side, coordinates: coordinates} 
    ), {
      onSuccess: () => {
        refetch()
      }
    }
  )
  
  
  
  return {
    settings: data,
    settingsStatus: status,
    settingsRefetch: refetch,
    updateCoordinates: mutation.mutate,
    updateCoordinatesStatus: mutation.status
  }
}

function usePrevious<T>(value: T) {
  const ref = useRef<T>()
  useEffect(() => {
    ref.current = value
  })
  return ref.current
}
