import React, { createRef } from 'react'
import CpcHeader from './Header'
import CpcFooter from './Footer'

const WithHeaderFooter = (WrappedComponent) => props => {
  const cartCtaRef = createRef()
  const newProps = { ...props, [cartCtaRef]: cartCtaRef }

  return (
    <>
      <CpcHeader cartCtaRef={cartCtaRef} />
      <WrappedComponent {...newProps} />
      <CpcFooter />
    </>
  )
}

export default WithHeaderFooter
