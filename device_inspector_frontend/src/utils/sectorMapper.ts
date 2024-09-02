import type {SelectProps} from 'antd'
import {TSector} from '../types/sectorType'

export default function mapSectorIds(
  sectors: TSector[]
): SelectProps['options'] {
  return sectors.map(sector => (
    {label: sector.name, value: sector.id}
  ))
}