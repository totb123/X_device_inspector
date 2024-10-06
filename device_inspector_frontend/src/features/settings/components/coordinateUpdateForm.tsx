import React, { useState } from 'react'
import { SimpleCoordinateInput } from './coordinateInput'
import { Alert, Button, Col, Form, Row, Space } from 'antd'
import { MapperImage } from './customMarker'
import { 
  TCoordinatesSearchFormInput 
} from '../types/coordinatesSearchFormInput'
import { useImageGet } from '../hooks/useImageGet'
import { generateImagePath } from '../utils/generateImagePath'


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
  } 

  const showMarker = (index: number, value: string) => {
    setCurrentBoardIndex(index)
    setMarkerInitCoordinates(value)
  }

 
  return (
    <>
      <Form>
        <Space direction='vertical'>
          <Row gutter={[16, 16]}>
            { coordinates
              .slice(0, coordinates.length / 2)
              .map((coordinate, index) => 
                <Col key={`coordinate_${index}`}>
                  <SimpleCoordinateInput 
                    initialState={coordinate} 
                    onChange={value => 
                      handleCoordinateChange(value, index)}
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
              .slice(coordinates.length / 2)
              .map((coordinate, index) => 
                <Col key={`coordinate_${index}`}>
                  <SimpleCoordinateInput 
                    initialState={coordinate} 
                    onChange={value => 
                      handleCoordinateChange(value, index)}
                  />
                  <Button onClick={() => showMarker(index, coordinate)}>
                    Показать
                  </Button>
                </Col>
              )
            }
          </Row>
        </Space>
        <Button onClick={() => onSubmit(coordinates)}>Сохранить</Button>
      </Form>
      {isImageAvailable === true
        ?
        <MapperImage
          path={generateImagePath(searchFormFields)} 
          initCoordinates={coordinates.join(',')}
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


