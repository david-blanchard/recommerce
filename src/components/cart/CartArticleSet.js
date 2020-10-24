import React, { useContext, useEffect, useState } from 'react'
import uuid from 'react-uuid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import CartHelper from '../../helpers/CartHelper'
import OfferHelper from '../../helpers/OfferHelper'
import { CartNavButtonContext } from './CartNavButtonContext'

const CartArticleSet = props => {
  const { CartNavButtonRef } = useContext(CartNavButtonContext)

  const booksBulk = CartHelper.isbnCodes
  const offerHelper = new OfferHelper()

  let currentCart = []
  let currentCartLines = []

  let subtotal = 0.0

  const [state, setState] = useState({
    cart: currentCart,
    lines: currentCartLines,
    dirty: false
  })

  const effect = () => {
    currentCart = CartHelper.readCart()

    const { cart } = state
    const { dirty } = state

    if ((currentCart.length === cart.length) && dirty) {
      console.log({ return: true })
      return
    }

    const cartLines = currentCart.map((article, i) => {
      // Add an article to the cart
      subtotal += parseFloat(article.price)

      return { key: 'article', value: i }
    })

    cartLines.push({ key: 'subtotal', value: subtotal.toFixed(2) })
    // Computes the discount sum
    offerHelper.getOffersFromBulkCallback(subtotal, booksBulk, (data) => {
      const offers = data.offers

      const discount = offerHelper.computeDiscount(subtotal, offers)
      cartLines.push({ key: 'discount', value: parseFloat(discount).toFixed(2) })
      cartLines.push({ key: 'total', value: parseFloat(subtotal - discount).toFixed(2) })

      currentCartLines = cartLines

      setState({
        cart: currentCart,
        lines: currentCartLines,
        dirty: true
      })
    })
  }

  useEffect(() => {
    effect()
  })

  const handleRemove = keyid => {
    CartHelper.removeFromCart(keyid)
    CartHelper.printCount(CartNavButtonRef.current)

    effect()

    return true
  }

  return (
    <div className='table-responsive'>
      <table className='table table-striped'>
        <thead>
          <tr>
            <th scope='col'> </th>
            <th scope='col'>Article</th>
            <th scope='col'>Disponibilité</th>
            <th scope='col' className='text-center'>Quantité</th>
            <th scope='col' className='text-right'>Prix</th>
            <th> </th>
          </tr>
        </thead>
        <tbody id='table-lines'>
          {
            state.lines.map((line, i) => {
              // Add an article to the cart

              /* Add an article line to the table */
              if (line.key === 'article') {
                const id = line.value
                const article = state.cart[id]
                // console.log({ id: id, article: article, cart: state.cart })

                return (<ArticleLine key={uuid()} article={article} index={i} onRemove={handleRemove} />)
              }

              /* Add the sub-total line to the table */
              if (line.key === 'subtotal') {
                const subtotal = line.value
                return (<SubTotalLine key={uuid()} sum={subtotal} />)
              }
              /* Add the discount line to the table */
              if (line.key === 'discount') {
                const discount = line.value
                return (<DiscountLine key={uuid()} discountSum={discount} />)
              }
              /* Add the total line to the table */
              if (line.key === 'total') {
                const total = line.value
                return (<TotalLine key={uuid()} total={total} />)
              }

              return true
            })
          }
        </tbody>
      </table>
    </div>
  )
}

const ArticleLine = props => {
  const article = props.article
  const cover = article.cover
  const price = parseFloat(article.price).toFixed(2)
  const title = article.title

  return (
    <tr>
      <td><img src={cover} width='40' height='60' alt='Article card' /> </td>
      <td>{title}</td>
      <td>En stock</td>
      <td><input className='form-control' type='text' value='1' readOnly /></td>
      <td className='text-right'>{price} €</td>
      <td className='text-right'>
        <button onClick={() => { props.onRemove(article.keyid) }} className='remove-from-cart-cta btn btn-sm btn-danger'>
          <FontAwesomeIcon pointerEvents='none' icon={faTrash} />
        </button>
      </td>
    </tr>
  )
}

const SubTotalLine = ({ sum }) => {
  return (
    <tr>
      <td />
      <td />
      <td />
      <td>Sous-total</td>
      <td className='text-right'>{sum} €</td>
      <td />
    </tr>
  )
}

const DiscountLine = ({ discountSum }) => {
  return (
    <tr>
      <td />
      <td />
      <td />
      <td>Meilleure remise</td>
      <td className='text-right'>{discountSum} €</td>
      <td />
    </tr>
  )
}

const TotalLine = ({ total }) => {
  return (
    <tr>
      <td />
      <td />
      <td />
      <td><strong>Total TTC</strong></td>
      <td className='text-right'><strong>{total} €</strong></td>
      <td />
    </tr>
  )
}
export default CartArticleSet
