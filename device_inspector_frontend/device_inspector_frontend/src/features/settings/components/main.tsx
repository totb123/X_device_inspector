/* eslint-disable @stylistic/max-len */
/* eslint-disable react/jsx-key */

import {Button, Col, Form, Input, Row, Space, Spin } from 'antd'
import Title from 'antd/es/typography/Title'
import React, { useEffect, useState } from 'react'
import {TSettings} from '../types/settingsType'
import { SectorInput } from '../../../components/sectorInput'
import { SidePicker } from './sidePicker'
import { useSettingsHandler } from '../hooks/useSettingsHandler'


export const MainPage: React.FC = () => {
  const [form] = Form.useForm<TSettings>()
  const [side, setSide] = useState<'Top' | 'Bot'>('Top') 
  const [sector, setSector] = useState(1)
  const {
    settings,
    settingsStatus, 
    settingsRefetch,
    updateCoordinates,
    updateCoordinatesStatus
  } = useSettingsHandler(sector,side)

  const [
    updatedCoordinates, 
    setUpdatedCoordinates
  ] = useState<string[]>(undefined!)

  const handleSector = (sectorsPicked: number) => {
    console.log(sectorsPicked)
    setSector(sectorsPicked)
  }

  const handleSide = (sidePicked: string) => {
    setSide(sidePicked === 'Top' ? 'Top' : 'Bot')
  }

  const handleCoordinateChange = (index: number, value: string) => {
    const updatedCoordinatesWithNewValue = [...updatedCoordinates]
    updatedCoordinatesWithNewValue[index] = value
    setUpdatedCoordinates(updatedCoordinatesWithNewValue)
  }

  const handleFormSubmit = () => {
    updateCoordinates(updatedCoordinates)
  }

  useEffect(() => {
    settingsRefetch().then(val => setUpdatedCoordinates(val.data?.coordinates || []))
    return () => {}
  }, [settings, sector, side, settingsRefetch, updateCoordinates])

  return (<div>
    <Title level={1}>Настройки</Title>
    <Form 
      form={form}
      layout='vertical'
      style={{padding: '16px'}}
    >
      <Form.Item label="Сектор">
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
      <Form.Item>
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
  </div>)
}