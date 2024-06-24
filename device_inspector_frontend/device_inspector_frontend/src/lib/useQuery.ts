//@ts-ignore
// eslint-disable @stylistic/max-len
import {useQuery as hook} from 'react-query'


//todo: реализовать до конца обертку на useQuery
/**
 * Обертка
 * @param queryKey
 * @param queryFunction
 */

// eslint-disable-next-line @stylistic/max-len
export function useQuery<TD, TE>(queryKey: string, queryFunction: Function) {
  return hook<TD, TE>({
    queryKey: queryKey,
  })
}