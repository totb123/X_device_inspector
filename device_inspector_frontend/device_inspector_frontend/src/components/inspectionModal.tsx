import {
  Button, 
  Col, 
  Modal, 
  Row, 
  Space, 
  Image, 
  Card} from 'antd'
import React, {useEffect } from 'react'
import { TInspection } from '../types/inspectionType'
import { LoadingOutlined } from '@ant-design/icons'
import { SectorBadge } from './sectorBagde'
// eslint-disable-next-line @stylistic/max-len
import useBoardsGet from '../features/inspectionsHistory/hooks/useBoardHandler'
import { CommentsDisplayedForm } from './commentsDisplayedForm'
import { DataMatrix } from './datamatrixGrid'
import { StatusBagde } from './statusBagde'

type InspectionModalData = {
  modalData: TInspection
  isModalVisible: boolean
  highlightedDatamatrices?: string[]
  handleModal: Function
  setIsChangeStatus: Function
}

export const InspectionModal:
React.FC<InspectionModalData> = ({
  modalData,
  isModalVisible,
  highlightedDatamatrices,
  handleModal,
  setIsChangeStatus,
})  => {
  const {
    boards, 
    boardsStatus,
    boardsRefetch
  } = useBoardsGet(modalData.multiboard_id)
  

  useEffect(() => {
    boardsRefetch()
    return () => {
    }
  }, [boards, boardsStatus])
  useEffect(() => {}, [highlightedDatamatrices])
  return (<Modal
    width={'60%'}
    closable={false}
    open={isModalVisible}
    title="Информация о проверке"
    footer={<div></div>}
  >
    {
      boards !== undefined 
        ? 
        <DataDisplay 
          changeStatus={setIsChangeStatus}
          inspection={modalData} 
          highlightedDatamatrices={highlightedDatamatrices}
        />    
        : <LoadingOutlined />
    }
    <Row gutter={[16, 16]} justify={'end'}>
      <Space direction='horizontal'>
        <Button disabled>
          Экспорт
        </Button>
        <Button onClick={() => handleModal()}>
        Закрыть
        </Button>
      </Space>
    </Row>
  </Modal>)
}

type DataDisplayProps = {
  inspection: TInspection
  changeStatus: Function
  highlightedDatamatrices?: string[]
}

const DataDisplay: React.FC<DataDisplayProps> = (
  {inspection, changeStatus, highlightedDatamatrices}
) => {
  return (
    <>
      <Row gutter={[16, 16]} justify={'start'}>
        <Col span={12} className="gutter-row" >
          <Image src={`${process.env.REACT_APP_API_BASE_URL}\
/get_image?path=${inspection.url_image}`}/>

        </Col>
        <Col span={12}>
          <Card 
            type='inner' 
            style={{margin: '16px'}} 
            size='small' 
            title="Сектор">
            <SectorBadge sector_id={inspection.sector_id}/>
          </Card>
          <Card 
            type='inner' 
            style={{margin: '16px'}} 
            size='small' 
            title="Время инспекции">
            {
              new Date(
                Date.parse(inspection.time.toString())
              ).toLocaleString()
            }
          </Card>
        </Col>
      </Row>
      <Row gutter={[16, 16]} justify={'start'}>
        <Col>
          <StatusBagde 
            inner
            inspectionId={inspection.id}
            changeStatus={changeStatus}
          />
          <DataMatrix 
            inner
            highlightedDatamatrix={highlightedDatamatrices}
            multiboardId={inspection.multiboard_id}
          />
        </Col>
        <Col flex={'auto'} className="gutter-row">
          <CommentsDisplayedForm inspectionId={inspection.id}/>
        </Col>
      </Row>
    </>
  )
}


