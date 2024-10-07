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
    console.log(initialState, coordinateString)
    setCoordinateString(value)
    onChange(value)
  }

  const handleInputReset = () => {
    setCoordinateString(initialState)
    onChange(initialState)
  }
  
  
  return <Space direction='vertical'>
    <Input 
      onChange={value =>handleInputChange(value.target.value)}
      value={
        coordinateString
      }/>
    {initialState !== coordinateString && 
      <span style={{color: 'gray', fontSize: '0.8rem'}}>
        (ранее: <a onClick={handleInputReset}>
          {initialState}
        </a>)
      </span>
    }
  </Space>
}