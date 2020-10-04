
import React, { Component } from 'react'
import uuid from 'react-uuid'

import ArticleCard from './ArticleCard'
// import HeaderFooter from './HeaderFooter'
import WithHeaderFooter from '../headerAndFooter/WithHeaderFooter'

import BusinessHttp from '../../business/Http'

const SEARCH_FAILURE = "Pas de chance, nous n'avons trouvé aucun article avec ces critères !<br />Tentez une nouvelle recherche."
const SEARCH_SUCCESS = 'Nous avons trouvé %d articles correspondants à vos critères'
const SEARCH_SUCCESS_ONE = 'Nous avons trouvé 1 article correspondant à vos critères'
const SEARCH_STATE_ZERO = true
const CRITERION = 'title'

const home = BusinessHttp.fullyQualifiedName()

class Search extends Component {
  constructor () {
    super()
    this._resource = null
    this._results = []
    this._query = ''
    this._resourceURL = 'http://henri-potier.xebia.fr/books'
    this._resultStateTextbox = null
    this._resultSearchAnchor = null
    this._cartCtaRef = this.cartCtaRef

    this.handleResetSearch = this.handleResetSearch.bind(this)
    this.handleSubmitSearch = this.handleSubmitSearch.bind(this)
    this.fetchResource = this.fetchResource.bind(this)

    this.state = { results: [] }
  }

  componentDidMount () {
    console.log({ Search_didMount: this._cartCtaRef })

    // Get the criterion value from the query string and launch the search
    this.parseQuery()
    this.fetchResource(() => {
      this.parseResults(CRITERION)
      this.displayResultState()

      this.setState({ results: this._results })
    })
  }

  get results () {
    return this._results
  }

  handleSubmitSearch (queryString) {
    // Get the criterion value from the input text box and launch the search
    this.parseInput(queryString)
    this.fetchResource(() => {
      this.clearSearch()
      this.parseResults(CRITERION)
      this.displayResultState()

      this.setState({ results: this._results })
    })

    return false
  }

  handleResetSearch (e) {
    this.clearSearch()
    this.displayResultState(SEARCH_STATE_ZERO)

    e.preventDefault()
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

  parseInput (value) {
    this._query = value
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

  displayResultState (forceZero = false) {
    const num = this._results.length

    if (num === 0 || forceZero) {
      this._resultStateTextbox.innerHTML = SEARCH_FAILURE
      this._resultSearchAnchor.style.display = 'none'
      return
    }

    let html = SEARCH_SUCCESS_ONE
    if (num > 1) {
      html = `${SEARCH_SUCCESS}`.replace('%d', num)
    }
    this._resultStateTextbox.innerHTML = html
    this._resultSearchAnchor.style.display = 'inline-block'
  }

  /**
     * Clear the search results
     */
  clearSearch () {
    this.setState({ results: [] })
  }

  render () {
    return (
      <main role='main' className='flex-shrink-0'>
        <section className='jumbotron text-center'>
          <div className='container'>
            <h1>Résultats de votre recherche</h1>
            <p id='resultState' className='lead text-muted' ref={r => (this._resultStateTextbox = r)} />
            <p>
              <a id='resetSearch' className='btn btn-secondary my-2' href={home} onClick={this.handleResetSearch} ref={r => (this._resultSearchAnchor = r)}>Effacer ma recherche</a>
            </p>
          </div>
        </section>

        <div className='album py-5'>
          <div className='container'>
            <div id='lostAndFound' className='row'>
              {
                this.state.results.map((row, i) => {
                  const keyid = uuid()
                  return (
                    <div key={i} className='col-md-4'>
                      <ArticleCard key={keyid} keyid={keyid} row={row} cartCtaRef={this._cartCtaRef} />
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>

      </main>
    )
  }
}

export default WithHeaderFooter(Search)
