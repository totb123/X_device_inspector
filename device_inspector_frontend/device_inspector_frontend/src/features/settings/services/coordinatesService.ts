import { TreeSelectProps } from 'antd'
import { TSettings } from '../types/settingsType'

const generateParams = (settings: TSettings) => {
  const params = new URLSearchParams()
  // TODO: срочно переписать этот мусор, когда будет время
  params.append('sector_id', settings.sector.toString())
  params.append('side', settings.side)
  settings.coordinates.forEach(coordinate => params.append(
    'coordinates', coordinate
  ))
  return params
}

export const getCoordinates = async (
  sector_id: number, side: string
): Promise<TSettings> => {
  const res = await fetch(
    // eslint-disable-next-line @stylistic/max-len
    `${process.env.REACT_APP_API_BASE_URL}/get_coordinates?sector_id=${sector_id}&side=${side}`
  )
  return await res.json()
}

export const updateCoordinates = async (
  settings: TSettings
) => {
  const res = await fetch(
    // eslint-disable-next-line @stylistic/max-len
    `${process.env.REACT_APP_API_BASE_URL}/change_coordinates?${generateParams(settings)}`)
}