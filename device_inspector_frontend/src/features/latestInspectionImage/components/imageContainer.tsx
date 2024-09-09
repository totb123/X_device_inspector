import React from 'react'
import { Space, Button, Image } from 'antd'
import { useImage } from '../context/latestInspectionImageContext'
import { FullScreen, useFullScreenHandle } from 'react-full-screen'

export const ImageContainer: React.FC = () => {
  
  const imageContext = useImage()
  const toggleFullScreen = useFullScreenHandle()

  const handlePreviousSectorClick = () => {
    if(imageContext.selectedSector !== undefined)
      imageContext.updateSector(imageContext.selectedSector -= 1 )
  }
  const handleNextSectorClick = () => {
    if(imageContext.selectedSector !== undefined)
      imageContext.updateSector(imageContext.selectedSector += 1 )
  }
  const handleBackButtonClick = async () => {
    imageContext.updateSector(undefined)
  }

  return (<FullScreen handle={toggleFullScreen}>
    <Space>
      {
        toggleFullScreen.active 
          ? <></>
          : <Button
            onClick={handleBackButtonClick}
          >Назад</Button>
      }
      <Button
        disabled={imageContext.selectedSector === 1}
        onClick={handlePreviousSectorClick}
      >Предыдущий сектор</Button>
      {/* eslint-disable-next-line @stylistic/max-len */}
      <Image src={`${process.env.REACT_APP_API_BASE_URL}/get_image?path=${imageContext.latestImage}`} />
      <Button
        disabled={imageContext.selectedSector === 4}
        onClick={handleNextSectorClick}
      >Следующий сектор</Button>
      {
        toggleFullScreen.active
          ? <></>
          : <Button
            onClick={toggleFullScreen.enter}
          >
          На весь экран
          </Button>
      }
    </Space>
  </FullScreen>)
}