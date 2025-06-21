import React, {useContext} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faShoppingCart} from '@fortawesome/free-solid-svg-icons'
import useCartService from '../../services/CartService'
import {CartNavButtonContext} from './CartNavButtonContext'

const CartNavButton = props => {
    const cartService = useCartService()
    const count = cartService.count

    const {CartNavButtonRef} = useContext(CartNavButtonContext)

    return (
        <a id='cartCta' className='btn btn-success ms-3' href='cart'>
            <FontAwesomeIcon icon={faShoppingCart}/>
            <span id='cartSum' className='badge bg-light text-dark ms-3' ref={CartNavButtonRef}>
        {count}
      </span>
        </a>
    )
}

export default CartNavButton