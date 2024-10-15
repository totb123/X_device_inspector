/* eslint-disable @stylistic/max-len */

import { LatestImageResponseType } from '../types/latestImageResponseType'

export const getLastImage = async (sectorId: number, step: number): Promise<LatestImageResponseType> => {
  console.log(sectorId, step)
  const jsonRes = await (await fetch(`${process.env.REACT_APP_API_BASE_URL}/get_last_image?sector_id=${sectorId}&step=${step}`)).json()
  return {
    image_path: jsonRes.image_path,
    created_at: new Date(jsonRes.created_at),
    images_total: jsonRes.images_total
  }
}