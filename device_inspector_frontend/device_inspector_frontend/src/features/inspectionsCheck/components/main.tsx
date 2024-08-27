import React, { useState } from 'react'
import Title from 'antd/es/typography/Title'
import { InspectionsList } from './inspectionsList'
import { 
  useUnverifiedInspectionModal 
} from '../hooks/useUnverifiedInspectionModal'
import { InspectionModal } from '../../../components/inspectionModal'
export const MainPage:React.FC = () => {
  const [
    isChangeStatus, 
    setIsChangeStatus] = useState<boolean>(false)
  const {
    toggleModal,
    isModalShown,
    modalData} = useUnverifiedInspectionModal()

  return <>
    <Title>Проверка плат</Title>
    <InspectionsList 
      toggleModal={toggleModal} 
      isChangeStatus={false} 
      setIsChangeStatus={setIsChangeStatus}
    />
    {
      modalData !== undefined
        ? <InspectionModal 
          modalData={modalData}
          isModalVisible={isModalShown}
          handleModal={toggleModal} 
          setIsChangeStatus={setIsChangeStatus}
        />
        : <></>
    }
  </>
}