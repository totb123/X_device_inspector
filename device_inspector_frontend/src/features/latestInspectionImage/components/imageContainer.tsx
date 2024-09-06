import React, { useEffect } from 'react'
import { Button, Image, Space } from 'antd'
import { 
  useImage, 
} from '../context/latestInspectionImageContext'
import { SectorPicker } from './sectorPicker'

export const ImageContainer: React.FC = () => {
  const imageContext = useImage()
  const handlePreviousSectorClick = () => {
    
  }
  const handleNextSectorClick = () => {
    
  }
  const handleBackButtonClick = () => {
    imageContext.updateSector(undefined)
  }
  console.log(imageContext)
  return <>
    {
      imageContext.latestImage !== '' || 
      imageContext.selectedSector !== undefined
        ? <>
          <Space>
            <Button
              onClick={handleBackButtonClick}
            >Назад</Button>
            <Button
              disabled
              onClick={handleBackButtonClick}
            >Предыдущий сектор</Button>
            <Image src={imageContext.latestImage} />
            <Button
              disabled
              onClick={handleNextSectorClick}
            >Следующий сектор</Button>
          </Space>
        </>
        : <SectorPicker/>        
    }
  </>
}