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
  
  const handlePointsChange = (coordinates: string) => 
    setPoints(convertCoordinatesToPoints(coordinates))

  const convertCoordinatesToPoints = (coordinates: string) => {
    const formatCoordinates = coordinates.split(',')
    return [
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
    ]
  }

  const changeInputFormValues = (coordinatesPoints: Point[]) => {
    coordinatesPoints
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

  const transformPoints = (updatedPoints: Point[]) => {
    //todo: не было выбора
    var newPoints = [...updatedPoints]
    
    const changedPoint = updatedPoints.filter(updatedPoint => {
      return points.findIndex(point => point.x === updatedPoint.x && 
        point.y === updatedPoint.y) < 0
    })
    if (changedPoint.length > 1) return newPoints
    const pointIndex = updatedPoints.indexOf(changedPoint[0])
    switch (pointIndex) {
      case 0:
        newPoints[3] = {x: newPoints[3].x, y: changedPoint[0].y}
        newPoints[1] = {x: changedPoint[0].x, y: newPoints[1].y}
        break
      case 1: 
        newPoints[2] = {x: newPoints[2].x, y: changedPoint[0].y}
        newPoints[0] = {x: changedPoint[0].x, y: newPoints[0].y}
        break
      case 2: 
        newPoints[1] = {x: newPoints[1].x, y: changedPoint[0].y}
        newPoints[3] = {x: changedPoint[0].x, y: newPoints[3].y}
        break
      case 3: 
        newPoints[0] = {x: newPoints[0].x, y :changedPoint[0].y}
        newPoints[2] = {x: changedPoint[0].x, y: newPoints[2].y}
        break
      default:
        break
    }
    return newPoints
  }

  const handleFragmentApply = () => {
    props.handleCoordinateChange(coordinates ?? '', props.boardIndex!)
  }

  useEffect(() => {
    if (props.initCoordinates) 
      handlePointsChange(props.initCoordinates)
  }, [props.initCoordinates])
  
  useEffect(() => {
    if (coordinates !== undefined)
      handlePointsChange(coordinates)
  }, [coordinates])

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
            if (path.length == 4) {
              const transformedPoints = transformPoints(path) 
              changeInputFormValues(transformedPoints)
            }
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