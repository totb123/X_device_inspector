import { Button, Card, Col, Input, Row, Spin } from 'antd'
import React from 'react'
import useBoardsGet from '../features/inspectionsHistory/hooks/useBoardGet'

type DataMatrixProps = {
  multiboardId: number
  inner: boolean
  highlightedDatamatrix?: string[]
}

export const DataMatrix: React.FC<DataMatrixProps> = (
  {multiboardId, inner, highlightedDatamatrix}
) => {
  const {
    boards,
    boardsStatus
  } = useBoardsGet(multiboardId)
  if (boardsStatus !== 'success') return <Spin/>
  const datamatrixes = boards!.map(board => board.datamatrix)
  return(
    <>
      <Card 
        type={inner ? 'inner' : undefined}
        title='Datamatrix-коды плат'>
        Datamatrix
        <Row gutter={[8, 8]}>
          {
            datamatrixes.map((element, index) => 
              index < datamatrixes.length / 2
                ? <Col className='gutter-row' style={
                  highlightedDatamatrix?.filter(
                    val => val == element.toString()
                  ).length
                    ? {
                      color: 'red'
                    }
                    : {}
                }>{index + 1}. <Input defaultValue={element}></Input></Col>
                : <></>
            )
          }
        </Row>
        <Row gutter={[8,8]}>
          {
            datamatrixes.map((element, index) => 
              index >= datamatrixes.length / 2
                ? <Col className='gutter-row'style={
                  highlightedDatamatrix?.filter(
                    val => val == element.toString()
                  ).length
                    ? {
                      color: 'red'
                    }
                    : {}
                }>{index + 1}. <Input defaultValue={element}></Input></Col>
                : <></>
            )
          }
        </Row>
      </Card>
      {inner 
        ? <Button>Edit</Button>
        : <></>
      }
      
    </>
  )
}

