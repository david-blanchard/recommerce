import React, { Component } from 'react'
import BusinessCart from '../business/Cart'

class ArticleCard extends Component {
  constructor (props) {
    super(props)

    this.props = props
    this.handleAddToCart = this.handleAddToCart.bind(this)
    this.parent = props.parent
    this.cartCtaRef = null
  }

  componentDidMount () {
    this.cartCtaRef = this.parent.cartCtaRef
  }

  handleAddToCart (e) {
    BusinessCart.addToCart(e)
    BusinessCart.printCount(this.cartCtaRef)
  }

  render () {
    const row = this.props.row
    const dataset = {}
    dataset.isbn = row.isbn
    dataset.title = row.title
    dataset.price = row.price
    dataset.cover = row.cover

    row.synopsis = row.synopsis[0].substring(0, 128) + '...'

    const json = encodeURIComponent(JSON.stringify(dataset))

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
              <button type='button' onClick={this.handleAddToCart} data-json={json} className='add-to-cart-cta btn btn-sm btn-primary btn-success'>Ajouter au panier</button>
            </div>
            <h3 className='text-muted'>{row.price} €</h3>
          </div>
        </div>
      </div>
    )
  }
}

export default ArticleCard
