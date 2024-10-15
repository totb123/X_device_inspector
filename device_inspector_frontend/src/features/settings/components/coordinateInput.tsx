import { Input, Space } from 'antd'
import React, { useState } from 'react'
import { useDebounce } from '../../../hooks/useDebounce'


type CoordinateInputProps = {
  initialState: string
  currentValue: string | undefined
  onChange: (value: string) => void
  setValidationResult: (value: boolean) => void
}

export const SimpleCoordinateInput: React.FC<CoordinateInputProps> = ({
  initialState, 
  onChange,
  currentValue,
  setValidationResult
}) => {

  const debounce = useDebounce()
  const [isError, setIsError] = useState<boolean | string>(false)
  const [
    errorMessage, 
    setErrorMessage
  ] = useState<string | undefined>(undefined)

  const handleInputChange = (value: string) => { 
    onChange(value)
    debounce(() => {
      setValidationResult(validateInput(value))
    }, 500)
  }

  const handleInputReset = () => {
    onChange(initialState)
    debounce(() => {
      setValidationResult(validateInput(initialState))
    }, 500)
  }
  
  const validateInput = (value: string):boolean => {
    if (value === '') {
      setIsError(true)
      setErrorMessage('Поле не может быть пустым')
      return false
    }
    if (value === undefined) return true
    try {
      const parsedNumbers = value
        .split(',')
        .map(element => parseInt(element))
      if (parsedNumbers[0] > parsedNumbers[1]) 
      {
        setIsError(true)
        // eslint-disable-next-line @stylistic/max-len
        setErrorMessage('второе число должно быть больше первого')
        return false
      }
      if (parsedNumbers[2] > parsedNumbers[3]){
        setIsError(true)
        // eslint-disable-next-line @stylistic/max-len
        setErrorMessage('четвертое число должно быть больше третьего')
        return false
      }
    } catch (error) {
      setIsError(true)
      setErrorMessage('Некорректное значение')
      return false
    }
    setIsError(false)
    setErrorMessage(undefined)
    return true
  }

  
  return <Space direction='vertical'>
    {
      errorMessage !== undefined && 
      <span style={{color: 'red', fontSize: '0.8rem'}}>
        {errorMessage}
      </span>
    }
    <Input 
      status={isError ? 'error' : undefined}
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