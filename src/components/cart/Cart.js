import React from 'react'
import HttpHelper from '../../helpers/HttpHelper'
import CartArticleSet from './CartArticleSet'
import HeaderAndFooter from '../headerAndFooter/HeaderAndFooter'

const home = HttpHelper.fullyQualifiedName()

const Cart = props => {
  return (
    <HeaderAndFooter>
      <main className='flex-shrink-0'>
        <div className='py-5 text-center bg-light mb-4'>
          <div className='container'>
            <h1 className='display-5 fw-bold text-uppercase'>Votre panier</h1>
          </div>
        </div>
        
        <div className='container mb-4'>
          <div className='row'>
            <div className='col-12'>
              <CartArticleSet />
            </div>
            <div className='col-12 mb-4'>
              <div className='row g-3'>
                <div className='col-sm-12 col-md-6'>
                  <a 
                    href={home} 
                    className='btn btn-light w-100'
                  >
                    Continuer vos achats
                  </a>
                </div>
                <div className='col-sm-12 col-md-6 text-end'>
                  <button 
                    className='btn btn-success btn-lg w-100 text-uppercase'
                  >
                    Valider votre panier
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </HeaderAndFooter>
  )
}

export default Cart