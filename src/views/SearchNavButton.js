import React, { Component } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

import BusinessCart from '../business/Cart'

class SearchNavButton extends Component {
  componentDidMount () {}

  render () {
    return (
      <button
        id='submitSearchCta'
        className='btn btn-outline-success my-2 my-sm-0'
      >
        <FontAwesomeIcon icon={faSearch} />
      </button>
    )
  }
}

export default SearchNavButton
