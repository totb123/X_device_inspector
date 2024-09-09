import React, { useRef } from 'react'
import { Space, Button, Image } from 'antd'
import { useImage } from '../context/latestInspectionImageContext'
import { useFullScreen } from '../../../hooks/useFullscreen'

export const ImageContainer: React.FC = () => {
  // eslint-disable-next-line no-undef
  const ref = useRef<HTMLDivElement>(null)
  const imageContext = useImage()
  const fullScreen = useFullScreen(ref.current!)
  const handleFullScreen = async (state?: boolean) => {
    await fullScreen.toggleFullScreen(state)
  }
  const handlePreviousSectorClick = () => {
    console.log(imageContext.selectedSector)
    console.log(imageContext.latestImage)
    if(imageContext.selectedSector !== undefined)
      imageContext.updateSector(imageContext.selectedSector -= 1 )
  }
  const handleNextSectorClick = () => {
    console.log(imageContext.selectedSector)
    console.log(imageContext.latestImage)
    if(imageContext.selectedSector !== undefined)
      imageContext.updateSector(imageContext.selectedSector += 1 )
  }
  const handleBackButtonClick = () => {
    console.log(imageContext.selectedSector)
    console.log(imageContext.latestImage)
    handleFullScreen(false).then(_ => 
      imageContext.updateSector(undefined)
    )
  }

  return (<div ref={ref}>
    <Space>
      <Button
        onClick={handleBackButtonClick}
      >Назад</Button>
      <Button
        disabled={imageContext.selectedSector === 1}
        onClick={handlePreviousSectorClick}
      >Предыдущий сектор</Button>
      <Image src={imageContext.latestImage} />
      <Button
        disabled={imageContext.selectedSector === 4}
        onClick={handleNextSectorClick}
      >Следующий сектор</Button>
      <Button
        onClick={() => handleFullScreen(true)}
      >
        На весь экран
      </Button>
    </Space>
  </div>)
}