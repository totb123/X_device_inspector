import { useState } from 'react'

export const useFullScreen = (
  // eslint-disable-next-line no-undef
  fullScreenObject: Element | undefined
) => {
  const [isFullScreen, setIsFullScreen] = useState(false)
  const toggleFullScreen = async (newState?: boolean) => {
    if (newState !== undefined){
      setIsFullScreen(newState)
      await fullScreenObject?.requestFullscreen({
        navigationUI: newState ? 'show' : 'hide'
      })
    }
    if (!isFullScreen) {
      setIsFullScreen(true)
      await fullScreenObject?.requestFullscreen({navigationUI: 'show'})
    }
    else{
      setIsFullScreen(false)
      await fullScreenObject?.requestFullscreen({navigationUI: 'hide'})
    }
  }
  return {toggleFullScreen, isFullScreen}
}