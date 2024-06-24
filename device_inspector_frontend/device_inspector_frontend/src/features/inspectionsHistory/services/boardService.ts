import { TBoard } from '../../../types/boardType'

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