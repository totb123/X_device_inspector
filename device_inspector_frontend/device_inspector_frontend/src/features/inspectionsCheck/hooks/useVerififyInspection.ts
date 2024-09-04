import { useMutation } from 'react-query'
import { updateStatus } from '../../../services/statusService'
import { InspectionStatus } from '../../../types/inspectionType'

export const useVerifyInspection = () => {
  const uncheckInspection = useMutation(
    async (inspection_id: number) => 
      await updateStatus(inspection_id, InspectionStatus.UNCHECKED)
  )

  const defectInspection = useMutation(
    async (inspection_id: number) => 
      await updateStatus(inspection_id, InspectionStatus.DEFECTIVE)
  )
  return {
    uncheckInspection,
    defectInspection
  }
}
