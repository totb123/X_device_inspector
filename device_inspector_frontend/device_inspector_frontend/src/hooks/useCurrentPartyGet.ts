import {useQuery} from 'react-query'
import { TCurrentParty } from '../types/currentPartyType'
import { getCurrentParty } from '../services/currentPartyService'

export const useCurrentPartyGet = () => {
  const {
    data,
    status
  } = useQuery<TCurrentParty, string>(
    'currentParty', getCurrentParty
  )
  return [data, status]
}

export async function updateCurrentParty(
  inspectionId: number, side: string
): Promise<Boolean> {
  const res = await fetch(
    // eslint-disable-next-line @stylistic/max-len
    `${process.env.REACT_APP_API_BASE_URL}/update_current_party?specification_id=${inspectionId}&side=${side}`, 
    { method: 'POST' }
  )
  return await res.json()
}
