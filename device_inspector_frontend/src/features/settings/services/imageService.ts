export const checkImageAvaliability = async (path: string) => {
  const response = await fetch(path)
  return response.status === 200
}