import React, {useState} from 'react'
import {Button, Form, Select, Space} from 'antd'
import {MultiboardInputGroup} from './multiboardInputGroup'
import { useForm } from 'antd/es/form/Form'
// eslint-disable-next-line @stylistic/max-len
import { DatamatrixInputGroup } from '../../../components/datamatrixInputGroup'
import { PartyInputGroup } from '../../../components/partyInputGroup'
import { FilterDatePicker } from './filterDatePicker'
import { SectorInput } from '../../../components/sectorInput'
import { useFilter, useFilterUpdate } from '../context/searchFilterContext'
import { StatusSelect } from '../../../components/statusSelect'



type InspectionFilterProps = {
  onSubmit?: () => void
}

export type TFilterForm = {
  sectorIds: number[]
  statuses?: string[]
  datamatrices: string[]
  multiboardIds: string[]
  parties: string[]
  startDate?: Date
  endDate?: Date
}


export const SearchInspectionFilter: React.FC<InspectionFilterProps> = ({
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
        <Form.Item
          label={'Статус'}
          name={'status'}
          colon={true}
        >
          <StatusSelect
            allowClear
            isMultiple
            onChange={statuses => {
              setFilterForm({
                ...filterForm,
                statuses: statuses as string[] ?? undefined
              })
            }}
          />
        </Form.Item>
        <MultiboardInputGroup
          onChange={
            multiboardIds => handleFiltersChange({ multiboardIds })
          }
        />
        <DatamatrixInputGroup
          onChange={
            datamatrices => handleFiltersChange({datamatrices})
          }
        />
        <PartyInputGroup
          onChange={
            parties => handleFiltersChange({parties})
          }
        />
        <FilterDatePicker
          onChange={
            (startDate, endDate) =>
              handleFiltersChange({ startDate, endDate })
          }
        />
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


