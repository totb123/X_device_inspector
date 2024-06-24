import React from 'react'
import {MainPage} from './pages/mainPage'
import {QueryClient} from 'react-query'
import {QueryClientProvider} from 'react-query'

export const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MainPage key={'key'}/>
    </QueryClientProvider>
  )
}

export default App
