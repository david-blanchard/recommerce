import React, { createContext, useRef } from 'react'

export const CartNavButtonContext = createContext(null)

const CartNavButtonProvider = props => {
  const CartNavButtonRef = useRef()

  // const newProps = { [cartCtaRef]: cartCtaRef }

  return (
    <CartNavButtonContext.Provider value={{ CartNavButtonRef }}>
      {props.children}
    </CartNavButtonContext.Provider>
  )
}

export default CartNavButtonProvider
