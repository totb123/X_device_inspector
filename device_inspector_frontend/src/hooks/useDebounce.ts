import { useRef } from 'react'

export const useDebounce = () => {
  // eslint-disable-next-line no-undef
  const debounces = useRef<NodeJS.Timeout>()

  const debounce = (callback: () => void | Promise<void>, ms: number) => {
    if (debounces.current) clearTimeout(debounces.current)
    debounces.current = setTimeout(callback, ms)
  }

  return debounce
}
