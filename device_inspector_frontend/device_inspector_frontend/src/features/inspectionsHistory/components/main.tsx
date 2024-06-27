import React, { useState } from 'react'
import Title from 'antd/es/typography/Title'
import {useInspectionModal} from '../hooks/useInspectionModal'
import {
  HistoryFilterContextProvider, 
} from '../context/historyFilterContext'
import {InspectionFilterModal} from './inspectionFilterModal'
import { InspectionModal } from '../../../components/inspectionModal'
import { InspectionList } from './inspectionList'



export function MainPage() {
  const [
    isChangeStatus, 
    setIsChangeStatus] = useState<boolean>(false)
  const {
    toggleModal,
    isModalShown,
    modalData} = useInspectionModal()

  return <HistoryFilterContextProvider>
    <Title level={1}>История инспекций</Title>
    <InspectionFilterModal/>
    <InspectionList toggleModal={toggleModal} 
      isChangeStatus={isChangeStatus}
      setIsChangeStatus={setIsChangeStatus}/>
    {
      modalData != undefined 
        ? <InspectionModal 
          modalData={modalData} 
          isModalVisible={isModalShown} 
          handleModal={toggleModal}
          setIsChangeStatus={setIsChangeStatus}/>
        : <></>
    }
  </HistoryFilterContextProvider>
  
}

