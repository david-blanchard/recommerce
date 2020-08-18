
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Header from './Header'
import Footer from './Footer'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

import BusinessCart from '../business/Cart'

class Cart extends Component {
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
      Cart.appendComponent(<ArticleLine article={article} index={i} />, 'article' + i)
      total += parseFloat(article.price)
      i++
    })

    total = total.toFixed(2)

    // Add the sub-total to the cart
    Cart.appendComponent(<SubTotalLine sum={total} />, 'subtotal')

    // Computes the discount sum
    businessCart.computeDiscount(total, (discountSum) => {
      discountSum = parseFloat(discountSum).toFixed(2)

      // Add the discount sum line to the cart
      Cart.appendComponent(<DiscountLine discountSum={discountSum} />, 'discount')

      total -= discountSum
      total = parseFloat(total).toFixed(2)

      // Add the total line to the cart
      Cart.appendComponent(<TotalLine total={total} />, 'total')
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
    // this.clearLines()
    this.displayCart()
  }

  // Remove all lines of the cart table
  // static clearLines () {
  //   const tableLines = document.querySelector('#table-lines')
  //   ReactDOM.render(() => { return (<>&nbsp;</>) }, tableLines)
  // }

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
      <>
        <Header />

        <section className='jumbotron text-center'>
          <div className='container'>
            <h1 className='jumbotron-heading'>VOTRE PANIER</h1>
          </div>
        </section>

        <main role='main' className='flex-shrink-0'>
          <div className='container mb-4'>
            <div className='row'>
              <div className='col-12'>
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
              </div>
              <div className='col mb-2'>
                <div className='row'>
                  <div className='col-sm-12  col-md-6'>
                    <a href={this.home} className='btn btn-block btn-light'>Continuer vos achats</a>
                  </div>
                  <div className='col-sm-12 col-md-6 text-right'>
                    <button className='btn btn-lg btn-block btn-success text-uppercase'>Valider votre panier</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </main>

        <Footer />
      </>
    )
  }
}

class ArticleLine extends Component {
  constructor (props) {
    super(props)

    const json = this.props.article
    this.index = this.props.index

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
          <button onClick={(e) => { Cart.removeFromCart(e) }} data-index={this.index} className='remove-from-cart-cta btn btn-sm btn-danger'>
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

export default Cart
