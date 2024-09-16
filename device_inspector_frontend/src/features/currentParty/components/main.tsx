import React, { useEffect, useState } from 'react'
import { useSpecificationsGet } from '../../../hooks/useSpecificationGet'
import { useCurrentPartyGet } from '../../../hooks/useCurrentPartyGet'
import { SpecificationInput } from '../../../components/specificationInput'
import { TCurrentParty } from '../../../types/currentPartyType'
import { TSpecification } from '../../../types/specificationType'
import { SidePicker } from './sidePicker'
import {Button, Col, Form, Input, Row, Space, Spin } from 'antd'
import Title from 'antd/es/typography/Title'
import updateCurrentPartyHandler from '../hooks/useCurrentPartyHandler'

export function MainPage() {
  const [specifications, specificationStatus] = useSpecificationsGet()
  const [currentParty, currentPartyStatus] = useCurrentPartyGet()
  const [specificationId, setSpecificationId] = useState<number>(0)
  const [
    currentSpecificationName, 
    setCurrentSpecificationName
  ] = useState<string|null>(null)
  const [side, setSide] = useState<string>('top') 

  const {
    update,
    updateStatus
  } = updateCurrentPartyHandler(specificationId)

  const handleSpecification = (specificationPicked: number) => {
    setSpecificationId(specificationPicked)
  }

  const handleSide = (sidePicked: string) => {
    setSide(sidePicked === 'top' ? 'top' : 'bot')
  }

  const handleFormSubmit = () => {
    if (specificationId) {
      update(side)
    }
  }

  useEffect(() => {
    if (currentPartyStatus == 'success' 
    && 
    specificationStatus == 'success' 
    ) {
      setSpecificationId((currentParty as TCurrentParty).specification_id)
      setSide((currentParty as TCurrentParty).side)
      const specName = (specifications as TSpecification[])
        .find(
          (specification: TSpecification) => 
            specification.id == (currentParty as TCurrentParty)
              .specification_id)
        ?.name
      if (specName)
        setCurrentSpecificationName(specName)
    }
  }, [currentParty, specifications])

  return (<div>
    <Title level={1}>Текущая партия</Title>
    <Form 
      layout='vertical'
      style={{padding: '16px'}}
    >
      {currentSpecificationName
        ?
        <>
          <Form.Item label="Спецификация" style={{width: '120px'}}>
            <SpecificationInput 
              defaultValue={{
                label: currentSpecificationName 
                  ? currentSpecificationName : '',
                value: specificationId
              }}
              isMultiple={false}
              allowClear ={false}
              onChange={handleSpecification} 
            />
          </Form.Item>
          <Form.Item label="Сторона" style={{width: '120px'}}>
            <SidePicker 
              onChange={handleSide}
              defaultValue={side}
            />
          </Form.Item>
          <Form.Item>
            <Button 
              onClick={handleFormSubmit}>
                Сохранить
            </Button>
          </Form.Item>
        </>
        : <Spin/>
      }
    </Form>
  </div>
  )
}

