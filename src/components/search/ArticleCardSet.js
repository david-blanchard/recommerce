
import React, { useContext, useEffect } from 'react'
import uuid from 'react-uuid'

import ArticleCard from './ArticleCard'
import { SearchContext } from './SearchContext'
import useSearchService from "../../services/SearchService";

const CRITERION = 'title'

const ArticleCardSet = props => {
  const { SearchState, setSearchState } = useContext(SearchContext)

  const searchService = useSearchService()
  const resourceURL = 'http://henri-potier.xebia.fr/books'

  const effect = () => {
    const { query, results, dirty } = SearchState

    const q = (results.length === 0 && !dirty) ? searchService.parseQuery() : query

    // Get the criterion value from the query string and launch the search
    searchService.fetchResource(resourceURL, (data) => {
      const resultSet = searchService.parseResults(q, data, CRITERION)

      setSearchState({
        results: resultSet,
        dirty: true
      })

      props.onDisplayResultState(resultSet)
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
