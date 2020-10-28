
import React, { useContext, useEffect } from 'react'
import uuid from 'react-uuid'

import SearchHelper from '../../helpers/SearchHelper'
import ArticleCard from './ArticleCard'
import { SearchContext } from './SearchContext'

const CRITERION = 'title'

const ArticleCardSet = props => {
  const { SearchState, setSearchState } = useContext(SearchContext)

  const resourceURL = 'http://henri-potier.xebia.fr/books'

  const effect = () => {
    const { query, results, dirty } = SearchState

    const q = (results.length === 0 && !dirty) ? SearchHelper.parseQuery() : query

    // Get the criterion value from the query string and launch the search
    SearchHelper.fetchResource(resourceURL, (data) => {
      const resultSet = SearchHelper.parseResults(q, data, CRITERION)

      setSearchState({
        results: resultSet,
        dirty: true
      })

      props.onDisplaySearchState(resultSet)
    })
  }

  useEffect(() => {
    effect()
  }, [])

  return (
    <div id='lostAndFound' className='row'>
      {
        (SearchState.results !== undefined && SearchState.results.length > 0) && SearchState.results.map((row, i) => {
          const keyid = uuid()
          return (
            <div key={i} className='col-md-4'>
              <ArticleCard key={keyid} keyid={keyid} row={row} />
            </div>
          )
        })
      }
    </div>
  )
}

export default ArticleCardSet
