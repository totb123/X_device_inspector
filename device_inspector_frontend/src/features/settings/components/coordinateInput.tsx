import { Input, Space } from 'antd'
import React, { useState } from 'react'


type CoordinateInputProps = {
  initialState: string
  currentValue: string | undefined
  onChange: (value: string) => void
}

export const SimpleCoordinateInput: React.FC<CoordinateInputProps> = ({
  initialState, 
  onChange,
  currentValue
}) => {

  const handleInputChange = (value: string) => {
    
    onChange(value)
  }

  const handleInputReset = () => {
    onChange(initialState)
  }
  
  
  return <Space direction='vertical'>
    <Input 
      onChange={value => handleInputChange(value.target.value)}
      value={
        currentValue !== undefined ? currentValue : initialState
      }/>
    {initialState !== currentValue && 
      <span style={{color: 'gray', fontSize: '0.8rem'}}>
        (ранее: <a onClick={handleInputReset}>
          {initialState}
        </a>)
      </span>
    }
  </Space>
}