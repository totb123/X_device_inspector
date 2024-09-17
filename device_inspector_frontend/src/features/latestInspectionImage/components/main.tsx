import React from 'react'
import { 
  LatestInspectionImageContextProvider
} from '../context/latestInspectionImageContext'
import { PageContainer } from './pageContainer'
import Title from 'antd/es/typography/Title'
export const MainPage: React.FC = () => {
  return <div style={{
    display: 'flex', 
    flexDirection: 'column', 
    height: '100%',
  }}>
    <Title>Последние инспекции</Title>
    <LatestInspectionImageContextProvider>
      <PageContainer/>
    </LatestInspectionImageContextProvider>
  </div>
}