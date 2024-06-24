import {TSector} from '../types/sectorType'
import {useQuery} from 'react-query'
import {getSectors} from '../services/sectorService'

export const useSectorGet = () => {
  const {
    data,
    status
  } = useQuery<TSector[], string>('sectors', getSectors)
  return [data, status]
}