import React from 'react'
import CpcHeader from './Header'
import CpcFooter from './Footer'
import CartNavButtonProvider from '../cart/CartNavButtonContext'
import SearchProvider from '../search/SearchContext'
import SearchNavBarProvider from '../search/SearchNavBarContext'

const WithHeaderFooter = (WrappedComponent) => props => {
  return (
    <SearchNavBarProvider>
      <SearchProvider>
        <CartNavButtonProvider>
          <CpcHeader />
          <WrappedComponent {...props} />
          <CpcFooter />
        </CartNavButtonProvider>
      </SearchProvider>
    </SearchNavBarProvider>
  )
}

export default WithHeaderFooter
