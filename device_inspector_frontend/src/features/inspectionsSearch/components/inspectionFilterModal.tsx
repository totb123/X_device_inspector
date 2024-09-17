import {Button, Modal} from 'antd'
import React, {useState} from 'react'
import {FilterOutlined} from '@ant-design/icons'
import { SearchInspectionFilter } from './inspectionFilter'

export const SearchFilterModal: React.FC = () => {

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
    
    <div style={{marginTop: 10, marginBottom: 10}}>
      <Button onClick={openModal}>
        <FilterOutlined/>
        Фильтр
      </Button>
    </div>
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
      <SearchInspectionFilter onSubmit={closeModal}/>
    </Modal>
  </>
}