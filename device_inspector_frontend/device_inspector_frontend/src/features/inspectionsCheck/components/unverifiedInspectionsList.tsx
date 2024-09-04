import React, {useContext, useEffect, useState} from 'react'

import {List, Pagination, Spin, Typography} from 'antd'
import Paragraph from 'antd/es/typography/Paragraph'
import { 
  InspectionsVerificationContext 
} from '../context/inspectionsVerificationContext'
import { UnverifiedInspectionCard } from './unverifiedInspectionCard'


type UnveridiedInspectionsListProps = {
  toggleModal: Function
  isChangeStatus: boolean
  setIsChangeStatus: Function
}

export const UnveridiedInspectionsList: React.FC<
UnveridiedInspectionsListProps
> = props => {
  const updatePaginationValues = (
    page: number, size: number
  ) => {
    setCurrentPage(page)
    setPageSize(size)
  }
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState(10)
  
  const {
    inspections,
    inspectionsStatus,
    inspectionsRefetch,
    inspectionsTotal
  } = useContext(InspectionsVerificationContext)!
  useEffect(() => {
    
    (inspectionsRefetch as Function)()
    inspectionsTotal.refetch()
    return () => {
    }
  }, [currentPage, pageSize, inspectionsTotal.refetch, inspectionsStatus])

  useEffect(() => {
    if (props.isChangeStatus) {
      (inspectionsRefetch as Function)()
      inspectionsTotal.refetch()
      props.setIsChangeStatus(false)
    }
  }, [props.isChangeStatus])
  
  if (inspectionsStatus == 'error') {
    return <div>
      <Paragraph>
        Error
      </Paragraph>
      <Typography>
        {inspections?.toString()}
      </Typography>
    </div>
  }
  
  return (
    <div>
      <Pagination 
        defaultCurrent={1}  
        onChange={updatePaginationValues}
        total={inspectionsTotal.data}
      />
      {
        inspectionsStatus == 'loading'
          ? <Spin/>
          : <List>
            {
              inspections!
                .map(element =>
                  <UnverifiedInspectionCard
                    key={element.id}
                    inspection={element}
                    handleModal={() => {
                      props.toggleModal(
                        inspections!,
                        element.id)
                    }}
                    
                  />)
            }
          </List>
      }
    </div>
  )
}