import React from 'react'

import { Layout, Menu } from 'antd'
import { useState } from 'react'
import {
  InspectionSearchPage
} from '../features/inspectionsSearch/index'
import { InspectionsHistoryPage } from '../features/inspectionsHistory'
import { SettingsPage } from '../features/settings'
import { CurrentPartyPage } from '../features/currentParty'
import { InspectionsCheckPage } from '../features/inspectionsCheck'

const pages= [{
  key: '0',
  label: 'Поиск',
},{
  key: '1',
  label: 'История',
},{
  key: '2',
  label: 'Настройки',
},{
  key: '3',
  label: 'Партия',
}, {
  key: '4',
  label: 'Проверка плат',
}
]

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
      case pages[3].key:
        return <CurrentPartyPage/>
      case pages[4].key:
        return <InspectionsCheckPage/>
      default:
        return <InspectionSearchPage/>
    }
  }
  return pageSwitch()
}