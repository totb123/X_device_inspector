import { Button, Space } from 'antd'
import Title from 'antd/es/typography/Title'
import React, { useEffect, useState } from 'react'
import ReactLassoSelect, { getCanvas } from 'react-lasso-select'
import { Point } from 'react-lasso-select/lib/helpers'

interface TProps {
  path: string
  initCoordinates: string | undefined
  handleCoordinateChange: (value: string, index: number) => void
  boardIndex: number | undefined
}

export const MapperImage: React.FC<TProps> = (props: TProps) => {

  const [points, setPoints] = useState<{ x: number; y: number }[]>([])
  const [clippedImg, setClippedImg] = useState('')
  const [
    coordinates, 
    setCoordinates
  ] = useState<string | undefined>(props.initCoordinates)
  
  const setInitialCoordinates = (coordinates: string) => {
    const formatCoordinates = coordinates.split(',')
    setPoints([
      {
        x: Number(formatCoordinates[2]),
        y: Number(formatCoordinates[0]),
      },
      {
        x: Number(formatCoordinates[2]),
        y: Number(formatCoordinates[1]),
      },
      {
        x: Number(formatCoordinates[3]),
        y: Number(formatCoordinates[1]),
      },
      {
        x: Number(formatCoordinates[3]),
        y: Number(formatCoordinates[0]),
      },
    ])
  }

  useEffect(() => {
    if (coordinates !== undefined)
      setInitialCoordinates(coordinates)
  }, [coordinates])

  const changeInputFormValues = (coordinatesPoints: Point[]) => {
    const minPoints = [...coordinatesPoints].reduce(
      (acc: Point, cur: Point) => {
        return {
          x: acc.x > cur.x ? cur.x : acc.x,
          y: acc.y > cur.y ? cur.y : acc.y,
        }
      })
    const maxPoints = [...coordinatesPoints].reduce(
      (acc: Point, cur: Point) => {
        return {
          x: acc.x < cur.x ? cur.x : acc.x,
          y: acc.y < cur.y ? cur.y : acc.y,
        }
      })
    const coordinates = '' + minPoints.y + ',' + maxPoints.y
      + ',' + minPoints.x + ',' + maxPoints.x
    setCoordinates(coordinates)
  }

  const handleFragmentApply = () => {
    props.handleCoordinateChange(coordinates ?? '', props.boardIndex!)
  }

  useEffect(() => {
    if (props.initCoordinates) 
      setInitialCoordinates(props.initCoordinates)
    
  }, [props.initCoordinates])

  return (
    <div>
      <Title level={3}>Изображение</Title>
      <div style={{
        display: 'flex', 
        flexDirection: 'row', 
      }}>
        <ReactLassoSelect
          value={points}
          src={props.path}
          imageStyle={{ width: '1000px', height: '500px'}}
          onChange={(path: Point[]) => {
            if (path.length == 4) 
              changeInputFormValues(path)
            
          }}
          onComplete={(path: Point[]) => {
            getCanvas(props.path, path, (err, canvas) => {
              if (!err) 
                setClippedImg(canvas.toDataURL())
              
            })
          }}
        />
        {clippedImg.length > 0 
          ? <Space direction={'vertical'} align='center' style={{
            marginLeft: '20px',
          }}>
            <Title level={4}>Фрагмент</Title>
            <img src={clippedImg} alt="clipped" 
              style={{ maxWidth: '250px', maxHeight: '100px'}}/>
            <Button onClick={
              () => handleFragmentApply()
            }>Зафиксировать</Button>
          </Space>
          : <></>
        }
      </div>
    </div>
  )
}