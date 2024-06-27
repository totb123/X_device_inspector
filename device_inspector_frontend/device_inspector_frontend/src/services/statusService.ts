import { InspectionStatus } from '../types/inspectionType'

function getParams(datamatrix: number, newStatus?: string) {
  const params = new URLSearchParams()
  params.append('inspection_id', datamatrix.toString())
  if (newStatus !== undefined)
    params.append('new_status', newStatus)
  return params
}

export async function getStatus(inspectionId: number): Promise<String> {
  const res = await fetch(
    // eslint-disable-next-line @stylistic/max-len
    `${process.env.REACT_APP_API_BASE_URL}/get_status?${getParams(inspectionId)}`
  )
  return await res.json()
}

export async function updateStatus(
  inspectionId: number, newStatus: InspectionStatus
): Promise<Boolean> {
  const res = await fetch(
    // eslint-disable-next-line @stylistic/max-len
    `${process.env.REACT_APP_API_BASE_URL}/change_status?${getParams(inspectionId, newStatus)}`, 
    { method: 'POST' }
  )
  return await res.json()
}