import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import BusinessCart from '../business/Cart'

class CartArticleSet extends Component {
  constructor (props) {
    super(props)
    this.state = {
      cart: BusinessCart.readCart()
    }
  }

  componentDidMount () {
    this.displayCart()
  }

  displayCart () {
    const businessCart = new BusinessCart()
    const cart = this.state.cart
    let total = 0
    let i = 1

    cart.forEach((article) => {
      // Add an article to the cart
      CartArticleSet.appendComponent(<ArticleLine article={article} index={i} parent={this} />, 'article' + i)
      total += parseFloat(article.price)
      i++
    })

    total = total.toFixed(2)

    // Add the sub-total to the cart
    CartArticleSet.appendComponent(<SubTotalLine sum={total} parent={this} />, 'subtotal')

    // Computes the discount sum
    businessCart.computeDiscount(total, (discountSum) => {
      discountSum = parseFloat(discountSum).toFixed(2)

      // Add the discount sum line to the cart
      CartArticleSet.appendComponent(<DiscountLine discountSum={discountSum} parent={this} />, 'discount')

      total -= discountSum
      total = parseFloat(total).toFixed(2)

      // Add the total line to the cart
      CartArticleSet.appendComponent(<TotalLine total={total} parent={this} />, 'total')
    })
  }

  removeFromCart (parent) {
    if (parent === undefined || parent === null) {
      return
    }

    const button = parent.target
    const index = parseInt(button.dataset.index) - 1

    BusinessCart.removeFromCart(index)

    this.setState({ cart: BusinessCart.readCart() })

    const tableLines = document.querySelector('#table-lines')
    tableLines.innerHTML = '';

    this.displayCart()
  }

  // Append a line to the cart table
  static appendComponent (element, id) {
    const tableLines = document.querySelector('#table-lines')

    const widget = document.createElement('tr')
    widget.id = 'row-' + id
    tableLines.appendChild(widget)

    ReactDOM.render(element, widget)
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
          <tbody id='table-lines' />
        </table>
      </div>
    )
  }
}

class ArticleLine extends Component {
  constructor (props) {
    super(props)

    const json = this.props.article
    this.index = this.props.index
    this.parent = this.props.parent

    this.cover = json.cover
    this.price = parseFloat(json.price).toFixed(2)
    this.title = json.title
  }

  // const isbn = json.isbn
  render () {
    return (
      <>
        <td><img src={this.cover} width='40' height='60' /> </td>
        <td>{this.title}</td>
        <td>En stock</td>
        <td><input className='form-control' type='text' value='1' /></td>
        <td className='text-right'>{this.price} €</td>
        <td className='text-right'>
          <button onClick={(e) => { this.parent.removeFromCart(e) }} data-index={this.index} className='remove-from-cart-cta btn btn-sm btn-danger'>
            <FontAwesomeIcon style={{ 'pointer-events': 'none' }} icon={faTrash} />

          </button>
        </td>
      </>
    )
  }
}

const SubTotalLine = ({ sum }) => {
  return (
    <>
      <td />
      <td />
      <td />
      <td>Sous-total</td>
      <td className='text-right'>{sum} €</td>
      <td />
    </>
  )
}

const DiscountLine = ({ discountSum }) => {
  return (
    <>
      <td />
      <td />
      <td />
      <td>Meilleure remise</td>
      <td className='text-right'>{discountSum} €</td>
      <td />
    </>
  )
}

const TotalLine = ({ total }) => {
  return (
    <>
      <td />
      <td />
      <td />
      <td><strong>Total TTC</strong></td>
      <td className='text-right'><strong>{total} €</strong></td>
      <td />
    </>
  )
}
export default CartArticleSet
