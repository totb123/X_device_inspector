import React from 'react'
import { 
  useImage, 
} from '../context/latestInspectionImageContext'
import { SectorPicker } from './sectorPicker'
import { ImageContainer } from './imageContainer'

export const PageContainer: React.FC = () => {
  const imageContext = useImage()
  return <>
    {
      imageContext.latestImage !== undefined &&  
      imageContext.selectedSector !== undefined
        ? <ImageContainer />
        : <SectorPicker/>
    }
  </>
}