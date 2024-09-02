import {Button, Modal} from 'antd'
import React, {useState} from 'react'
import {FilterOutlined} from '@ant-design/icons'
import { HistoryInspectionFilter } from './inspectionFilter'


export const InspectionFilterModal: React.FC = () => {

  const closeModal = () => {
    setIsModalShown(false)
  }
  
  const openModal = () => {
    setIsModalShown(true)
  }

  const [
    isModalShown,
    setIsModalShown
  ] = useState<boolean>(false)
  return <>
    <Button onClick={openModal}>
      <FilterOutlined/>
      Фильтр
    </Button>

    <Modal open={isModalShown}
      footer={null}
      onCancel={closeModal}
      title={
        <div>
          <FilterOutlined/>
               Фильтр
        </div>
      }
    >
      <HistoryInspectionFilter onSubmit={closeModal}/>
    </Modal>
  </>
}