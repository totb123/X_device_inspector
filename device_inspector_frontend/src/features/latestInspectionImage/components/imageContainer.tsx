/* eslint-disable @stylistic/max-len */
import React, { useEffect, useState } from 'react'
import { Space, Button, Image, Switch } from 'antd'
import { useImage } from '../context/latestInspectionImageContext'
import { FullScreen, useFullScreenHandle } from 'react-full-screen'
import { SectorBadge } from '../../../components/sectorBagde'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'

const defaultPositionScale = { x: 0, y: 0, scale: 1 }

export const ImageContainer: React.FC = () => {
  
  const imageContext = useImage()
  const toggleFullScreen = useFullScreenHandle()
  const [image, setImage] = useState<string | undefined>(undefined)
  const [areControlsVisible, setAreControlsVisible] = React.useState(false)
  const [pos, setPos] = useState(defaultPositionScale)
  const normalizeTime = (time: Date) => {
    // eslint-disable-next-line @stylistic/max-len
    return `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()} ${time.getDate()}-${time.getMonth()}-${time.getFullYear()} `
  }

  const generateImageURL = () => {
  // eslint-disable-next-line @stylistic/max-len
    return `${process.env.REACT_APP_API_BASE_URL}/get_image?path=${image}`
  }

  const handlePreviousImageClick = () => {
    if(imageContext.currentStep !== undefined)
      imageContext.updateStep(imageContext.currentStep -= 1 )
  }
  const handleNextImageClick = () => {
    if(imageContext.currentStep !== undefined)
      imageContext.updateStep(imageContext.currentStep += 1 )
  }
  
  const toggleControlsVisibility = () => {
    if(areControlsVisible)
      setAreControlsVisible(false)
    else
      setAreControlsVisible(true)
  }
  const handleBackButtonClick = async () => {
    imageContext.updateSector(undefined)
    imageContext.updateStep(0)
  }

  const handleZoomChange = (
    // eslint-disable-next-line no-undef
    e: React.WheelEvent<HTMLImageElement>
  ) => {
    if (!toggleFullScreen.active) return 
    const delta = e.deltaY * -0.01
    const scaleIncriment = pos.scale + delta
    const maxScale = 10
    const minScale = 0.9
    const newScale = Math.max(minScale, Math.min(scaleIncriment, maxScale))
    const ratio = 1 - newScale / pos.scale

    setPos({
      scale: newScale,
      x: pos.x + (e.clientX - pos.x) * ratio,
      y: pos.y + (e.clientY - pos.y) * ratio
    })
  }

  const handleZoomReset = () => {
    setPos(defaultPositionScale)
  }

  useEffect(() => {
    if (imageContext.latestImage !== image){
      setImage(imageContext.latestImage ?? '')
      setPos(defaultPositionScale)
    }
  }, [
    imageContext.latestImage, 
    setImage, 
    image, 
  ])
  return (
    <div style={{
      display: 'inline-block',
      
    }}>
      <div style={{
        padding: '5px',
      }}> 
        {
          toggleFullScreen.active 
            ? <></>
            : <Space direction='vertical'>
              <Button
                onClick={handleBackButtonClick}
              >Назад</Button>
              <>Показывать переключение секторов</>
              <Switch 
                style={{marginLeft: '10px'}}
                checked={areControlsVisible} 
                onChange={toggleControlsVisibility}/>
            </Space>
        }
      </div>
      <FullScreen handle={toggleFullScreen}>
        <div style={{
          position: 'relative',
        }}>
          <div style={{
            position: 'absolute',
            zIndex: 2,
            padding: '10px',
          }}>
            <Space direction='vertical'>
              <Space>
                {!toggleFullScreen.active && areControlsVisible && <>
                  <Button
                    style={{backgroundColor: 'white'}}
                    type='link'
                    shape='circle'
                    icon={<LeftOutlined/>}
                    disabled={imageContext.currentStep === 0}
                    onClick={handlePreviousImageClick}
                  />
                  <Button
                    style={{backgroundColor: 'white'}}
                    type='link'
                    shape='circle'
                    icon={<RightOutlined/>}
                    disabled={
                      imageContext.totalImages === undefined
                        ? true                        
                        : imageContext.currentStep === imageContext.totalImages - 1
                    }
                    onClick={handleNextImageClick}
                  />
                </>
                }
                {
                  toggleFullScreen.active
                    ? <div style={{
                      background: 'white', 
                      display:'inline-block', 
                      borderRadius: '5px', 
                      padding: '5px',
                      border: '1px',
                      borderColor: 'grey',
                    }}>
                      {imageContext.selectedSector !== undefined && 
                    <SectorBadge sector_id={imageContext.selectedSector}/>}
                    </div>
                    : <Button
                      onClick={toggleFullScreen.enter}
                    >
                    На весь экран
                    </Button>
                }
              </Space>
              {
                !toggleFullScreen.active &&
                <div style={{
                  background: 'white', 
                  display:'inline-block', 
                  borderRadius: '5px', 
                  padding: '5px',
                  border: '1px',
                  borderColor: 'grey',
                }}>
                  {imageContext.selectedSector !== undefined && 
                  <SectorBadge sector_id={imageContext.selectedSector}/>}
                </div>
              }
              <div style={{
                background: 'white', 
                display:'inline-block', 
                borderRadius: '5px', 
                padding: '5px',
                border: '1px',
                borderColor: 'grey',
              }}>
                {imageContext.latestImageCreatedAt !== undefined && 
                <>{normalizeTime(imageContext.latestImageCreatedAt)}</>}
              </div>
            </Space>
          </div>
          <Image
            onWheel={e => handleZoomChange(e)}
            onDoubleClick={e => handleZoomReset()}
            key={imageContext.latestImage}
            style={{...{
              position: 'sticky',
              zIndex: 1,
              padding: '5px',        
              transformOrigin: toggleFullScreen.active ? '0 0' : undefined,
              // eslint-disable-next-line @stylistic/max-len
              transform: toggleFullScreen.active ? `translate(${pos.x}px, ${pos.y}px) scale(${pos.scale})` : undefined,
            }}}
            width={toggleFullScreen.active ? '100%' : '60%'}
            src={generateImageURL()} 
            preview={false}
          />
          {toggleFullScreen.active && 
            <div style={{
              width: '100%',
              display: 'flex',
              position: 'fixed',
              top: '50%',
              zIndex: 3,
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}>
              {areControlsVisible && <>
                <Button
                  style={{backgroundColor: 'white'}}
                  type='link'
                  shape='circle'
                  icon={<LeftOutlined/>}
                  disabled={imageContext.selectedSector === 1}
                  onClick={handlePreviousImageClick}
                />
                <Button
                  style={{backgroundColor: 'white'}}
                  type='link'
                  shape='circle'
                  icon={<RightOutlined/>}
                  disabled={imageContext.selectedSector === 4}
                  onClick={handleNextImageClick}
                />
              </>}
              <Button
                style={{backgroundColor: 'white'}}
                type='link'
                shape='circle'
                icon={<LeftOutlined/>}
                disabled={imageContext.currentStep === 0}
                onClick={handlePreviousImageClick}
              />
              <Button
                style={{backgroundColor: 'white'}}
                type='link'
                shape='circle'
                icon={<RightOutlined/>}
                disabled={
                  imageContext.totalImages === undefined
                    ? true                        
                    : imageContext.currentStep === imageContext.totalImages - 1
                }
                onClick={handleNextImageClick}
              />
            </div>
          }
        </div>
      </FullScreen>
    </div>)
}