
import React, {useEffect, useState} from 'react'

import {List, Pagination, Spin, Typography} from 'antd'
import Paragraph from 'antd/es/typography/Paragraph'
import useInspectionsSearchGet from '../hooks/useInspectionGet'
import { InspectionCard } from '../../../components/inspectionCard'
import { useFilter } from '../context/searchFilterContext'


type InspectionListProps = {
  toggleModal: Function
}

export const InspectionList: React.FC<InspectionListProps> = props => {


  const updatePaginationValues = (
    page: number, size: number
  ) => {
    setCurrentPage(val => page)
    setPageSize(val => size)
  }
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState(10)
  const filter = useFilter()
  const {
    inspectionsData,
    inspectionsStatus,
    inspectionsRefetch,
    inspectionsTotal
  } = useInspectionsSearchGet(filter, currentPage, pageSize)
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
      <div>
        {
          inspectionsTotal.status == 'success'
            ? <Pagination 
              // defaultCurrent={1}  
              current={currentPage}
              pageSize={pageSize}
              onChange={updatePaginationValues}
              total={inspectionsTotal.data}
            />
            : <Spin/>
        }
      </div>
      {
        inspectionsStatus == 'loading'
          ? <Spin/>
          : <List>
            {
              inspectionsData!.sort(
                (a,b) => a.time.valueOf() - b.time.valueOf()
              ).reverse().map(element =>
                <InspectionCard
                  key={element.id}
                  highlightedDatamatrices={filter.datamatrices}
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