import { TComment } from '../types/commentType'

export async function getComments(
  inspectionId: number
): Promise<TComment[]> {
  const res = await fetch(
    // eslint-disable-next-line @stylistic/max-len
    `${process.env.REACT_APP_API_BASE_URL}/comment?inspection_id=${inspectionId.toString()}`
  )
  return await res.json()
}

export async function pushComment(
  inspectionId: number,
  comment: TComment
) {
  const res = await fetch(
    // eslint-disable-next-line @stylistic/max-len
    `${process.env.REACT_APP_API_BASE_URL}/comment?inspection_id=${inspectionId.toString()}`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(comment)
    }
  )
  return await res.json()
}
