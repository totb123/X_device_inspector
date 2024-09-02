import { TCurrentParty } from '../types/currentPartyType'

export async function getCurrentParty(): Promise<TCurrentParty> {
  const res = await fetch(
    `${process.env.REACT_APP_API_BASE_URL}/get_current_party`,
    {cache: 'no-cache'})
  return await res.json()
}