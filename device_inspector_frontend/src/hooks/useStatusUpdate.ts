import { useState } from 'react'
import { 
  getStatus, 
  updateStatus 
} from '../services/statusService'
import { InspectionStatus } from '../types/inspectionType'

const convertStatusString = (
  statusString: String
): InspectionStatus | undefined => {
  switch (statusString) {
    case 'NORMAL':
      return InspectionStatus.NORMAL 
      
    case 'UNCHECKED':
      return InspectionStatus.UNCHECKED

    case 'DEFECTIVE':
      return InspectionStatus.DEFECTIVE

    case 'REQUIRE_VERIFICATION':
      return InspectionStatus.REQUIRE_VERIFICATION
    default:
      break
  }
}

export default function useStatusHandler(
  inspectionId: number
) {
  const [status, setStatus] = useState<
  InspectionStatus | undefined
  >(undefined)
  const [loading, setLoading] = useState(false)
  const get = async () => {
    setLoading(true)
    getStatus(inspectionId).then(
      value => setStatus(convertStatusString(value))
    )
    setLoading(false)
  }
  const update = async (newStatus: InspectionStatus) => {
    setLoading(true)
    updateStatus(inspectionId, newStatus).then(
      () => setStatus(newStatus)
    )
    setLoading(false)
  }
  return {
    status: status,
    statusLoading: loading, 
    statusUpdate: update,
    statusGet: get
  }
}