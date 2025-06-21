import React, {useContext, useEffect, useRef} from 'react'
import WithHeaderFooter from '../headerAndFooter/WithHeaderFooter'
import HttpHelper from '../../helpers/HttpHelper'
import ArticleCardSet from './ArticleCardSet'
import {SearchContext} from './SearchContext'

const SEARCH_FAILURE = "Pas de chance, nous n'avons trouvé aucun article avec ces critères !<br />Tentez une nouvelle recherche."
const SEARCH_SUCCESS = 'Nous avons trouvé %d articles correspondants à vos critères'
const SEARCH_SUCCESS_ONE = 'Nous avons trouvé 1 article correspondant à vos critères'
const SEARCH_STATE_ZERO = true

const home = HttpHelper.fullyQualifiedName()

const Search = props => {
  const searchStateTextboxRef = useRef()
  const searchStateAnchorRef = useRef()

  const { SearchState, setSearchState } = useContext(SearchContext)

  const effect = () => {
    const { results } = SearchState
    handleDisplayResultState(results)
  }

  useEffect(() => {
    effect()
  }, [])

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

    searchStateTextboxRef.current.innerHTML = (num > 1) ? `${SEARCH_SUCCESS}`.replace('%d', num) : SEARCH_SUCCESS_ONE
    searchStateAnchorRef.current.style.display = 'inline-block'
  }

  const clearSearch = () => {
    setSearchState({ results: [], dirty: true })
  }

  return (
    <main className='flex-shrink-0'>
      <div className='py-5 text-center bg-light mb-4'>
        <div className='container'>
          <h1 className='display-5 fw-bold'>Résultats de votre recherche</h1>
          <p 
            id='resultState' 
            className='lead text-secondary'
            ref={searchStateTextboxRef}
          />
          <p>
            <a
              id='resetSearch'
              className='btn btn-secondary'
              href={home}
              onClick={handleResetSearch}
              ref={searchStateAnchorRef}
            >
              Effacer ma recherche
            </a>
          </p>
        </div>
      </div>

      <div className='py-5 bg-body'>
        <div className='container'>
          <ArticleCardSet onDisplayResultState={handleDisplayResultState} />
        </div>
      </div>
    </main>
  )
}

export default WithHeaderFooter(Search)