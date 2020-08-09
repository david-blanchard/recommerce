
import React, { Component } from 'react'
import Header from './Header'
import Footer from './Footer'

import BusinessSearch from '../business/Search'

// cookies.js;js/promo.js;js/cart.js
// js/main.js
// showCookiesPopin

class Search extends Component {
  componentDidMount () {
    BusinessSearch.bootstrap()
  }

  render () {
    return (
      <>
        <Header />

        <main role='main' className='flex-shrink-0'>
          <section className='jumbotron text-center'>
            <div className='container'>
              <h1>Résultats de votre recherche</h1>
              <p id='resultState' className='lead text-muted' />
              <p>
                <a id='resetSearch' href='#' className='btn btn-secondary my-2'>Effacer ma recherche</a>
              </p>
            </div>
          </section>

          <div className='album py-5'>
            <div className='container'>
              <div id='lostAndFound' className='row' />
            </div>
          </div>

        </main>
        <Footer />
      </>
    )
  }
}

export default Search
