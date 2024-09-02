import React, {useState} from 'react'
import {Button, Form, Space} from 'antd'
import {useFilter, useFilterUpdate} from '../context/historyFilterContext'
import { useForm } from 'antd/es/form/Form'
// eslint-disable-next-line @stylistic/max-len
import { DatamatrixInputGroup } from '../../../components/datamatrixInputGroup'
import { SectorInput } from '../../../components/sectorInput'


type InspectionFilterProps = {
  onSubmit?: () => void
}

type TFilterForm = {
  sectorIds: number[]
}


export const HistoryInspectionFilter: React.FC<InspectionFilterProps> = ({
  onSubmit
}) => { 
  const filters = useFilter()
  const updateFilter = useFilterUpdate()

  const [form] = useForm<TFilterForm>()

  
  const [
    filterForm,
    setFilterForm
  ] = useState<TFilterForm>(filters)

  const handleFiltersChange = (filters: Partial<TFilterForm>) => {
    setFilterForm(state => ({ ...state, ...filters }))
  }
  
  const submitForm = () => {
    updateFilter(filterForm)
    if (onSubmit) onSubmit()
  }

  return (
    <Form
      labelCol={{span: 10}}
      wrapperCol={{span: 40}}
      layout={'vertical'}
      form={form}
      onFinish={submitForm}
    >
      <Space direction={'vertical'} size={'small'}
      >
        <Form.Item<TFilterForm>
          label={'Секторы'}
          name={'sectorIds'}

          colon={true}>
          <SectorInput onChange={values => {
            setFilterForm({
              ...filterForm,
              sectorIds: values as number[]
            })
          }}/>
        </Form.Item>
        <Form.Item>
          <Button
            type='primary'
            onClick={form.submit}
          >
          Подтвердить
          </Button>
        </Form.Item>
      </Space>
    </Form>
  )
}