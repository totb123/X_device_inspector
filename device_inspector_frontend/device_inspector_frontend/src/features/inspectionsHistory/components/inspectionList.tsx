import React, {useEffect, useState} from 'react'

import {List, Pagination, Spin, Typography} from 'antd'
import Paragraph from 'antd/es/typography/Paragraph'
import useInspectionGet from '../hooks/useInspectionGet'
import { InspectionCard } from '../../../components/inspectionCard'
import { useFilter } from '../context/historyFilterContext'

type InspectionListProps = {
  toggleModal: Function
}

export const InspectionList: React.FC<InspectionListProps> = props => {


  const updatePaginationValues = (
    page: number, size: number
  ) => {
    setCurrentPage(page)
    setPageSize(size)
  }
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState(10)
  const filter = useFilter()
  const {
    inspectionsData,
    inspectionsStatus,
    inspectionsRefetch,
    inspectionsTotal
  } = useInspectionGet(filter, currentPage, pageSize)
  useEffect(() => {
    (inspectionsRefetch as Function)()
    inspectionsTotal.refetch()
    return () => {
    }
  }, [filter, currentPage, pageSize, inspectionsTotal.refetch])
  if (inspectionsStatus == 'error') {
    return <div>
      <Paragraph>
        Error
      </Paragraph>
      <Typography>
        {inspectionsData?.toString()}
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
              inspectionsData!
                .map(element =>
                  <InspectionCard
                    key={element.id}
                    inspection={element}
                    handleModal={() => {
                      props.toggleModal(
                        inspectionsData!,
                        element.id)
                    }}
                  />)
            }
          </List>
      }
    </div>
  )
}