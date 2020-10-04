import React, { Component } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

class SearchNavBar extends Component {
  constructor () {
    super()

    this.handleSubmitSearchClick = this.handleSubmitSearchClick.bind(this)
    this._searchInput = null
  }

  handleSubmitSearchClick (e) {
    const value = e.target.value
    this.props.onSubmitSearch(value)
  }

  render () {
    return (
      <form className='form-inline my-2 my-lg-0' action='search'>
        <input
          id='search' name='q' className='form-control mr-sm-2' type='text'
          placeholder='Lancez-vous' aria-label='Search'
          ref={(r) => { this._searchInput = r }}
        />
        <button
          id='submitSearchCta'
          className='btn btn-outline-success my-2 my-sm-0'
          onClick={this.handleSubmitSearchClick}
        >
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </form>
    )
  }
}

export default SearchNavBar
