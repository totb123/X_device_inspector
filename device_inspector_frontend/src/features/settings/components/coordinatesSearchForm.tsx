import { Button,  Form } from 'antd'
import React, { useState } from 'react'
import { SpecificationInput } from '../../../components/specificationInput'
import { TSettings } from '../types/settingsType'
import { SectorInput } from '../../../components/sectorInput'
import { SidePicker } from './sidePicker'
import { 
  TCoordinatesSearchFormInput
} from '../types/coordinatesSearchFormInput'

type CoordinatesSearchFormProps = {
  fetchStatus: 'idle' | 'loading' | 'error' | 'success'
  onSubmit: (formInput: TCoordinatesSearchFormInput) => void
}


export const CoordinatesSearchForm: React.FC<
CoordinatesSearchFormProps> = ({
  onSubmit,
  fetchStatus
}) => {
  const [form] = Form.useForm<
  TCoordinatesSearchFormInput
  >()

  const [side, setSide] = useState<'Top' | 'Bot'>('Top') 
  const [sectorId, setSectorId] = useState(1)
  const [specificationId, setSpecificationId] = useState(1)
  
  const areFieldsEmpty = () => {
    return sectorId !== undefined && specificationId !== undefined
      ? true
      : false
  }

  const handleSpecificationChange = (specificationPicked: number) => {
    setSpecificationId(specificationPicked)
  }

  const handleSectorChange = (sectorsPicked: number) => {
    setSectorId(sectorsPicked)
  }

  const handleSideChange = (sidePicked: string) => {
    setSide(sidePicked === 'Top' ? 'Top' : 'Bot')
  }

  const handleFormSubmit = () => {
    onSubmit({
      sectorId,
      side,
      specificationId
    })
  }

  return (
    <Form form={form} layout="vertical" style={{ padding: '16px' }}>
      <Form.Item label="Спецификация" style={{ width: '120px' }}>
        <SpecificationInput
          isMultiple={false}
          allowClear={false}
          onChange={handleSpecificationChange}
        />
      </Form.Item>
      <Form.Item label="Сектор" style={{ width: '120px' }}>
        <SectorInput
          defaultValue={{
            label: 'Гравер',
            value: 1,
          }}
          isMultiple={false}
          allowClear={false}
          onChange={handleSectorChange}
        />
      </Form.Item>
      <Form.Item label={'Сторона'} style={{ width: '120px' }}>
        <SidePicker onChange={handleSideChange} />
      </Form.Item>
      <Form.Item>
        <Button
          onClick={fetchStatus !== 'loading' 
            ? handleFormSubmit 
            : undefined}
          loading={fetchStatus === 'loading'}
          disabled={fetchStatus === 'loading' || !areFieldsEmpty()}
        >
         Сохранить
        </Button>
      </Form.Item>
    </Form>
  )
}
