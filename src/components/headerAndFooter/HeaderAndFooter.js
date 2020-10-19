import React, { useRef } from 'react'
import CpcHeader from './Header'
import CpcFooter from './Footer'

const HeaderAndFooter = ({ children }) => {
  const cartCtaRef = useRef()

  // const newProps = { [cartCtaRef]: cartCtaRef }

  return (
    <>
      <CpcHeader cartCtaRef={cartCtaRef} />
      {children}
      <CpcFooter />
    </>
  )
}

export default HeaderAndFooter
