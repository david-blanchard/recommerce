import React, { createRef } from 'react'
import CpcHeader from './Header'
import CpcFooter from './Footer'

const WithHeaderFooter = (WrappedComponent) => {
  class HeaderFooter extends WrappedComponent {
    constructor () {
      super()
      this._cartCtaRef = createRef()
    }

    get cartCtaRef () {
      return this._cartCtaRef
    }

    componentDidMount () {
      if (super.componentDidMount !== undefined) {
        super.componentDidMount()
      }
      console.log({ HeaderFooter_didMount: this._cartCtaRef })
    }

    render () {
      return (
        <>
          <CpcHeader cartCtaRef={this._cartCtaRef} />
          {super.render()}
          <CpcFooter />
        </>
      )
    }
  }

  return HeaderFooter
}

export default WithHeaderFooter
