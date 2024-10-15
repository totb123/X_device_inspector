/* eslint-disable @stylistic/max-len */
/* eslint-disable react/jsx-key */

import {Alert, Button, Collapse, CollapseProps } from 'antd'
import Title from 'antd/es/typography/Title'
import React, { useEffect, useState } from 'react'


import { CoordinatesSearchForm } from './coordinatesSearchForm'
import { useCoordinatesGet } from '../hooks/useCoordinatesGet'
import { TCoordinatesSearchFormInput } from '../types/coordinatesSearchFormInput'
import { CoordinatesUpdateForm } from './coordinateUpdateForm'
import { useCoordinatesUpdate } from '../hooks/useCoordinatesUpdate'



export const MainPage: React.FC = () => {

  const {
    setSettings,
    updateStatus
  } = useCoordinatesUpdate()
  
  const {
    getCoordinates,
    getStatus,
    searchValues,
    fetchStatusCode,
    updateFormValues,
    getRefetch
  } = useCoordinatesGet()
  const handleSearchFormSubmit = (formInput: TCoordinatesSearchFormInput) => {
    updateFormValues(formInput)
    setSettings({
      sectorId: formInput.sectorId,
      side: formInput.side,
      specificationId: formInput.specificationId
    })
  }

  const handleUpdateFormSubmit = (coordinates: string[]) => {
    setSettings({
      coordinates: coordinates
    })
  }

  useEffect(() => {
    if (updateStatus === 'success') 
      getRefetch()
    
  }, [updateStatus])


  const items: CollapseProps['items'] = [
    {
      key: '1',
      label: 'Поиск координат',
      children: <CoordinatesSearchForm
        fetchStatus={getStatus}
        onSubmit={handleSearchFormSubmit}
      />
    }
  ]
  return (<>
    <Title level={1}>Настройки</Title>
    <Collapse 
      items={items} 
      style={{minWidth: '266px'}} 
      activeKey={getCoordinates === undefined ? ['1'] : undefined}
    />    
    <div style={{margin: '10px 0'}}>
      {
        getCoordinates && fetchStatusCode === 200 &&
          <CoordinatesUpdateForm 
            searchFormFields={searchValues as TCoordinatesSearchFormInput}
            onSubmit={handleUpdateFormSubmit}
            initialCoordinates={getCoordinates.coordinates}
          />
      }
      { fetchStatusCode === 404 && <Alert type='warning' message={
        <>
          Отсутствуют координаты по предоставленным данным
          <Button>Добавить</Button>
        </>
      }/>
      }
      
    </div>
  </>)
}