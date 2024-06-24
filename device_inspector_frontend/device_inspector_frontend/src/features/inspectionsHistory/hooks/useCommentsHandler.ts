import { useMutation, useQuery } from 'react-query'

import { getComments, pushComment } from '../../../services/commentService'
import { TComment } from '../../../types/commentType'

export default function useCommentsHandler(inspectionId: number) {
  const {
    data, 
    status, 
    refetch
  } = useQuery(
    ['comments',inspectionId], 
    {
      queryFn: () =>  getComments(inspectionId),
    }
  )

  const mutation = useMutation(
    async (
      comment: TComment
    ) => await pushComment(inspectionId, comment), {
      onSuccess: () => {
        refetch()
      }
    })

  return {
    comments: data,
    commentsStatus: status,
    commentsRefetch: refetch,
    addComment: mutation.mutate, 
    addCommentStatus: mutation.status
  }
}