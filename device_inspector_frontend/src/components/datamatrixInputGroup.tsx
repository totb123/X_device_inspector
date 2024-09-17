import React, { useEffect, useState } from 'react'
import {Button, Form, Input, Space} from 'antd'
import {DeleteOutlined, PlusCircleOutlined} from '@ant-design/icons'

type DatamatrixInputGroupProps = {
  onChange?: (data: Array<string>) => void
}

export const DatamatrixInputGroup:
React.FC<DatamatrixInputGroupProps> = ({ onChange }) => {

  const [
    datamatrices, setDatamatrises
  ] = useState<Record<number, string>>({})

  const handleInput = (idx: number, e: any) => {
    if (e.target.value) {
      setDatamatrises(state => ({
        ...state,
        [idx]: e.target.value
      }))
    }
  }

  const handleDelete = (idx: number) => {
    setDatamatrises(state => {
      const { [idx]: deleted, ...rest } = state
      return rest
    })
  }

  useEffect(() => {
    if (onChange) onChange(Object.values(datamatrices))
  }, [datamatrices])

  return (<div>
      Датаматрикс-коды
    <Form.List name='datamatrices'>
      {
        (fields, {add, remove}, {errors}) => (
          <>
            {fields.map((field, index) => (
              <Form.Item {...field} key={index} >
                <Space direction={'horizontal'}>
                  <Input onChange={e => handleInput(index, e)}/>
                  <Button onClick={() => {
                    remove(field.name)
                    handleDelete(index)
                  }
                  }>
                    <DeleteOutlined/>
                  </Button>
                </Space>
              </Form.Item>
            ))}
            <Form.Item>
              <Button
                onClick={() => add()}>
                <PlusCircleOutlined/>
                  Добавить
              </Button>
            </Form.Item>
          </>
        )
      }
    </Form.List>
  </div>
  )
}