import React, {useContext, useState} from 'react'
import { 
  defaultFilters,
  SearchFilterContextType 
} from '../types/searchFilterContextType'

type FilterContextProps = {
  children: React.ReactNode
}

const SearchFilterContext =
  React.createContext(defaultFilters)
const SearchFilterUpdateContext
  = React.createContext((updates: Partial<SearchFilterContextType>) => {
  })


export function useFilter() {
  return useContext(SearchFilterContext)
}

export function useFilterUpdate() {
  return useContext(SearchFilterUpdateContext)
}

export const SearchFilterContextProvider: React.FC<FilterContextProps> = (
  {children}
) => {
  const [filters, setFilters] = useState(defaultFilters)
  const applyFilters = (
    updates: Partial<SearchFilterContextType>
  ) => {
    setFilters({...filters, ...updates})
  }
  return <>
    <SearchFilterContext.Provider value={filters}>
      <SearchFilterUpdateContext.Provider value={applyFilters}>
        {children}
      </SearchFilterUpdateContext.Provider>
    </SearchFilterContext.Provider>
  </>
}

