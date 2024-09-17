
import {Spin, Typography} from 'antd'
import React from 'react'
import {TSector} from '../types/sectorType'
import {useSectorGet} from '../hooks/useSectorGet'

const {Text} = Typography
interface SectorBadgeProps {
  sector_id: number
}

export const SectorBadge: React.FC<SectorBadgeProps> = sector => {
  const {sectors, sectorsStatus} = useSectorGet()
  return (<div style={{border: 'inherit', borderColor: 'grey'}}>
    {sectorsStatus == 'success' 
      ?  <Text code>{(sectors as TSector[]).find(
        (element: TSector) => element.id == sector.sector_id
      )!.name}</Text>

      : <Spin/>
    }
  </div>)
}
