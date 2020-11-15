
import React, { useContext, useEffect, useRef } from 'react'

// import HeaderAndFooter from '../headerAndFooter/HeaderAndFooter'
import WithHeaderFooter from '../headerAndFooter/WithHeaderFooter'

import HttpHelper from '../../helpers/HttpHelper'
import ArticleCardSet from './ArticleCardSet'
import { SearchContext } from './SearchContext'
import { SearchNavBarContext } from './SearchNavBarContext'

const SEARCH_FAILURE = "Pas de chance, nous n'avons trouvé aucun article avec ces critères !<br />Tentez une nouvelle recherche."
const SEARCH_SUCCESS = 'Nous avons trouvé %d articles correspondants à vos critères'
const SEARCH_SUCCESS_ONE = 'Nous avons trouvé 1 article correspondant à vos critères'
const SEARCH_STATE_ZERO = true

const home = HttpHelper.fullyQualifiedName()

const Search = props => {
  const searchStateTextboxRef = useRef()
  const searchStateAnchorRef = useRef()

  const { SearchState, setSearchState } = useContext(SearchContext)
  // const { SearchNavBarRef } = useContext(SearchNavBarContext)

  const effect = () => {
    const { query, results, dirty } = SearchState

    handleDisplayResultState(results)
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
    const { query, results, dirty } = SearchState

    console.log({ query: query, results: results, dirty: dirty })
    handleDisplayResultState(results, SEARCH_STATE_ZERO)

    e.preventDefault()
  }

  const handleDisplayResultState = (data, forceZero = false) => {
    const num = data.length

    if (num === 0 || forceZero) {
      searchStateTextboxRef.current.innerHTML = SEARCH_FAILURE
      searchStateAnchorRef.current.style.display = 'none'
      return
    }

    const html = (num > 1) ? `${SEARCH_SUCCESS}`.replace('%d', num) : SEARCH_SUCCESS_ONE
    searchStateTextboxRef.current.innerHTML = html
    searchStateAnchorRef.current.style.display = 'inline-block'
  }

  /**
   * Clear the search results
   */
  const clearSearch = () => {
    setSearchState({ results: [], dirty: true })
  }

  return (
    <main role='main' className='flex-shrink-0'>
      <section className='jumbotron text-center'>
        <div className='container'>
          <h1>Résultats de votre recherche</h1>
          <p id='resultState' className='lead text-muted' ref={searchStateTextboxRef} />
          <p>
            <a id='resetSearch' className='btn btn-secondary my-2' href={home} onClick={handleResetSearch} ref={searchStateAnchorRef}>Effacer ma recherche</a>
          </p>
        </div>
      </section>

      <div className='album py-5'>
        <div className='container'>
          <ArticleCardSet onDisplayResultState={handleDisplayResultState} />
        </div>
      </div>

    </main>
  )
}

export default WithHeaderFooter(Search)
