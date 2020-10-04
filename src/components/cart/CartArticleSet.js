import React, { Component } from 'react'
import uuid from 'react-uuid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import BusinessCart from '../../business/Cart'
import BusinessOffer from '../../business/Offer'

class CartArticleSet extends Component {
  constructor (props) {
    super(props)
    this.handleRemove = this.handleRemove.bind(this)
    this._cartCtaRef = this.props.cartCtaRef

    this.state = {
      cart: BusinessCart.readCart(),
      lines: []
    }
  }

  componentDidMount () {
    this.computeCart()
  }

  computeCart () {
    const cart = BusinessCart.readCart()

    let subtotal = 0.0

    const cartLines = cart.map((article, i) => {
      // Add an article to the cart
      subtotal += parseFloat(article.price)

      return { key: 'article', value: i }
    })

    cartLines.push({ key: 'subtotal', value: subtotal.toFixed(2) })

    // Computes the discount sum
    try {
      const booksBulk = BusinessCart.isbnCodes

      const businessOffer = new BusinessOffer()
      businessOffer.getOffersFromBulk(subtotal, booksBulk, function (data) {
        const discount = businessOffer.computeDiscount(subtotal, data.offers)
        cartLines.push({ key: 'discount', value: parseFloat(discount).toFixed(2) })
        cartLines.push({ key: 'total', value: parseFloat(subtotal - discount).toFixed(2) })

        const res = this.setState({
          cart: cart,
          lines: cartLines
        })

        return res
      }.bind(this))
    } catch (e) {
      throw new Error(e.message)
    }
  }

  handleRemove (keyid) {
    BusinessCart.removeFromCart(keyid)
    BusinessCart.printCount(this._cartCtaRef.current)

    this.computeCart()
    return true
  }

  render () {
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
              this.state.lines.map((line, i) => {
                // Add an article to the cart

                const keyid = uuid()
                /* Add an article line to the table */
                if (line.key === 'article') {
                  const id = line.value
                  const article = this.state.cart[id]
                  // console.log({ id: id, article: article, cart: this.state.cart })

                  return (<ArticleLine key={keyid} article={article} index={i} onRemove={this.handleRemove} />)
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
}

class ArticleLine extends Component {

  handleClick () {
    this.props.onRemove(this.keyid)
  }

  render () {
    const article = this.props.article
    const cover = article.cover
    const price = parseFloat(article.price).toFixed(2)
    const title = article.title
    this.keyid = article.keyid

    return (
      <tr>
        <td><img src={cover} width='40' height='60' alt='Article card' /> </td>
        <td>{title}</td>
        <td>En stock</td>
        <td><input className='form-control' type='text' value='1' readOnly /></td>
        <td className='text-right'>{price} €</td>
        <td className='text-right'>
          <button onClick={this.handleClick.bind(this)} className='remove-from-cart-cta btn btn-sm btn-danger'>
            <FontAwesomeIcon pointerEvents='none' icon={faTrash} />
          </button>
        </td>
      </tr>
    )
  }
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
