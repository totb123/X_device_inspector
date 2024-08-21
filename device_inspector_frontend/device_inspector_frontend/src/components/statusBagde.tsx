import {
  Card,
  Select,
  Spin
} from 'antd'
import React, { useEffect } from 'react'
import { InspectionStatus } from '../types/inspectionType'
import useStatusUpdate from '../hooks/useStatusUpdate'

type StatusProps = {
  inspectionId: number
  inner: boolean
  changeStatus: Function 
}

export const StatusBagde: React.FC<StatusProps> = (
  {inspectionId, inner, changeStatus}
) => {

  const {
    status,
    statusLoading, 
    statusUpdate, 
    statusGet
  } = useStatusUpdate(inspectionId)

  const handleChange = (value: string) => {
    switch (value) {
      case 'NORMAL':
        statusUpdate(InspectionStatus.NORMAL)
        changeStatus(true)
        break
      case 'UNCHECKED':
        statusUpdate(InspectionStatus.UNCHECKED)
        changeStatus(true)
        break
      case 'DEFECTIVE':
        statusUpdate(InspectionStatus.DEFECTIVE)
        changeStatus(true)
        break
      case 'REQUIRE_VERIFICATION':
        statusUpdate(InspectionStatus.REQUIRE_VERIFICATION)
        changeStatus(true)
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
      },
      {
        label: 'Требуется проверка',
        value: 'REQUIRE_VERIFICATION'
      }
      ]}/>
  </Card>
}
