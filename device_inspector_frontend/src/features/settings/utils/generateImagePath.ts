import { 
  TCoordinatesSearchFormInput
} from '../types/coordinatesSearchFormInput'

export const generateImagePath = (
  searchFormFields: TCoordinatesSearchFormInput
) => {
  const path = `${process.env.REACT_APP_API_BASE_URL}/get_last_image?`
  const params = new URLSearchParams()
  params.append('sector_id', searchFormFields.sectorId.toString())
  params.append('side', searchFormFields.side)
  // eslint-disable-next-line @stylistic/max-len
  params.append('specification_id', searchFormFields.specificationId.toString())
  return `${path}${params}`
}