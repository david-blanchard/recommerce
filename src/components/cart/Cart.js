
import React, { Component } from 'react'

import BusinessHttp from '../../business/Http'
import CartArticleSet from './CartArticleSet'
import WithHeaderFooter from '../headerAndFooter/WithHeaderFooter'

const home = BusinessHttp.fullyQualifiedName()

class Cart extends Component {
  render () {
    return (
      <>
        <main role='main' className='flex-shrink-0'>
          <section className='jumbotron text-center'>
            <div className='container'>
              <h1 className='jumbotron-heading'>VOTRE PANIER</h1>
            </div>
          </section>
          <div className='container mb-4'>
            <div className='row'>
              <div className='col-12'>
                <CartArticleSet cartCtaRef={this.cartCtaRef} />
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
      </>
    )
  }
}

export default WithHeaderFooter(Cart)
