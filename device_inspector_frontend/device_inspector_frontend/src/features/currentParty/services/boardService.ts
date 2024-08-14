import { TBoard } from '../../../types/boardType'
import { TEditDMs } from '../types/editDMs'

const getParams = (multiboardId: number) => {
  const params = new URLSearchParams()
  params.append('multiboard_id', multiboardId.toString())
  return params
}

export async function getBoards(multiboardId: number): Promise<TBoard[]> {
  const res = await fetch(
    // eslint-disable-next-line @stylistic/max-len
    `${process.env.REACT_APP_API_BASE_URL}/boards?${getParams(multiboardId)}`
  )
  return await res.json()
}

export async function editDMs( dto: TEditDMs) {
  const res = await fetch(
    // eslint-disable-next-line @stylistic/max-len
    `${process.env.REACT_APP_API_BASE_URL}/edit_dms`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dto)
    }
  )
  return await res.json()
}

