import { Card, Col, Form, FormProps, Row, Spin } from 'antd'
import React from 'react'
// eslint-disable-next-line @stylistic/max-len
import useBoardsGet from '../features/inspectionsHistory/hooks/useBoardHandler'

type DataMatrixProps = {
  multiboardId: number
  highlightedDatamatrix?: string[]
}

type TFormValues = {
  [key: string]: string
}

export const DataMatrixGridCard: React.FC<DataMatrixProps> = (
  {multiboardId, highlightedDatamatrix}
) => {
  const {
    boards,
    boardsStatus,
    boardsEditDMs,
  } = useBoardsGet(multiboardId)

  if (boardsStatus !== 'success') return <Spin/>
  const datamatrixes = boards!.map(board => board.datamatrix)


  return(
    <>
      <Card 
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
                }><>{index + 1}.{element}</>
                </Col>
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
                }><>{index + 1}.{element}</>
                </Col>
                : <></>
            )
          }
        </Row>
      </Card>
    </>
  )
}

