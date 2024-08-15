import React from 'react'

import { Layout, Menu } from 'antd'
import { useState } from 'react'
import {
  InspectionSearchPage
} from '../features/inspectionsSearch/index'
import { InspectionsHistoryPage } from '../features/inspectionsHistory'
import MenuItem from 'antd/es/menu/MenuItem'
import { SettingsPage } from '../features/settings'

const pages= [{
  key: '0',
  label: 'Поиск',
},{
  key: '1',
  label: 'История',
},{
  key: '2',
  label: 'Настройки',
}]

export const MainPage = () => {

  const [selectedPage, setSelectedPage] = useState(pages[0].key)

  const handlePageSelection = (selectedPage: any) => {
    setSelectedPage(selectedPage.key)
  }

  return (<div>
    <Layout>
      <Layout.Header>
        <Menu
          theme='dark'
          items={pages}
          mode='horizontal'
          selectedKeys={[selectedPage]}
          onClick={handlePageSelection}
        />
      </Layout.Header>
      <Layout.Content>
        <PageSwitchContainer selectedPage={selectedPage}/>
      </Layout.Content>
    </Layout>
  </div>
  )
}

const PageSwitchContainer:
React.FC<{selectedPage: string}> = ({selectedPage}) => {
  const pageSwitch = () => {
    switch (selectedPage) {
      case pages[0].key:
        return <InspectionSearchPage />
      case pages[1].key:
        return <InspectionsHistoryPage />
      case pages[2].key:
        return <SettingsPage/>
      default:
        return <InspectionSearchPage/>
    }
  }
  return pageSwitch()
}
