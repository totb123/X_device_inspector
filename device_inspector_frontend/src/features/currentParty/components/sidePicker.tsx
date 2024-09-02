import { Select } from 'antd'
import React from 'react'

type SidePickerProps = {
  onChange: (value: string) => void
  defaultValue: string
}

export const SidePicker: React.FC<SidePickerProps> = ({
  onChange,
  defaultValue
}) => {
  const options = [{
    label: 'top',
    value: 'top',
  }, {
    label: 'bot',
    value: 'bot',
  }]
  return <Select 
    defaultValue={defaultValue}
    options={options} 
    allowClear={false}
    onChange={onChange}
  />
}