import { Button, Space, Spin } from 'antd'
import React, { useContext } from 'react'

import { 
  InspectionsVerificationContext
} from '../context/inspectionsVerificationContext'

type VerifyButtonContainerProps = {
  inspectionId: number;
};
export const VerifyButtonContainer: React.FC<
VerifyButtonContainerProps> = ({
  inspectionId,
}) => {
  const { verifyInspection, isVerifyLoading } = useContext(
    InspectionsVerificationContext
  )!

  return (<Space direction='vertical'>
    Установить статус      
    <Space direction="horizontal">
      <Button 
        loading={isVerifyLoading}
        onClick={() => 
          verifyInspection('uncheck', inspectionId)}>
        Не проверено
      </Button>
      <Button 
        danger 
        loading={isVerifyLoading}
        onClick={() => 
          verifyInspection('defect', inspectionId)}>
        Брак
      </Button>
    </Space>
  </Space>
  )
}
