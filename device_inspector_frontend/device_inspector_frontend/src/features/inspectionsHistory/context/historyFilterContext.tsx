import React, {useContext, useState} from 'react'
import { 
  defaultFilters, 
  HistoryFilterContextType
} from '../types/historyFilterContextType'



type FilterContextProps = {
  children: React.ReactNode
}

const HistoryFilterContext =
  React.createContext(defaultFilters)
const HistoryFilterUpdateContext
  = React.createContext((updates: Partial<HistoryFilterContextType>) => {
  })

export function useFilter() {
  return useContext(HistoryFilterContext)
}

export function useFilterUpdate() {
  return useContext(HistoryFilterUpdateContext)
}

export const HistoryFilterContextProvider: React.FC<FilterContextProps> = (
  {children}
) => {
  const [filters, setFilters] = useState(defaultFilters)
  const applyFilters = (
    updates: Partial<HistoryFilterContextType>
  ) => {
    setFilters({...filters, ...updates})
  }
  return <>
    <HistoryFilterContext.Provider value={filters}>
      <HistoryFilterUpdateContext.Provider value={applyFilters}>
        {children}
      </HistoryFilterUpdateContext.Provider>
    </HistoryFilterContext.Provider>
  </>
}

