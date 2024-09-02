import { Select } from 'antd'
import React from 'react'

type SidePickerProps = {
  onChange: (value: string) => void
}

export const SidePicker: React.FC<SidePickerProps> = ({
  onChange,
}) => {
  const options = [{
    label: 'Top',
    value: 'Top',
  }, {
    label: 'Bottom',
    value: 'Bottom',
  }]
  return <Select 
    options={options} 
    allowClear={false}
    defaultValue={'Top'}
    onChange={onChange}
  />
}