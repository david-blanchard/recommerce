
import React from 'react'
import Header from './Header'
import Footer from './Footer'

// cookies.js;js/promo.js;js/cart.js
// js/main.js
// showCookiesPopin

function Search () {
  return (
    <fragment>
      <Header />

      <main role='main' class='flex-shrink-0'>
        <section class='jumbotron text-center'>
          <div class='container'>
            <h1>Résultats de votre recherche</h1>
            <p id='resultState' class='lead text-muted' />
            <p>
              <a id='resetSearch' href='#' class='btn btn-secondary my-2'>Effacer ma recherche</a>
            </p>
          </div>
        </section>

        <div class='album py-5'>
          <div class='container'>
            <div id='lostAndFound' class='row' />
          </div>
        </div>

      </main>
      <Footer />
    </fragment>
  )
}
export default Search
