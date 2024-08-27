import React, { ReactNode, useEffect, useState } from 'react'
// eslint-disable-next-line @stylistic/max-len
import useUnverifiedInspectionsGet from '../hooks/useUnverifiedInspectionsGet'
import { TInspection } from '../../../types/inspectionType'
import { UseQueryResult } from 'react-query'
import { useVerifyInspection } from '../hooks/useVerififyInspection'
type TInspectionsVerificationContext = {
  inspections: TInspection[] | undefined
  inspectionsStatus: 'loading' | 'error' | 'success' | 'idle'
  inspectionsTotal: any
  inspectionsRefetch: () => void
  changePageSize: (page: number, size: number) => void
  verifyInspection: (
    method: 'uncheck' | 'defect', inspectionId: number
  ) => void
  isVerifyLoading: boolean
}

type InspectionsVerificationProviderProps = {
  children: ReactNode
}

const InspectionsVerificationContext = React.createContext<
TInspectionsVerificationContext | null>(null)

const UnverifiedInspectionsProvider: React.FC<
InspectionsVerificationProviderProps> = ({children}) => {

  const [currentPage, setCurrentPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState(10)
  const {
    inspectionsData,
    inspectionsStatus,
    inspectionsRefetch,
    inspectionsTotal
  } = useUnverifiedInspectionsGet(currentPage, pageSize)
  const {uncheckInspection, defectInspection} = useVerifyInspection()

  const handleRefetch = () => {
    inspectionsRefetch()
  }

  const handlePageSizeChange = (currentPage: number, size: number) => {
    setCurrentPage(currentPage)
    setPageSize(size)
  }

  const verifyInspection = (
    method: 'uncheck' | 'defect', inspectionId: number
  ) => {
    switch (method) {
      case 'uncheck':
        uncheckInspection.mutate(inspectionId)
        break
      case 'defect':
        defectInspection.mutate(inspectionId)
        break
      default:
        break
    }
  }

  useEffect(() => {
    if (uncheckInspection.isLoading || defectInspection.isLoading) 
      inspectionsRefetch()
    
  }, [uncheckInspection.isLoading, defectInspection.isLoading])
  
  return (
    <InspectionsVerificationContext.Provider value={{ 
      inspections: inspectionsData,
      inspectionsStatus: inspectionsStatus,
      inspectionsTotal: inspectionsTotal,
      inspectionsRefetch: handleRefetch,
      changePageSize: handlePageSizeChange,
      verifyInspection: verifyInspection,
      isVerifyLoading: uncheckInspection.isLoading || 
      defectInspection.isLoading
    }}>
      {children}
    </InspectionsVerificationContext.Provider>
  )
}

export { UnverifiedInspectionsProvider, InspectionsVerificationContext }