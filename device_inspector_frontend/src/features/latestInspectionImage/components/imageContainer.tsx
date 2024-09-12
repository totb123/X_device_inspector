import React from 'react'
import { Space, Button, Image } from 'antd'
import { useImage } from '../context/latestInspectionImageContext'
import { FullScreen, useFullScreenHandle } from 'react-full-screen'
import { SectorBadge } from '../../../components/sectorBagde'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'

export const ImageContainer: React.FC = () => {
  
  const imageContext = useImage()
  const toggleFullScreen = useFullScreenHandle()
  const normalizeTime = (time: Date) => {
    console.log(typeof time)
    // eslint-disable-next-line @stylistic/max-len
    return `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()} ${time.getDate()}-${time.getMonth()}-${time.getFullYear()} `
  }
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
                <Button
                  style={{backgroundColor: 'white'}}
                  type='link'
                  shape='circle'
                  icon={<LeftOutlined/>}
                  disabled={imageContext.selectedSector === 1}
                  onClick={handlePreviousSectorClick}
                />
                <Button
                  style={{backgroundColor: 'white'}}
                  type='link'
                  shape='circle'
                  icon={<RightOutlined/>}
                  disabled={imageContext.selectedSector === 4}
                  onClick={handleNextSectorClick}
                />
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
            style={{
              position: 'sticky',
              zIndex: 1,
              padding: '5px',
            }}
            width={toggleFullScreen.active ? '100%' : '60%'}
            // eslint-disable-next-line @stylistic/max-len
            src={`${process.env.REACT_APP_API_BASE_URL}/get_image?path=${imageContext.latestImage}`} 
            preview={false}
          />
        </div>
      </FullScreen>
    </div>)
}