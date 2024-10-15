
import { useMutation } from 'react-query'

import { 
  updateCoordinates 
} from '../services/coordinatesService'
import { useEffect, useState } from 'react'
import { TSettings } from '../types/settingsType'


export const useCoordinatesUpdate = (
) => {
  const [
    settings, 
    setSettings
  ] = useState<TSettings>()


  const setSettingsField = (
    newSettings: Partial<TSettings>
  ) => {
    setSettings(prevState => ({
      ...prevState, 
      ...newSettings
    } as TSettings))
  }

  const mutation = useMutation(
    async (settings: TSettings) => {
      return await updateCoordinates(
        settings
      )
    }, {    
    }
  )
  
  useEffect(() => {
    if ( settings !== undefined && !mutation.isLoading) 
      mutation.mutate(settings)
  }, [settings])

  
  return {
    setSettings: setSettingsField,
    updateStatus: mutation.status,
  }
}