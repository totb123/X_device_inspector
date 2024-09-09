/* eslint-disable @stylistic/max-len */

const transformResponseString = (responseStr: string) => {
  return responseStr.replaceAll('"', '')
}

export const getLastImage = async (sectorId: number): Promise<string> => {
  const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/get_last_image?sector_id=${sectorId}`)
  return transformResponseString(await res.text())
}