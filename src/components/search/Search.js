
import React, { useEffect, useRef, useState } from 'react'
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

const Search = props => {
  let resource = null
  const results = []
  let query = ''
  const resourceURL = 'http://henri-potier.xebia.fr/books'
  const resultStateTextboxRef = useRef()
  const resultSearchAnchorRef = useRef()
  const cartCtaRef = props.cartCtaRef

  const [state, setState] = useState({ results: [] })

  useEffect(() => {
    // Get the criterion value from the query string and launch the search
    parseQuery()
    fetchResource(() => {
      parseResults(CRITERION)
      displayResultState()

      setState({ results: results })
    })
  }, [])

  const handleSubmitSearch = (queryString) => {
    // Get the criterion value from the input text box and launch the search
    parseInput(queryString)
    fetchResource(() => {
      clearSearch()
      parseResults(CRITERION)
      displayResultState()

      setState({ results: results })
    })

    return false
  }

  const handleResetSearch = (e) => {
    clearSearch()
    displayResultState(SEARCH_STATE_ZERO)

    e.preventDefault()
  }

  /**
     * Retrieve the resource and execute a callback function on success if given
     *
     * @param {function} callback
     */
  const fetchResource = (callback) => {
    fetch(resourceURL)
      .then(response => response.json())
      .then(data => {
        resource = data

        if (typeof callback === 'function') {
          // Trigger callback function on resource found
          callback.call(this)
        }
      })
  }

  /**
     * Retrieve the q field value of the query string
     */
  const parseQuery = () => {
    const url = new URL(window.location.href)

    query = url.searchParams.get('q')
  }

  const parseInput = (value) => {
    query = value
  }

  /**
     *  Try to match the query through the resource on the given field
     *  Set the matching rows in a result array
     *
     *  Returns TRUE if the result array has one key at least otherwise FALSE
     *
     * @param {string} field
     */
  const parseResults = (field) => {
    if (resource === null || resource === undefined || query === '') {
      return false
    }

    query = query.toLowerCase()

    for (const key in resource) {
      const row = resource[key]

      if (row[field] !== undefined && row[field].toLowerCase().indexOf(query) > -1) {
        results.push(row)
      }
    }

    return results.length > 0
  }

  const displayResultState = (forceZero = false) => {
    const num = results.length

    if (num === 0 || forceZero) {
      resultStateTextboxRef.current.innerHTML = SEARCH_FAILURE
      resultSearchAnchorRef.current.style.display = 'none'
      return
    }

    let html = SEARCH_SUCCESS_ONE
    if (num > 1) {
      html = `${SEARCH_SUCCESS}`.replace('%d', num)
    }
    resultStateTextboxRef.current.innerHTML = html
    resultSearchAnchorRef.current.style.display = 'inline-block'
  }

  /**
   * Clear the search results
   */
  const clearSearch = () => {
    setState({ results: [] })
  }

  return (
    <main role='main' className='flex-shrink-0'>
      <section className='jumbotron text-center'>
        <div className='container'>
          <h1>Résultats de votre recherche</h1>
          <p id='resultState' className='lead text-muted' ref={resultStateTextboxRef} />
          <p>
            <a id='resetSearch' className='btn btn-secondary my-2' href={home} onClick={handleResetSearch} ref={resultSearchAnchorRef}>Effacer ma recherche</a>
          </p>
        </div>
      </section>

      <div className='album py-5'>
        <div className='container'>
          <div id='lostAndFound' className='row'>
            {
              (state !== undefined) && state.results.map((row, i) => {
                const keyid = uuid()
                return (
                  <div key={i} className='col-md-4'>
                    <ArticleCard key={keyid} keyid={keyid} row={row} cartCtaRef={cartCtaRef} />
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

export default WithHeaderFooter(Search)
