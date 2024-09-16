export {}; // Это делает файл модулем
// import { Select, Spin } from 'antd';
// import { useSectorGet } from '../hooks/useSectorGet';
// import React from 'react';
//
// const { Option } = Select;
//
// type StatusInputProps = {
//   isMultiple?: boolean;
//   allowClear?: boolean;
//   defaultValue?: string[]; // Изменяем тип на string[], чтобы соответствовать значениям InspectionStatus
//   onChange: (values: string[]) => void; // Изменяем тип на string[], чтобы соответствовать значениям InspectionStatus
// }
//
// export const StatusInput: React.FC<StatusInputProps> = ({
//   onChange, isMultiple = true, allowClear = true, defaultValue
// }) => {
//   const [sectors, sectorStatus] = useSectorGet();
//
//   // Преобразуем перечисление в корректный формат для Select
//   const options = Object.values(InspectionStatus).map(status => ({
//     label: status,
//     value: status,
//   }));
//
//   return (
//     <div style={{ width: '200px' }}>
//       {sectorStatus === 'success' ? (
//         <Select
//           mode={isMultiple ? 'multiple' : undefined}
//           allowClear={allowClear}
//           defaultValue={defaultValue}
//           disabled={sectorStatus !== 'success'}
//           onChange={onChange}
//           options={options} // Используем преобразованный массив опций
//         />
//       ) : (
//         <Spin />
//       )}
//     </div>
//   );
// }
//
// export enum InspectionStatus {
//   UNCHECKED = 'UNCHECKED',
//   NORMAL = 'NORMAL',
//   DEFECTIVE = 'DEFECTIVE',
//   REQUIRE_VERIFICATION = 'REQUIRE_VERIFICATION'
// }