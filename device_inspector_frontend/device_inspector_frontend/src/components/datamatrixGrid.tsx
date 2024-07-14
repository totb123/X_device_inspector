import { Button, Card, Col, Form, FormProps, Input, Row, Spin } from 'antd'
import React from 'react'
// eslint-disable-next-line @stylistic/max-len
import useBoardsGet from '../features/inspectionsHistory/hooks/useBoardHandler'

type DataMatrixProps = {
  multiboardId: number
  inner: boolean
  highlightedDatamatrix?: string[]
}

type TFormValues = {
  [key: string]: string
}

export const DataMatrix: React.FC<DataMatrixProps> = (
  {multiboardId, inner, highlightedDatamatrix}
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
      const indices = Object.keys(formValues)
        .filter((key: string) => formValues[key])
        .map((index: string) => Number(index))
      const values = Object.values(formValues)
        .filter((value: string) => value)
      boardsEditDMs({
        multiboard_id: multiboardId,
        side: side,
        indices: indices,
        dms: values
      })
    }
  }


  return(
    <>
      <Form
        onFinish={onFinish}
        autoComplete="off"
      >
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
                  }>
                    {inner 
                      ? <Form.Item
                        label={index + 1}
                        name={index}
                      >
                        <Input defaultValue={element}/>
                      </Form.Item>
                      : <>{index + 1}.{element}</>
                    }
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
                  }>
                    {inner 
                      ? <Form.Item
                        label={index + 1}
                        name={index}
                      >
                        <Input defaultValue={element}/>
                      </Form.Item>
                      : <>{index + 1}.{element}</>
                    }
                  </Col>
                  : <></>
              )
            }
          </Row>
        </Card>
        {inner 
          ? <Button type="primary" htmlType="submit">
              Submit
          </Button>
          : <></>
        }
      </Form>
    </>
  )
}

