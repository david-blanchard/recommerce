
import React from 'react'
import Header from './Header'
import Footer from './Footer'

// cookies.js;js/promo.js;js/cart.js
// js/main.js
// showCookiesPopin

function Cart () {
  return (
    <fragment>
      <Header />

      <section class='jumbotron text-center'>
        <div class='container'>
          <h1 class='jumbotron-heading'>VOTRE PANIER</h1>
        </div>
      </section>

      <main role='main' class='flex-shrink-0'>
        <div class='container mb-4'>
          <div class='row'>
            <div class='col-12'>
              <div class='table-responsive'>
                <table class='table table-striped'>
                  <thead>
                    <tr>
                      <th scope='col'> </th>
                      <th scope='col'>Article</th>
                      <th scope='col'>Disponibilité</th>
                      <th scope='col' class='text-center'>Quantité</th>
                      <th scope='col' class='text-right'>Prix</th>
                      <th> </th>
                    </tr>
                  </thead>
                  <tbody id='table-lines' />
                </table>
              </div>
            </div>
            <div class='col mb-2'>
              <div class='row'>
                <div class='col-sm-12  col-md-6'>
                  <a href='{{ home }}' class='btn btn-block btn-light'>Continuer vos achats</a>
                </div>
                <div class='col-sm-12 col-md-6 text-right'>
                  <button class='btn btn-lg btn-block btn-success text-uppercase'>Valider votre panier</button>
                </div>
              </div>
            </div>
          </div>
        </div>

      </main>

      <Footer />
    </fragment>
  )
}

export default Cart
