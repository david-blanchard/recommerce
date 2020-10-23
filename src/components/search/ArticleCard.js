import React, { useContext } from 'react'
import BusinessCart from '../../business/Cart'
import { CartNavButtonContext } from '../cart/CartNavButtonContext'

const ArticleCard = props => {
  const { CartNavButtonRef } = useContext(CartNavButtonContext)

  const handleAddToCart = () => {
    BusinessCart.addToCart(props.row)
    BusinessCart.printCount(CartNavButtonRef.current)
  }

  const row = props.row
  row.synopsis = row.synopsis[0].substring(0, 128) + '...'

  return (
    <div className='card mb-4 shadow-sm'>
      <img src={row.cover} alt={row.title} width='288' height='424' preserveAspectRatio='xMidYMid slice' focusable='false' />
      <div className='card-body'>
        <p className='card-text'>
          <span className='title'>
            {row.title}
          </span>
          <br />
          {row.synopsis}
        </p>
        <small>ISBN: {row.isbn}</small>
        <div className='d-flex justify-content-between align-items-center'>
          <div className='btn-group'>
            <button type='button' className='btn btn-sm btn-outline-secondary'>Plus</button>
            <button type='button' onClick={handleAddToCart} className='add-to-cart-cta btn btn-sm btn-primary btn-success'>Ajouter au panier</button>
          </div>
          <h3 className='text-muted'>{row.price} €</h3>
        </div>
      </div>
    </div>
  )
}

export default ArticleCard
