import { Input, Space } from 'antd'
import React, { useState } from 'react'


type CoordinateInputProps = {
  initialState: string
  onChange: (value: string) => void
}

export const SimpleCoordinateInput: React.FC<CoordinateInputProps> = ({
  initialState, 
  onChange
}) => {
  const [
    coordinateString, 
    setCoordinateString
  ] = useState<string>(initialState)

  const handleInputChange = (value: string) => {
    setCoordinateString(value)
    onChange(value)
  }

  
  
  return <Space>
    <Input 
      onChange={value =>handleInputChange(value.target.value)}
      value={
        coordinateString
      }/>
  </Space>
}