import { useMutation } from 'react-query'
import { updateCurrentParty } from '../../../hooks/useCurrentPartyGet'

export default function updateCurrentPartyHandler(
  specificationId: number
) {
  const mutation = useMutation(
    async (
      side: string
    ) => await updateCurrentParty(specificationId, side))

  return {
    update: mutation.mutate, 
    updateStatus: mutation.status
  }
}