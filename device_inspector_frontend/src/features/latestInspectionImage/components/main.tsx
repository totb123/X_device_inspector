import React from 'react'
import { 
  LatestInspectionImageContextProvider
} from '../context/latestInspectionImageContext'
import { ImageContainer } from './imageContainer'
import Title from 'antd/es/typography/Title'
export const MainPage: React.FC = () => {
  return <div style={{
    display: 'flex', 
    flexDirection: 'column', 
    width: '35%'
  }}>
    <Title>Последние инспекции</Title>
    <LatestInspectionImageContextProvider>
      <ImageContainer/>
    </LatestInspectionImageContextProvider>
  </div>
}