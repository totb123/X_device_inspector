/**
 * Использовался до введения react-query. Не использовать
 */
import {useState} from 'react'

type RequestMethod = 'get' | 'post' | 'put' | 'patch' | 'delete'
type RequestOptions = {
  method: RequestMethod,
  accessControlAllowOrigin: String
}

export function useRequest<TD, TA = undefined>(
  url: string, 
  options: RequestOptions = {
    method: 'get', accessControlAllowOrigin:'*' }
) {

  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<TD | null>(null)
  const [error, setError] = useState<any | null>(null)
  const request = async (args: {
    body: TA
  }) => {
    setLoading(true)
    setError(null)
    setData(null)
    console.log('loading, error, data', loading, error, data)
    try {
      const result = await fetch(url, {
        body: options.method == 'get'
          ? undefined
          : JSON.stringify(args.body),
        method:  options.method,
        cache: 'no-cache',
      })
      console.log(result)
      const data: TD = await result.json()
      setData(data)
      setLoading(false)
      return data
    } catch (error) {
      console.log(error)
      setError(error as any)
      setLoading(false)
      throw error
    }

  }
  return {
    request,
    result: {
      data,
      error,
      loading
    }
  }
}