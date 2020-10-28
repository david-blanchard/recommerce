import React, { createContext, useState } from 'react'

const inittalState = { query: '', results: [], dirty: false }
export const SearchContext = createContext(null)

const SearchProvider = props => {
  const [SearchState, setSearchState] = useState(inittalState)

  return (
    <SearchContext.Provider value={{ SearchState, setSearchState }}>
      {props.children}
    </SearchContext.Provider>
  )
}

export default SearchProvider
