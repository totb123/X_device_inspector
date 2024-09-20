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
  params.append('specification_id', searchData.specificationId.toString())
  return params
}

const generateUpdateParams = (settings: TSettings) => {
  const params = new URLSearchParams()
  // TODO: срочно переписать этот мусор, когда будет время
  params.append('sector_id', settings.sectorId.toString())
  params.append('side', settings.side)
  params.append('specification', settings.specificationId.toString())
  settings.coordinates.forEach(coordinate => params.append(
    'coordinates', coordinate
  ))

}

export const getCoordinates = async (
  coordinatesSearchData: TCoordinatesSearchFormInput
): Promise<TCoordinatesSearchResponse> => {
  const res = await fetch(
    // eslint-disable-next-line @stylistic/max-len
    `${process.env.REACT_APP_API_BASE_URL}/get_coordinates?${generateGetParams(coordinatesSearchData)}`
  )
  return await res.json()
}

export const updateCoordinates = async (
  settings: TSettings
) => {
  const res = await fetch(
    // eslint-disable-next-line @stylistic/max-len
    `${process.env.REACT_APP_API_BASE_URL}/change_coordinates?${generateUpdateParams(settings)}`)
}