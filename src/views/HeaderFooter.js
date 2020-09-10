import React, { Component } from 'react'
import CpcHeader from './Header'
import CpcFooter from './Footer'

class HeaderFooter extends Component {
  constructor (props) {
    super(props)
    this.props = props
    this._cartCtaRef = props.cartCtaRef
  }

  get cartCtaRef () {
    return this._cartCtaRef
  }

  componentDidMount () {
    console.log({ HeaderFooter_didMount: this._cartCtaRef })
  }

  render () {
    return (
      <>
        <CpcHeader cartCtaRef={this._cartCtaRef} />
        {this.props.children}
        <CpcFooter />
      </>
    )
  }
}

export default HeaderFooter
