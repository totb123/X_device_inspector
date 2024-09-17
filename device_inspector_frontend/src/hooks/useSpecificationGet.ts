import {useQuery} from 'react-query'
import { TSpecification } from '../types/specificationType'
import { getSpecifications } from '../services/specificationService'

export const useSpecificationsGet = () => {
  const {
    data,
    status
  } = useQuery<TSpecification[], string>(
    'specifications', getSpecifications
  )
  return {specifications: data, specificationsStatus: status}
}
