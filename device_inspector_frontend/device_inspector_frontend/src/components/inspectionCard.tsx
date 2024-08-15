import Card from 'antd/es/card/Card'
import React, { useEffect } from 'react'
import {Button, Divider, Image, Space, Tag, Typography} from 'antd'
import { TInspection } from '../types/inspectionType'
import { SectorBadge } from './sectorBagde'
import { DataMatrix } from './datamatrixGrid'
const {Text} = Typography

type InspectionCardProps = {
  inspection: TInspection
  highlightedDatamatrices?: string[] 
  handleModal: () => void
}

export const InspectionCard: React.FC<InspectionCardProps> = (
  {inspection, handleModal, highlightedDatamatrices}
) => {

  useEffect(() => {
    console.log(
      'Alex path', 
      `${process.env.REACT_APP_API_BASE_URL}/
      get_image?path=${inspection.url_image}`)
  }, [])
  return (
    <Card style={{width: 800, margin: 10 }} hoverable={true}>
      <Space direction={'horizontal'}>
        {/* eslint-disable-next-line @stylistic/max-len */}
        <Image src={`${process.env.REACT_APP_API_BASE_URL}/get_image?path=${inspection.url_image}`}
          // height={100}
          width={400}
          //todo: добавить плейсхолдер
          // (на случай невозможности получить изображение)
          fallback='https://www.google.com/url?sa=i&url=https%3A%2F%2Fcareer.habr.com%2Fcompanies%2Fx-keeper&psig=AOvVaw0hTE7ZtVKzdzQZxmH_IF3_&ust=1701783593182000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCJjInIb09YIDFQAAAAAdAAAAABAE'
        />
        <Space direction={'vertical'}>
          <Typography>Сектор:</Typography>
          <SectorBadge sector_id={inspection.sector_id}/>
          <Divider style={{'margin': 0}}/>
          <Typography>
            Время:
          </Typography>
          <TimeParagraph time={inspection.time}/>
          <Divider style={{'margin': 0}}/>
          <Typography>
            Статус:
          </Typography>
          <>{convertStatusString(inspection.status)}</>
          <Divider style={{'margin': 0}}/>
          <div style={{minWidth: 360}}>
            <DataMatrix 
              highlightedDatamatrix={highlightedDatamatrices}
              inner={false}
              multiboardId={inspection.multiboard_id}/>
          </div>
        </Space>
      </Space>
      <Button onClick={handleModal}>Подробнее</Button>
    </Card>
  )
}

type TimeParagraphProps = {
  time: Date
}
const TimeParagraph: React.FC<TimeParagraphProps> = ({time}) => {
  const convertTime = () => {
    return time.toLocaleString().replace('T', ' ').split('.')[0]
  }
  return (<Text code>
    {convertTime()}
  </Text>)
}

const convertStatusString = (
  statusString: String
) => {
  switch (statusString) {
    case 'NORMAL':
      return <Tag color={'green'}>Проверено</Tag>
      
    case 'UNCHECKED':
      return <Tag>Не проверено</Tag>
      
    case 'DEFECTIVE':
      return <Tag color={'red'}>Брак</Tag>

    case 'REQUIRE_VERIFICATION':
      return <Tag color={'orange'}>Требуется проверка</Tag>
      
    default:
      return <Tag>Статус неизвестен</Tag>
  }
}
