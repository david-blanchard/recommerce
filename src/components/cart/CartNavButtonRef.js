
import React, { forwardRef } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'

import BusinessCart from '../../business/Cart'

const count = BusinessCart.count

const CartNavButtonRef = (props, ref) => {
  return (
    <a id='cartCta' className='btn btn-success my-2 my-sm-0 ml-3' href='cart'>
      <FontAwesomeIcon icon={faShoppingCart} />
      <span id='cartSum' className='badge badge-light ml-3' ref={ref}>{count}</span>
    </a>
  )
}

const CartNavButton = forwardRef(CartNavButtonRef)

export default CartNavButton
