import React, { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { SearchNavBarContext } from './SearchNavBarContext'

const SearchNavBar = props => {
  const { searchInputRef } = useContext(SearchNavBarContext)

  const handleSubmitSearchClick = (e) => {
    const value = e.target.value
    props.onSubmitSearch(value)
  }

  return (
    <form className='form-inline d-flex' action='search'>
      <input
        id='search'
        name='q'
        className='form-control me-2'
        type='text'
        placeholder='Lancez-vous'
        aria-label='Search'
        ref={searchInputRef}
      />
      <button
        id='submitSearchCta'
        className='btn btn-outline-success'
        onClick={handleSubmitSearchClick}
      >
        <FontAwesomeIcon icon={faSearch} />
      </button>
    </form>
  )
}

export default SearchNavBar