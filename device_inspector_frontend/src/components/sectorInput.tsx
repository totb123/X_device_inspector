import { Select, Spin } from 'antd'
import { useSectorGet } from '../hooks/useSectorGet'
import React from 'react'
import mapSectorIds from '../utils/sectorMapper'
import { TSector } from '../types/sectorType'

type SectorInputProps = {
  isMultiple?: boolean 
  allowClear?: boolean
  defaultValue?: {label: string, value: number}
  onChange: (values: any) => void
}

export const SectorInput: React.FC<SectorInputProps> = ({
  onChange, isMultiple = true, allowClear = true, defaultValue
}) => {
  const {sectors, sectorsStatus} = useSectorGet()
  return <div style={{ width: '200px' }}>
    {sectorsStatus == 'success' ?
      <Select mode={isMultiple ? 'multiple' : undefined}
        allowClear={allowClear}
        defaultValue={defaultValue}
        disabled={sectorsStatus != 'success'}
        onChange={onChange}
        options={mapSectorIds(sectors as TSector[])} />
      : <Spin />}
  </div>
}