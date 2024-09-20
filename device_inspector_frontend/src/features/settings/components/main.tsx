/* eslint-disable @stylistic/max-len */
/* eslint-disable react/jsx-key */

import {Form } from 'antd'
import Title from 'antd/es/typography/Title'
import React, { useEffect, useState } from 'react'
import {TSettings} from '../types/settingsType'

import { MapperImage } from './customMarker'

import { CoordinatesSearchForm } from './coordinatesSearchForm'
import { useCoordinatesGet } from '../hooks/useCoordinatesGet'
import { TCoordinatesSearchFormInput } from '../types/coordinatesSearchFormInput'


export const MainPage: React.FC = () => {
  const [form] = Form.useForm<TSettings>()
  const [side, setSide] = useState<'Top' | 'Bot'>('Top') 
  const [sectorId, setSectorId] = useState(1)
  const [specificationId, setSpecificationId] = useState(1)
  
  const [
    updatedCoordinates, 
    setUpdatedCoordinates
  ] = useState<string[]>(undefined!)

  const [
    markerInitCoordinates, 
    setMarkerInitCoordinates
  ] = useState<string | undefined>(undefined)

  const [
    currentBoardIndex, 
    setCurrentBoardIndex
  ] = useState<number | undefined>(undefined)

  const handleCoordinateChange = (index: number, value: string) => {
    const clearString = value.replace(/\s+/g, '')
    const updatedCoordinatesWithNewValue = [...updatedCoordinates]
    updatedCoordinatesWithNewValue[index] = clearString
    setUpdatedCoordinates(updatedCoordinatesWithNewValue)
  }


  const showMarker = (index: number, value: string) => {
    setCurrentBoardIndex(index)
    setMarkerInitCoordinates(value)
  }

  const {
    getCoordinates,
    getStatus,
    getRefetch,
    updateFormValues
  } = useCoordinatesGet()
  const handleCoordinatesFormSubmit = (formInput: TCoordinatesSearchFormInput) => {
    updateFormValues(formInput)
  }
  // useEffect(() => {
  //   settingsRefetch().then(val => setUpdatedCoordinates(val.data?.coordinates || []))
  //   return () => {}
  // }, [settings, sectorId, side, specificationId, settingsRefetch, updateCoordinates])

  return (<div>
    <Title level={1}>Настройки</Title>
    <CoordinatesSearchForm 
      fetchStatus={getStatus} 
      onSubmit={handleCoordinatesFormSubmit}    
    />
    <div style={{padding: '10px'}}>  
      <MapperImage
        path={`${process.env.REACT_APP_API_BASE_URL}/get_last_image?sector_id=${sectorId}&side=${side}&specification_id=${specificationId}`} 
        initCoordinates={markerInitCoordinates}
        handleCoordinateChange={handleCoordinateChange}
        boardIndex={currentBoardIndex} />
    </div>  
  </div>)
}