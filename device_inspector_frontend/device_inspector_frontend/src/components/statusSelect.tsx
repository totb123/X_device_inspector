import { Select, Spin } from 'antd'
import React from 'react'
import { useStatusGet } from '../hooks/useInspectionStatusGet'

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
          label: status,
        }))}
      />
      : <Spin />
    
  }</div>)
}
