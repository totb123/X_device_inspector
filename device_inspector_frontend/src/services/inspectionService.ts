import {TInspection} from '../types/inspectionType'

export async function getInspectionsTotal(
  generatedQuery: URLSearchParams
): Promise<number> {
  const params = generatedQuery
  const res =  await fetch(
    `${process.env.REACT_APP_API_BASE_URL}/inspections/count?${params}`)
  return parseInt(await res.text())
}

export async function getInspections(
  generatedQuery: URLSearchParams
): Promise<TInspection[]> {
  const params = generatedQuery
  // eslint-disable-next-line @stylistic/max-len
  const res = await fetch(
    `${process.env.REACT_APP_API_BASE_URL}/inspections?${params}`,
    {cache: 'no-cache'}
  )
  return await res.json()
}