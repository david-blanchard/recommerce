
import React, { Component } from 'react'
import ReactDOM from 'react-dom'

// import BusinessCart from '../business/Cart'

import Header from './Header'
import Footer from './Footer'
import ArticleCard from './ArticleCard'

const SEARCH_FAILURE = "Pas de chance, nous n'avons trouvé aucun article avec ces critères !<br />Tentez une nouvelle recherche."
const SEARCH_SUCCESS = 'Nous avons trouvé %d articles correspondants à vos critères'
const SEARCH_SUCCESS_ONE = 'Nous avons trouvé 1 article correspondant à vos critères'
const SEARCH_STATE_ZERO = true
const WIDGET_CLASS = 'col-md-4'

class Search extends Component {
  constructor () {
    super()
    this._resource = null
    this._results = []
    this._query = ''
    this._resourceURL = 'http://henri-potier.xebia.fr/books'
    this._lostAndFound = document.querySelector('#lostAndFound')
  }

  componentDidMount () {
    Search.bootstrap()
  }

  get results () {
    return this._results
  }

  /**
     * Retrieve the resource and execute a callback function on success if given
     *
     * @param {function} callback
     */
  fetchResource (callback) {
    fetch(this._resourceURL)
      .then(response => response.json())
      .then(data => {
        this._resource = data

        if (typeof callback === 'function') {
          // Trigger callback function on resource found
          callback.call(this)
        }
      })
  }

  /**
     * Retrieve the q field value of the query string
     */
  parseQuery () {
    const url = new URL(window.location.href)

    this._query = url.searchParams.get('q')
  }

  parseInput () {
    this._query = document.querySelector('#searchInput').value
  }

  /**
     *  Try to match the query through the resource on the given field
     *  Set the matching rows in a result array
     *
     *  Returns TRUE if the result array has one key at least otherwise FALSE
     *
     * @param {string} field
     */
  parseResults (field) {
    if (this._resource === null || this._resource === undefined || this._query === '') {
      return false
    }

    const query = this._query.toLowerCase()

    for (const key in this._resource) {
      const row = this._resource[key]

      if (row[field] !== undefined && row[field].toLowerCase().indexOf(query) > -1) {
        this._results.push(row)
      }
    }

    return this._results.length > 0
  }

  /**
     * Loop through the result set and display a template mapped with the current values
     */
  displayResult () {
    for (const key in this._results) {
      const row = this._results[key]

      const widget = document.createElement('div')
      widget.setAttribute('class', WIDGET_CLASS)

      this._lostAndFound.appendChild(widget)

      ReactDOM.render(<ArticleCard row={row} />, widget)
    }
  }

  displayResultState (forceZero = false) {
    const num = this._results.length

    if (num === 0 || forceZero) {
      document.querySelector('#resultState').innerHTML = SEARCH_FAILURE
      document.querySelector('#resetSearch').style.display = 'none'
      return
    }

    let html = SEARCH_SUCCESS_ONE
    if (num > 1) {
      html = `${SEARCH_SUCCESS}`.replace('%d', num)
    }
    document.querySelector('#resultState').innerHTML = html
    document.querySelector('#resetSearch').style.display = 'inline-block'
  }

  /**
     * Clear the search results
     */
  clearSearch () {
    const widgets = this._lostAndFound.querySelectorAll('.' + WIDGET_CLASS)
    const the = this

    widgets.forEach(function (item) {
      the._lostAndFound.removeChild(item)
    })
  }

  // Start the search
  static bootstrap () {
    let search = new Search()
    const criterion = 'title'

    // Get the criterion value from the query string and launch the search
    search.parseQuery()
    search.fetchResource(function () {
      search.parseResults(criterion)
      search.displayResultState()
      search.displayResult()

    })

    document.querySelector('#submitSearchCta').onclick = function () {
      search = new Search()

      // Get the criterion value from the input text box and launch the search
      search.parseInput()
      search.fetchResource(function () {
        search.clearSearch()
        search.parseResults(criterion)
        search.displayResultState()
        search.displayResult()

      })
    }

    document.querySelector('#resetSearch').onclick = function () {
      search = new Search()
      search.clearSearch()
      search.displayResultState(SEARCH_STATE_ZERO)
    }
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
