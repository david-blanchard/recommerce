
import React, { useCallback, useEffect, useRef, useState } from 'react'
import uuid from 'react-uuid'

import SearchHelper from '../../helpers/SearchHelper'
import ArticleCard from './ArticleCard'
// import HeaderFooter from './HeaderFooter'
// import HeaderAndFooter from '../headerAndFooter/HeaderAndFooter'
import WithHeaderFooter from '../headerAndFooter/WithHeaderFooter'

import HttpHelper from '../../helpers/HttpHelper'

const SEARCH_FAILURE = "Pas de chance, nous n'avons trouvé aucun article avec ces critères !<br />Tentez une nouvelle recherche."
const SEARCH_SUCCESS = 'Nous avons trouvé %d articles correspondants à vos critères'
const SEARCH_SUCCESS_ONE = 'Nous avons trouvé 1 article correspondant à vos critères'
const SEARCH_STATE_ZERO = true
const CRITERION = 'title'

const home = HttpHelper.fullyQualifiedName()

const Search = props => {
  let resource = null
  let results = []
  let query = ''
  const resourceURL = 'http://henri-potier.xebia.fr/books'
  const resultStateTextboxRef = useRef()
  const resultSearchAnchorRef = useRef()

  const [state, setState] = useState({ results: [] })

  const effect = () => {
    // Get the criterion value from the query string and launch the search
    query = SearchHelper.parseQuery()
    SearchHelper.fetchResource(resourceURL, (data) => {
      resource = data
      results = SearchHelper.parseResults(query, resource, CRITERION)

      setState({ results: results })

      displayResultState()
    })
  }

  useEffect(() => {
    effect()
  }, [])

  // const handleSubmitSearch = (queryString) => {
  //   // Get the criterion value from the input text box and launch the search
  //   parseInput(queryString)
  //   fetchResource(() => {
  //     clearSearch()
  //     parseResults(CRITERION)
  //     displayResultState()

  //     setState({ results: results })
  //   })

  //   return false
  // }

  // const parseInput = (value) => {
  //   query = value
  // }

  const handleResetSearch = (e) => {
    clearSearch()
    displayResultState(SEARCH_STATE_ZERO)

    e.preventDefault()
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
              (state.results !== undefined && state.results.length > 0) && state.results.map((row, i) => {
                const keyid = uuid()
                return (
                  <div key={i} className='col-md-4'>
                    <ArticleCard key={keyid} keyid={keyid} row={row} />
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
