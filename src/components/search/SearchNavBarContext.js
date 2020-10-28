import React, { createContext, useRef } from 'react'

export const SearchNavBarContext = createContext(null)

const SearchNavBarProvider = props => {
  const SearchNavBarRef = useRef()

  return (
    <SearchNavBarContext.Provider value={{ SearchNavBarRef }}>
      {props.children}
    </SearchNavBarContext.Provider>
  )
}

export default SearchNavBarProvider
