import React, { useContext, useEffect, useState } from 'react'
import {
  ImageContextType as ContextType, 
  defaultImageContext
} from '../types/latestInspectionImageContextType'
import { useLastImageGet } from '../hooks/useLastImageGet'
import { useFullScreen } from '../../../hooks/useFullscreen'
type ImageContextProps = {
  children: React.ReactNode
}

const ImageContext =
 React.createContext<ContextType>(defaultImageContext)

export function useImage()  {
  return useContext(ImageContext)
}
export const LatestInspectionImageContextProvider: 
React.FC<ImageContextProps> = (
  {children}
) => {
  const updateSector = (updatedSector: number | undefined) => {
    console.log('updateSector', updatedSector)
    updateSectorId(updatedSector)
  }
  const {
    lastImageString, 
    lastImageStatus, 
    lastImageUpdatedAt,
    updateSectorId, 
    selectedSector
  } =  useLastImageGet(4000) 

  const [image, setImage] = useState(
    {...defaultImageContext,updateSector: updateSector}
  )

  useEffect(() => {
    console.log('refetched')
    if(lastImageStatus === 'success'){ 
      setImage({
        ...image,
        latestImage: lastImageString,
        selectedSector: selectedSector
      })
    }
  }, [lastImageStatus, selectedSector])

  return (
    <>
      <ImageContext.Provider value={image}>
        {children}
      </ImageContext.Provider>
    </>
  )
}
