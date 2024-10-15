/* eslint-disable @stylistic/max-len */
import React, { useState } from 'react'
import { SimpleCoordinateInput } from './coordinateInput'
import { Alert, Button, Col, Form, Row, Space } from 'antd'
import { MapperImage } from './customMarker'
import { 
  TCoordinatesSearchFormInput 
} from '../types/coordinatesSearchFormInput'
import { useImageGet } from '../hooks/useImageGet'
import { generateImagePath } from '../utils/generateImagePath'
import Title from 'antd/es/typography/Title'


type CoordinateUpdateFormProps = {
  initialCoordinates: string[]
  searchFormFields: TCoordinatesSearchFormInput
  onSubmit: (coordinates: string[]) => void
}

export const CoordinatesUpdateForm: React.FC<CoordinateUpdateFormProps> = (
  {
    initialCoordinates,
    onSubmit,
    searchFormFields,
  }
) => {  

  const [
    coordinates, 
    setCoordinates
  ] = useState<string[]>(initialCoordinates)

  const [
    markerInitCoordinates, 
    setMarkerInitCoordinates
  ] = useState<string | undefined>(undefined)
 
  const [
    validationResult, 
    setValidationResult
  ] = useState<boolean>(true)


  const {isImageAvailable} = useImageGet(
    generateImagePath(searchFormFields)
  )

  const [
    currentBoardIndex, 
    setCurrentBoardIndex
  ] = useState<number | undefined>(undefined)

  const handleCoordinateChange = (value: string, index: number) => {
    setCoordinates(() => {
      const updatedCoordinatesWithNewValue = [...coordinates]
      updatedCoordinatesWithNewValue[index] = value
      return updatedCoordinatesWithNewValue
    })
    showMarker(index, value)
  } 

  const showMarker = (index: number, value: string) => {
    setCurrentBoardIndex(index)
    setMarkerInitCoordinates(value)
  }

  
  return (
    <>
      <Form>
        <Title level={3}>Координаты</Title>
        <Space direction='vertical'>
          <Space direction='vertical'>
            <Row gutter={[16, 16]}>
              { coordinates
                .slice(0, coordinates.length / 2)
                .map((coordinate, index) => 
                  <Col key={`coordinate_${index}`}>
                    <SimpleCoordinateInput 
                      initialState={initialCoordinates[index]} 
                      currentValue={coordinate}
                      onChange={value => 
                        handleCoordinateChange(value, index)}
                      setValidationResult={setValidationResult}
                    />
                    <Button onClick={() => showMarker(index, coordinate)}>
                      Показать
                    </Button>
                  </Col>
                )
              }
            </Row>
            <Row gutter={[16, 16]}>
              { coordinates
                .slice(coordinates.length / 2, coordinates.length)
                .map((coordinate, index) => 
                  <Col key={`coordinate_${index}`}>
                    <SimpleCoordinateInput 
                      currentValue={
                        coordinate
                      }
                      initialState={
                        //todo: почистить это добро, потому что ну насрано
                        initialCoordinates[index + initialCoordinates.length / 2]
                      } 
                      onChange={value => 
                        handleCoordinateChange(
                          value, 
                          index + coordinates.length / 2
                        )
                      }
                      setValidationResult={setValidationResult}
                    />
                    <Button onClick={() => showMarker(
                      index + coordinates.length / 2, 
                      coordinate)}>
                      Показать
                    </Button>
                  </Col>
                )
              }
            </Row>
          </Space>
          <Button 
            disabled={validationResult === false}
            onClick={() => onSubmit(coordinates)}
          >Сохранить</Button>
        </Space>
      </Form>
      {isImageAvailable === true
        ?
        <MapperImage
          path={generateImagePath(searchFormFields)} 
          initCoordinates={markerInitCoordinates}
          handleCoordinateChange={handleCoordinateChange}
          boardIndex={currentBoardIndex} />
        :
        <Alert 
          // eslint-disable-next-line @stylistic/max-len
          message={`Произошла ошибка. Нет данных о координатах датаматрикс кодов по предоставленным данным`}
          type="error" 
        />
      }
    </>
  ) 
}


