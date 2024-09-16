import {useState} from 'react'
import {TInspection} from '../../../types/inspectionType'

export function useUnverifiedInspectionModal() {
  const [isModalShown, setModalShown] = useState(false)
  const [modalData, setModalData]
    = useState<TInspection | undefined>(undefined)


  const toggleModal = (
    inspections: TInspection[],
    inspection_id: number) => {
    if (isModalShown) 
      setModalShown(false)
    
    else{
      setModalData((inspections as TInspection[])
        .find(element => element.id === inspection_id))
      setModalShown(!isModalShown)
    }
  }
  return {toggleModal, isModalShown, modalData}
}