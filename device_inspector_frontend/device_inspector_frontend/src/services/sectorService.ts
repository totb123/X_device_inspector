import {TSector} from '../types/sectorType'

export async function getSectors(): Promise<TSector[]> {
  const res = await fetch(
    `${process.env.REACT_APP_API_BASE_URL}/sectors`,
    {cache: 'no-cache'})
  return await res.json()
}