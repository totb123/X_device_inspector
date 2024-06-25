import { useState } from 'react'
import { 
  getStatus, 
  updateStatus 
} from '../services/statusService'
import { BoardStatus } from '../types/boardType'

const convertStatusString = (
  statusString: String
): BoardStatus | undefined => {
  switch (statusString) {
    case 'NORMAL':
      return BoardStatus.NORMAL 
      
    case 'UNCHECKED':
      return BoardStatus.UNCHECKED
      
    case 'DEFECTIVE':
      return BoardStatus.DEFECTIVE
      
    default:
      break
  }
}

export default function useStatusHandler(
  inspectionId: number
) {
  const [status, setStatus] = useState<BoardStatus | undefined>(undefined)
  const [loading, setLoading] = useState(false)
  const get = async () => {
    setLoading(true)
    getStatus(inspectionId).then(
      value => setStatus(convertStatusString(value))
    )
    setLoading(false)
  }
  const update = async (newStatus: BoardStatus) => {
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