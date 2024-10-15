import React, { useContext, useEffect, useState } from 'react'
import {
  ImageContextType as ContextType, 
  defaultImageContext
} from '../types/latestInspectionImageContextType'
import { useLastImageGet } from '../hooks/useLastImageGet'

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
    updateSectorId(updatedSector)
  }
  
  const {
    lastImage, 
    lastImageStatus, 
    updateSectorId, 
    selectedSector,
    updateImageStep,
    currentStep
  } =  useLastImageGet(4000) 

  const [image, setImage] = useState(
    {
      ...defaultImageContext,
      updateSector: updateSector, 
      updateStep: updateImageStep,
      currentStep: 0
    }
  )

  useEffect(() => {
    if(lastImageStatus === 'success'){ 
      setImage({
        ...image,
        totalImages: lastImage?.images_total,
        latestImage: lastImage?.image_path,
        selectedSector: selectedSector,
        latestImageCreatedAt: lastImage?.created_at,
        currentStep: currentStep
      })
    }
  }, [lastImageStatus, selectedSector, currentStep])

  useEffect(() => {
    if (lastImage?.image_path !== image.latestImage) {
      setImage({
        ...image,
        latestImage: lastImage?.image_path,
        totalImages: lastImage?.images_total,
        selectedSector: selectedSector,
        latestImageCreatedAt: lastImage?.created_at,
        currentStep: currentStep
      })
    }}, [image, lastImage, selectedSector, currentStep]
  )
  

  return (
    <>
      <ImageContext.Provider value={image}>
        {children}
      </ImageContext.Provider>
    </>
  )
}
