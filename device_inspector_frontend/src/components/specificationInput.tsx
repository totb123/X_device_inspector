import { Select, Spin } from 'antd'
import React from 'react'
import { useSpecificationsGet } from '../hooks/useSpecificationGet'
import { TSpecification } from '../types/specificationType'
import mapSpecificationIds from '../utils/specificationMapper'

type SpecificationInputProps = {
  isMultiple?: boolean 
  allowClear?: boolean
  defaultValue?: {label: string, value: number}
  onChange: (values: any) => void
}

export const SpecificationInput: React.FC<SpecificationInputProps> = ({
  onChange, isMultiple = true, allowClear = true, defaultValue
}) => {
  const {specifications, specificationsStatus} = useSpecificationsGet()
  return <div style={{ width: '200px' }}>
    {specificationsStatus == 'success' ?
      <Select mode={isMultiple ? 'multiple' : undefined}
        allowClear={allowClear}
        defaultValue={defaultValue}
        disabled={specificationsStatus != 'success'}
        onChange={onChange}
        options={
          mapSpecificationIds(
            specifications as TSpecification[]
          )} />
      : <Spin />}
  </div>
}