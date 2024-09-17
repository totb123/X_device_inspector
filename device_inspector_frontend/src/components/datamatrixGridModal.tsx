import { Button, Card, Col, Form, FormProps, Input, Row, Spin } from 'antd'
import React, { useEffect } from 'react'
// eslint-disable-next-line @stylistic/max-len
import useBoardsGet from '../features/inspectionsHistory/hooks/useBoardHandler'
import { TBoard } from '../types/boardType'

type DataMatrixProps = {
  multiboardId: number
  highlightedDatamatrix?: string[]
}

type TFormValues = {
  [key: string]: string
}

export const DataMatrixGridModal: React.FC<DataMatrixProps> = (
  {multiboardId, highlightedDatamatrix}
) => {
  const {
    boards,
    boardsStatus,
    boardsEditDMs,
  } = useBoardsGet(multiboardId)

  if (boardsStatus !== 'success') return <Spin/>
  const datamatrixes = boards!.map(board => board.datamatrix)
  const side = boards!.find(board => board.side)!.side

  const onFinish: FormProps['onFinish'] = (formValues: TFormValues) => {
    if (formValues && boards) {
      const boardIds = Object.keys(formValues)
        .filter((key: string) => formValues[key])
        .map((index: string) => Number(index))
      const dms = Object.values(formValues)
        .filter((value: string) => value)
      boardsEditDMs({
        board_ids: boardIds,
        dms: dms
      })
    }
  }

  const inputRender = (index: number, board: TBoard) => {
    return (
      <Form.Item
        label={index + 1}
        name={board.id}
      >
        <Input defaultValue={board.datamatrix}/>
      </Form.Item>)
  }


  return(
    <>
      <Form
        onFinish={onFinish}
        autoComplete="off"
      >
        <Card 
          type={'inner'}
          title='Datamatrix-коды плат'>
          Datamatrix
          <Row gutter={[8, 8]}>
            {
              boards!.map((board: TBoard, index: number) => 
                index < datamatrixes.length / 2
                  ? <Col className='gutter-row' style={
                    highlightedDatamatrix?.filter(
                      val => val == board.datamatrix.toString()
                    ).length
                      ? {
                        color: 'red'
                      }
                      : {}
                  }>
                    {inputRender(index, board)}
                  </Col>
                  : <></>
              )
            }
          </Row>
          <Row gutter={[8,8]}>
            {
              boards!.map((board: TBoard, index: number) =>
                index >= datamatrixes.length / 2
                  ? <Col className='gutter-row'style={
                    highlightedDatamatrix?.filter(
                      val => val == board.datamatrix.toString()
                    ).length
                      ? {
                        color: 'red'
                      }
                      : {}
                  }>
                    {inputRender(index, board)}
                  </Col>
                  : <></>
              )
            }
          </Row>
        </Card><Button type="primary" htmlType="submit">
              Изменить значения
        </Button>
      </Form>
    </>
  )
}

