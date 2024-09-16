import type {SelectProps} from 'antd'
import { TSpecification } from '../types/specificationType'

export default function mapSpecificationIds(
  specifications: TSpecification[]
): SelectProps['options'] {
  return specifications.map(specification => (
    {label: specification.name, value: specification.id}
  ))
}