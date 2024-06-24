import React from 'react'
import {DatePicker} from 'antd'


type FilterDatePickerProps = {
  onChange: (startDate: Date, endDate: Date) => void
}

const {RangePicker} = DatePicker


export const FilterDatePicker: React.FC<FilterDatePickerProps> = ({ 
  onChange 
}) => {
  
  const handleDateChange = (dateString: string[]) => {
    if (onChange) {
      onChange(
        new Date(Date.parse(dateString[0])),
        new Date(Date.parse(dateString[1]))
      )
    }
  }

  return (<div>
    <RangePicker
      onChange={(_, dateString) => handleDateChange(dateString)}
      showTime
    />
  </div>)

}