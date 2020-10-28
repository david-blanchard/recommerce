import React from 'react'
import CpcHeader from './Header'
import CpcFooter from './Footer'
import SearchNavBarProvider from '../search/SearchNavBarContext'
import SearchProvider from '../search/SearchContext'
import CartNavButtonProvider from '../cart/CartNavButtonContext'

const HeaderAndFooter = ({ children }) => {
  // const newProps = { [cartCtaRef]: cartCtaRef }

  return (
    <SearchNavBarProvider>
      <SearchProvider>
        <CartNavButtonProvider>
          <CpcHeader />
          {children}
          <CpcFooter />
        </CartNavButtonProvider>
      </SearchProvider>
    </SearchNavBarProvider>

  )
}

export default HeaderAndFooter
