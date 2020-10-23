import React, { createContext, useRef } from 'react'

export const CartNavButtonContext = createContext(null)
let CartNavButtonRef = null

const CartNavButtonWrapper = props => {
  CartNavButtonRef = useRef()

  // const newProps = { [cartCtaRef]: cartCtaRef }

  return (
    <CartNavButtonContext.Provider value={{ CartNavButtonRef }}>
      {props.children}
    </CartNavButtonContext.Provider>
  )
}

export default CartNavButtonWrapper
