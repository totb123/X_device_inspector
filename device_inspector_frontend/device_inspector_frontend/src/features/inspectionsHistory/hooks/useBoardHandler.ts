import { useMutation, useQuery } from 'react-query'
import { editDMs, getBoards } from '../services/boardService'
import { TEditDMs } from '../types/editDMs'

export default function useBoardsGet(multiboardId: number) {
  const {
    data, 
    status, 
    refetch
  } = useQuery(['boards', multiboardId], () => getBoards(multiboardId))

  const mutation = useMutation(
    async (
      dto: TEditDMs
    ) => await editDMs(dto), {
      onSuccess: () => {
        refetch()
      }
    })
    
  return {
    boards: data,
    boardsStatus: status,
    boardsRefetch: refetch,
    boardsEditDMs: mutation.mutate,
    boardsEditDMsStatus: mutation.status
  }
}
