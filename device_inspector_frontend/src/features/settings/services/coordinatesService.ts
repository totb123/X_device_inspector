import { 
  TCoordinatesSearchFormInput
} from '../types/coordinatesSearchFormInput'
import { 
  TCoordinatesSearchResponse
} from '../types/coordinatesSearchResponse'
import { TSettings } from '../types/settingsType'

const generateGetParams = (searchData: TCoordinatesSearchFormInput) => {
  const params = new URLSearchParams()
  params.append('sector_id', searchData.sectorId.toString())
  params.append('side', searchData.side)
  params.append('specification', searchData.specificationId.toString())
  return params
}

const generateUpdateParams = (settings: TSettings) => {
  const params = new URLSearchParams()
  console.log(settings)
  // TODO: срочно переписать этот мусор, когда будет время
  params.append('sector_id', settings.sectorId.toString())
  params.append('side', settings.side)
  params.append('specification_id', settings.specificationId.toString())
  settings.coordinates.forEach(coordinate => params.append(
    'coordinates', coordinate
  ))
  return params
}

export const getCoordinates = async (
  coordinatesSearchData: TCoordinatesSearchFormInput
): Promise<{
  status: number, 
  response: TCoordinatesSearchResponse | undefined
}> => {
  const res = await fetch(
    // eslint-disable-next-line @stylistic/max-len
    `${process.env.REACT_APP_API_BASE_URL}/get_coordinates?${generateGetParams(coordinatesSearchData)}`
  )
  if (res.status === 404) 
  {return {
    status: 404,
    response: undefined
  }}
  return {
    status: 200,
    response: await res.json()
  }
}

export const updateCoordinates = async (
  settings: TSettings
) => {
  const res = await fetch(
    // eslint-disable-next-line @stylistic/max-len
    `${process.env.REACT_APP_API_BASE_URL}/change_coordinates?${generateUpdateParams(settings)}`)
  return await res.json()
}