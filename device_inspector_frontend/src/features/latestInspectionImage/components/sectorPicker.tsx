import { Button, Form, Select, Space, Spin } from 'antd'
import React, { useEffect } from 'react'

import { TSector } from '../../../types/sectorType'

import { 
  useImage, 
} from '../context/latestInspectionImageContext'
import { SectorInput } from '../../../components/sectorInput'

export const SectorPicker: React.FC = () => {
  
  const [pickedSector, setPickedSector] = React.useState<number>() 
  const image = useImage()
  const handleSubmit = (
  ) => {
    image.updateSector(pickedSector)
  }
  return <Form>
    <Space direction='vertical'>
      <Form.Item>
        <SectorInput
          isMultiple={false}
          allowClear={false}
          onChange={
            selectedSector => 
              setPickedSector(selectedSector)
          }
        />
      </Form.Item>
      <Form.Item>
        <Button
          disabled={pickedSector === undefined}
          onClick={handleSubmit}  
        >
          Подтвердить
        </Button>
      </Form.Item>
    </Space>
  </Form>
}