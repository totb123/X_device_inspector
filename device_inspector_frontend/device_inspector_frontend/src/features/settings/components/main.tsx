/* eslint-disable @stylistic/max-len */
/* eslint-disable react/jsx-key */

import {Button, Col, Form, Input, Row, Space, Spin } from 'antd'
import Title from 'antd/es/typography/Title'
import React, { useEffect, useState } from 'react'
import {TSettings} from '../types/settingsType'
import { SectorInput } from '../../../components/sectorInput'
import { SidePicker } from './sidePicker'
import { useSettingsHandler } from '../hooks/useSettingsHandler'
import { MapperImage } from './customMarker'
import { SpecificationInput } from '../../../components/specificationInput'


export const MainPage: React.FC = () => {
  const [form] = Form.useForm<TSettings>()
  const [side, setSide] = useState<'Top' | 'Bot'>('Top') 
  const [sectorId, setSectorId] = useState(1)
  const [specificationId, setSpecificationId] = useState(1)
  const {
    settings,
    settingsStatus, 
    settingsRefetch,
    updateCoordinates,
    updateCoordinatesStatus
  } = useSettingsHandler(sectorId ,side, specificationId)

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

  const handleSpecification = (specificationPicked: number) => {
    setSpecificationId(specificationPicked)
  }

  const handleSector = (sectorsPicked: number) => {
    setSectorId(sectorsPicked)
  }

  const handleSide = (sidePicked: string) => {
    setSide(sidePicked === 'Top' ? 'Top' : 'Bot')
  }

  const handleCoordinateChange = (index: number, value: string) => {
    const clearString = value.replace(/\s+/g, '')
    const updatedCoordinatesWithNewValue = [...updatedCoordinates]
    updatedCoordinatesWithNewValue[index] = clearString
    setUpdatedCoordinates(updatedCoordinatesWithNewValue)
  }

  const handleFormSubmit = () => {
    updateCoordinates(updatedCoordinates)
  }

  const showMarker = (index: number, value: string) => {
    setCurrentBoardIndex(index)
    setMarkerInitCoordinates(value)
  }

  useEffect(() => {
    settingsRefetch().then(val => setUpdatedCoordinates(val.data?.coordinates || []))
    return () => {}
  }, [settings, sectorId, side, specificationId, settingsRefetch, updateCoordinates])

  return (<div>
    <Title level={1}>Настройки</Title>
    <Form 
      form={form}
      layout='vertical'
      style={{padding: '16px'}}
    >
      <Form.Item label="Спецификация" style={{width: '120px'}}>
        <SpecificationInput 
          defaultValue={{
            label: '10.2.16 ПЛФ',
            value: 1
          }}
          isMultiple={false}
          allowClear ={false}
          onChange={handleSpecification} 
        />
      </Form.Item>
      <Form.Item label="Сектор" style={{width: '120px'}}>
        <SectorInput 
          defaultValue={{
            label: 'Гравер',
            value: 1
          }}
          isMultiple={false}
          allowClear ={false}
          onChange={handleSector} 
        />
      </Form.Item>
      <Form.Item label={'Сторона'} style={{width: '120px'}}>
        <SidePicker onChange={handleSide}/>
      </Form.Item>
      <Space.Compact direction='vertical'>
        { updatedCoordinates !== undefined 
          ? <div>
            <Row gutter={[16,16]}>
              {
                Array.from({length: 4}).map((value, index) => <Form.Item 
                  label={`Координаты ${index + 1} платы`}
                  validateDebounce={1000}
                  rules={[{required: true}]}>
                  <Col className='gutter-row' span={20}>
                    <Input
                      value={updatedCoordinates[index]}
                      onChange={value => handleCoordinateChange(index, value.target.value)}/>
                    <Button onClick={() => 
                      showMarker(index, updatedCoordinates[index])}>
                        Посмотреть
                    </Button>
                  </Col>
                </Form.Item>)
              }
            </Row>
            <Row gutter={[16,16]}>
              {
                Array.from({length: 4}).map((value, index) => <Form.Item 
                  label={`Координаты ${index + 5} платы`}
                  validateDebounce={1000}
                  rules={[{required: true}]}>
                  <Col className='gutter-row' span={20}>
                    <Input 
                      value={updatedCoordinates[index + 4]}
                      onChange={value => handleCoordinateChange(index + 4, value.target.value)}/>
                    <Button onClick={() => 
                      showMarker(index + 4, updatedCoordinates[index + 4])}>
                        Посмотреть
                    </Button>
                  </Col>
                </Form.Item>)
              }
            </Row>
          </div>
          : <></>
        }
      </Space.Compact>
      <Form.Item>
        <Button 
          onClick={handleFormSubmit}
          disabled={updateCoordinatesStatus === 'loading'}>
          {
            updateCoordinatesStatus === 'success' || updateCoordinatesStatus === 'idle'
              ? <>Сохранить</>
              : <Spin/>
          }
        </Button>
      </Form.Item>
    </Form>
    <div style={{padding: '10px'}}>  
      <MapperImage
        path={`${process.env.REACT_APP_API_BASE_URL}/get_last_image?sector_id=${sectorId}&side=${side}&specification_id=${specificationId}`} 
        initCoordinates={markerInitCoordinates}
        handleCoordinateChange={handleCoordinateChange}
        boardIndex={currentBoardIndex} />
    </div>  
  </div>)
}