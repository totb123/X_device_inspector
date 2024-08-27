import { Select, Spin } from 'antd'
import React from 'react'
import { useStatusGet } from '../hooks/useInspectionStatusGet'
import { InspectionStatus } from '../types/inspectionType'

type StatusSelectProps = {
  isMultiple?: boolean
  allowClear?: boolean
  defaultValue?: string[]
  onChange: (values: any) => void
}

export const StatusSelect: React.FC<StatusSelectProps> = ({
  onChange,
  isMultiple,
  allowClear,
  defaultValue,
}) => {
  const [statuses, isLoading] = useStatusGet()
  const changeLabelByValue = (value: String) => {
    switch (value) {
      case InspectionStatus.NORMAL:
        return 'Проверено'
      case InspectionStatus.UNCHECKED:
        return 'Не проверено'
      case InspectionStatus.DEFECTIVE:
        return 'Брак'
      case InspectionStatus.REQUIRE_VERIFICATION:
        return 'Требуется проверка'
      default:
        return value
    }
  }
  return  (<div style={{width: '200px'}}> {
    isLoading === 'success' 
      ? <Select
        onChange={onChange}
        allowClear={allowClear}
        mode={isMultiple ? 'multiple' : undefined}
        defaultValue={defaultValue}
        disabled={isLoading !== 'success'}
        options={(statuses as String[]).map(status => ({
          value: status,
          label: changeLabelByValue(status),
        }))}
      />
      : <Spin />
    
  }</div>)
}
