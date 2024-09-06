import React, { useState } from 'react'
import Title from 'antd/es/typography/Title'
import { 
  UnveridiedInspectionsList 
} from './unverifiedInspectionsList'
import { 
  useUnverifiedInspectionModal 
} from '../hooks/useUnverifiedInspectionModal'
import { InspectionModal } from '../../../components/inspectionModal'
import { 
  UnverifiedInspectionsProvider 
} from '../context/inspectionsVerificationContext'
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
    <UnverifiedInspectionsProvider>
      <>
        <UnveridiedInspectionsList 
          toggleModal={toggleModal} 
          isChangeStatus={isChangeStatus} 
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
    </UnverifiedInspectionsProvider>
  </>
}