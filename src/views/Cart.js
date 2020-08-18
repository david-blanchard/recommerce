
import React from 'react'
import Header from './Header'
import Footer from './Footer'

import BusinessHttp from '../business/Http'
import CartArticleSet from './CartArticleSet'

const home = BusinessHttp.fullyQualifiedName()

const Cart = () => {
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
              <CartArticleSet />
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

export default Cart
