export enum BoardStatus {
  UNCHECKED = 'UNCHECKED',
  NORMAL = 'NORMAL',
  DEFECTIVE = 'DEFECTIVE'
}

export type TBoard = {
  id: number
  datamatrix: number
  multiboard_id: number
  status: BoardStatus
}
