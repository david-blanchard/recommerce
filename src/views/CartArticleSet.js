import React, { Component } from 'react'
import uuid from 'react-uuid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import BusinessCart from '../business/Cart'

class CartArticleSet extends Component {
  constructor (props) {
    super(props)
    this.handleRemove = this.handleRemove.bind(this)
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
    // businessCart.computeDiscount = businessCart.computeDiscount.bind(this)
    if (cart.length === 0) {
      const res = this.setState({
        cart: cart,
        lines: []
      })
      return res
    }

    let subtotal = 0.0

    const businessCart = new BusinessCart()

    const cartLines = cart.map((article, i) => {
      // Add an article to the cart
      subtotal += parseFloat(article.price)

      return { key: 'article', value: i }
    })

    subtotal = subtotal.toFixed(2)

    cartLines.push({ key: 'subtotal', value: subtotal })

    // Computes the discount sum
    businessCart.computeDiscount(subtotal, (discountSum) => {
      discountSum = parseFloat(discountSum).toFixed(2)

      cartLines.push({ key: 'discount', value: discountSum })

      const total = parseFloat(subtotal - discountSum).toFixed(2)

      cartLines.push({ key: 'total', value: total })

      const res = this.setState({
        cart: cart,
        lines: cartLines
      })

      return res
    })
  }

  handleRemove (isbn) {
    BusinessCart.removeFromCart(isbn)

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
              })
            }
          </tbody>
        </table>
      </div>
    )
  }
}

class ArticleLine extends Component {
  constructor (props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
    const article = this.props.article
    this.index = this.props.index
    this.cover = article.cover
    this.price = parseFloat(article.price).toFixed(2)
    this.title = article.title
    this.isbn = article.isbn
  }

  handleClick (e) {
    this.props.onRemove(this.isbn)
  }

  render () {
    return (
      <tr>
        <td><img src={this.cover} width='40' height='60' /> </td>
        <td>{this.title}</td>
        <td>En stock</td>
        <td><input className='form-control' type='text' value='1' /></td>
        <td className='text-right'>{this.price} €</td>
        <td className='text-right'>
          <button onClick={this.handleClick} data-isbn={this.isbn} data-index={this.index} className='remove-from-cart-cta btn btn-sm btn-danger'>
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
  console.log({ discountSum: discountSum })

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
  console.log({ total: total })

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
