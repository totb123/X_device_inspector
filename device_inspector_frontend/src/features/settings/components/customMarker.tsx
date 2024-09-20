import React, { useEffect, useState } from 'react'
import ReactLassoSelect, { getCanvas } from 'react-lasso-select'
import { Point } from 'react-lasso-select/lib/helpers'

interface TProps {
  path: string
  initCoordinates: string | undefined
  handleCoordinateChange: Function
  boardIndex: number | undefined
}

export const MapperImage: React.FC<TProps> = (props: TProps) => {

  const [points, setPoints] = useState<{ x: number; y: number }[]>([])
  const [clippedImg, setClippedImg] = useState('')

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
    props.handleCoordinateChange(props.boardIndex, coordinates)
  }

  useEffect(() => {
    if (props.initCoordinates) 
      setInitialCoordinates(props.initCoordinates)
    
  }, [props.initCoordinates])

  return (
    <div>
      <h3>Изображение</h3>
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
              setClippedImg(canvas.toDataURL());
            
          })
        }}
      />
      {clippedImg.length > 0 
        ? <>
          <h3>Фрагмент</h3>
          <img src={clippedImg} alt="clipped" 
            style={{ width: '200px', height: '100px'}}/>
        </>
        : <></>
      }
      
    </div>
  )
}