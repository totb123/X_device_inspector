import React, { useEffect, useState } from 'react'
import { SearchFilterModal } from './inspectionFilterModal'
import { 
  SearchFilterContextProvider,
  useFilter, 
} from '../context/searchFilterContext'
import { useInspectionModal } from '../hooks/useInspectionModal'
import { InspectionModal } from '../../../components/inspectionModal'
import Title from 'antd/lib/typography/Title'
import { InspectionList } from './inspectionList'


export const MainPage: React.FC = () => {
  const [
    highlightedDatamatrices, 
    setHighlightedDatamatrices] = useState<string[] | undefined>(undefined)
  const [
    isChangeStatus, 
    setIsChangeStatus] = useState<boolean>(false)
  const {
    toggleModal,
    isModalShown,
    modalData} = useInspectionModal()
  const filter = useFilter()
  useEffect(() => {
    if (isModalShown) {
      setHighlightedDatamatrices(filter.datamatrices)
    }
  }, [filter, isModalShown])
  return <>
    <SearchFilterContextProvider>
      <Title level={1}>Поиск инспекций</Title>
      <SearchFilterModal/>
      <InspectionList toggleModal={toggleModal}
        isChangeStatus={isChangeStatus}
        setIsChangeStatus={setIsChangeStatus}/>
      {
        modalData != undefined
          ? <InspectionModal 
            modalData={modalData} 
            isModalVisible={isModalShown} 
            highlightedDatamatrices={highlightedDatamatrices}
            handleModal={toggleModal}
            setIsChangeStatus={setIsChangeStatus}/>
          : <></>
      }
    </SearchFilterContextProvider>
  </>
}