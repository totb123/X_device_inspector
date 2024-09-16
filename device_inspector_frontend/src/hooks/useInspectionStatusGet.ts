import { useQuery } from 'react-query'
import { getAllInspectionsStatuses } from '../services/statusService'


export const useStatusGet = () => {
  const { 
    data, status 
  } = useQuery<String[], string>(
    'inspectionstatuses', 
    getAllInspectionsStatuses
  )
  return [data, status]
}
