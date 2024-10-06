import { useQuery } from 'react-query'
import { checkImageAvaliability } from '../services/imageService'

export const useImageGet = (path: string) => {
  const { data, status, refetch } = useQuery<boolean>(['images', path], {
    queryFn: () => checkImageAvaliability(path),
  })
  return {
    isImageAvailable: data,
    requestStatus: status,
    recheckImage: refetch
  }
}
