import { useQuery } from 'react-query'
import { getBoards } from '../services/boardService'

export default function useBoardsGet(multiboardId: number) {
  const {
    data, 
    status, 
    refetch
  } = useQuery(['boards', multiboardId], ()=> getBoards(multiboardId))
  return {
    boards: data,
    boardsStatus: status,
    boardsRefetch: refetch
  }
}
