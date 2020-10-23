import React from 'react'
import CpcHeader from './Header'
import CpcFooter from './Footer'
import CartNavButtonContext from '../cart/CartNavButtonContext'

const WithHeaderFooter = (WrappedComponent) => props => {
  return (
    <CartNavButtonContext>
      <CpcHeader />
      <WrappedComponent {...props} />
      <CpcFooter />
    </CartNavButtonContext>
  )
}

export default WithHeaderFooter
