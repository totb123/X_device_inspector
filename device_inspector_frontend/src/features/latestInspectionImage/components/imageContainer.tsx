/* eslint-disable @stylistic/max-len */
import React, { useEffect } from 'react'
import { Space, Button, Image } from 'antd'
import { useImage } from '../context/latestInspectionImageContext'
import { FullScreen, useFullScreenHandle } from 'react-full-screen'
import { SectorBadge } from '../../../components/sectorBagde'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'

export const ImageContainer: React.FC = () => {
  
  const imageContext = useImage()
  const toggleFullScreen = useFullScreenHandle()
  const [image, setImage] = React.useState<string | undefined>(undefined)
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
  const handleBackButtonClick = async () => {
    imageContext.updateSector(undefined)
    imageContext.updateStep(0)
  }

  useEffect(() => {
    if (imageContext.latestImage !== image) 
      setImage(imageContext.latestImage ?? '')
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
            : <Button
              onClick={handleBackButtonClick}
            >Назад</Button>
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
                {!toggleFullScreen.active && <>
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
            key={imageContext.latestImage}
            style={{
              position: 'sticky',
              zIndex: 1,
              padding: '5px',
            }}
            width={toggleFullScreen.active ? '100%' : '60%'}
            // eslint-disable-next-line @stylistic/max-len
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