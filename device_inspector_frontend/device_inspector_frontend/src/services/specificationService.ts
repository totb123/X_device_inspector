import { TSpecification } from '../types/specificationType'

export async function getSpecifications(): Promise<TSpecification[]> {
  const res = await fetch(
    `${process.env.REACT_APP_API_BASE_URL}/specifications`,
    {cache: 'no-cache'})
  return await res.json()
}