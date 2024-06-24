import {
  Card,
  Select,
  Spin
} from 'antd'
import React, { useEffect } from 'react'
import { BoardStatus } from '../types/boardType'
import useStatusUpdate from '../hooks/useStatusUpdate'

type StatusProps = {
  datamatrix: number
  inner: boolean
}

export const StatusBagde: React.FC<StatusProps> = (
  {datamatrix, inner}
) => {

  const {
    status,
    statusLoading, 
    statusUpdate, 
    statusGet
  } = useStatusUpdate(datamatrix)

  const handleChange = (value: string) => {
    switch (value) {
      case 'NORMAL':
        statusUpdate(BoardStatus.NORMAL)
        break
      case 'UNCHECKED':
        statusUpdate(BoardStatus.UNCHECKED)
        break
      case 'DEFECTIVE':
        statusUpdate(BoardStatus.DEFECTIVE)
        break
      default:
        break
    }
  }

  useEffect(() => {
    statusGet()
    return () => {}
  }, [status])

  if (statusLoading || status == undefined) return <Spin/>
  return <Card 
    type={inner ? 'inner' : undefined}  
    style={{ margin: '16px' }} 
    size='small' 
    title='Статус'>
    <Select 
      style={{width: 140}}
      defaultValue={status}
      onChange={handleChange}
      options={[{
        label:'Не проверено',
        value: 'UNCHECKED'
      }, 
      {
        label:'Проверено',
        value: 'NORMAL'
      },
      {
        label: 'Брак',
        value: 'DEFECTIVE'
      }
      ]}/>
  </Card>
}
