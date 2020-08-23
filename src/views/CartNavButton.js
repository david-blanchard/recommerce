
import React, { Component } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'

import BusinessCart from '../business/Cart'

const count = BusinessCart.count

class CartNavButton extends Component {
  static constructor (props) {
    // super()
    this.props = props
    this._cartCta = null
  }

  static get cartCtaRef () {
    return this._cartCta
  }

  componentDidMount () {
    if (this.props.onSetCartCtaRef !== undefined) {
      this.props.onSetCartCtaRef(this._cartCta)
    }
  }

  render () {
    return (
      <a
        id='cartCta' className='btn btn-success my-2 my-sm-0 ml-3' href='cart'
        ref={(r) => { this._cartCta = r }}
      >
        <FontAwesomeIcon icon={faShoppingCart} />
        <span id='cartSum' className='badge badge-light ml-3'>{count}</span>
      </a>
    )
  }
}

export default CartNavButton
