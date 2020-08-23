
import React, { Component } from 'react'
import Header from './Header'
import Footer from './Footer'

import BusinessHttp from '../business/Http'
import CartArticleSet from './CartArticleSet'

const home = BusinessHttp.fullyQualifiedName()

class Cart extends Component {
  constructor (props) {
    super(props)

    this._cartCtaRef = null

    this.handleSetCartCtaRef = this.handleSetCartCtaRef.bind(this)
  }

  get cartCtaRef () {
    return this._cartCtaRef
  }

  handleSetCartCtaRef (ref) {
    this._cartCtaRef = ref
  }

  render () {
    return (
      <>
        <Header onSetCartCtaRef={this.handleSetCartCtaRef} />

        <section className='jumbotron text-center'>
          <div className='container'>
            <h1 className='jumbotron-heading'>VOTRE PANIER</h1>
          </div>
        </section>

        <main role='main' className='flex-shrink-0'>
          <div className='container mb-4'>
            <div className='row'>
              <div className='col-12'>
                <CartArticleSet parent={this} />
              </div>
              <div className='col mb-2'>
                <div className='row'>
                  <div className='col-sm-12  col-md-6'>
                    <a href={home} className='btn btn-block btn-light'>Continuer vos achats</a>
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

export default Cart
