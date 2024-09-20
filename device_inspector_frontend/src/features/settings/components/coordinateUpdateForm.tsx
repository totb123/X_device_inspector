import React from 'react'

export const CoordinateUpdateForm: React.FC = () => {
  return (
    <>
      {/* <Space.Compact direction="vertical">
        {updatedCoordinates !== undefined ? (
          <div>
            <Row gutter={[16, 16]}>
              // eslint-disable-next-line @stylistic/max-len
              {Array.from({ length: 4 }).map((value, index) => (
                <Form.Item
                  label={`Координаты ${index + 1} платы`}
                  validateDebounce={1000}
                  rules={[{ required: true }]}
                >
                  <Col className="gutter-row" span={20}>
                    <Input
                      value={updatedCoordinates[index]}
                      onChange={value =>
                        handleCoordinateChange(index, value.target.value)
                      }
                    />
                    <Button
                      onClick={() =>
                        showMarker(index, updatedCoordinates[index])
                      }
                    >
                      Посмотреть
                    </Button>
                  </Col>
                </Form.Item>
              ))}
            </Row>
            <Row gutter={[16, 16]}>
              {Array.from({ length: 4 }).map((value, index) => (
                <Form.Item
                  label={`Координаты ${index + 5} платы`}
                  validateDebounce={1000}
                  rules={[{ required: true }]}
                >
                  <Col className="gutter-row" span={20}>
                    <Input
                      value={updatedCoordinates[index + 4]}
                      onChange={value =>
                        handleCoordinateChange(index + 4, value.target.value)
                      }
                    />
                    <Button
                      onClick={() =>
                        showMarker(index + 4, updatedCoordinates[index + 4])
                      }
                    >
                      Посмотреть
                    </Button>
                  </Col>
                </Form.Item>
              ))}
            </Row>
          </div>
        ) : 
          <></>
        }
      </Space.Compact> */}
    </>
  )
}
