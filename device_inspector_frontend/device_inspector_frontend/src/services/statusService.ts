import { BoardStatus } from '../types/boardType'

function getParams(datamatrix: number, newStatus?: string) {
  const params = new URLSearchParams()
  params.append('datamatrix', datamatrix.toString())
  if (newStatus !== undefined)
    params.append('new_status', newStatus)
  return params
}

export async function getStatus(datamatrix: number): Promise<String> {
  const res = await fetch(
    // eslint-disable-next-line @stylistic/max-len
    `${process.env.REACT_APP_API_BASE_URL}/get_status?${getParams(datamatrix)}`
  )
  return await res.json()
}

export async function updateStatus(
  datamatrix: number, newStatus: BoardStatus
): Promise<Boolean> {
  const res = await fetch(
    // eslint-disable-next-line @stylistic/max-len
    `${process.env.REACT_APP_API_BASE_URL}/change_status?${getParams(datamatrix, newStatus)}`, 
    { method: 'POST' }
  )
  return await res.json()
}