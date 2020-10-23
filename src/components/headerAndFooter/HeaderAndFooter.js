import React from 'react'
import CpcHeader from './Header'
import CpcFooter from './Footer'
import CartNavButtonContext from '../cart/CartNavButtonContext'

const HeaderAndFooter = ({ children }) => {
  // const newProps = { [cartCtaRef]: cartCtaRef }

  return (
    <CartNavButtonContext>
      <CpcHeader />
      {children}
      <CpcFooter />
    </CartNavButtonContext>
  )
}

export default HeaderAndFooter
