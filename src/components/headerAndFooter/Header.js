import React from 'react'
import '../../css/carousel.css'
import 'bootstrap/dist/css/bootstrap.css'
import { } from 'bootstrap'
import logo from '../../assets/images/logos/Cpascher_logo_small.png'
import HttpHelper from '../../helpers/HttpHelper'

import CartNavButton from '../cart/CartNavButton'
import SearchNavBar from '../search/SearchNavBar'

const home = HttpHelper.fullyQualifiedName()

const CpcHeader = props => {
  const handleSubmitSearch = (value) => {
    if (props.onSubmitSearch !== undefined) {
      props.onSubmitSearch(value)
    }
  }

  return (
    <header>
      <nav className='navbar navbar-expand-md fixed-top navbar-light bg-white shadow-sm'>
        <div className='container-fluid'>
          <a className='navbar-brand' href={home}>
            <img src={logo} alt='Cpascher' />
          </a>

          <button className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbarsExampleDefault' aria-controls='navbarsExampleDefault' aria-expanded='false' aria-label='Toggle navigation'>
            <span className='navbar-toggler-icon' />
          </button>

          <div className='collapse navbar-collapse' id='navbarsExampleDefault'>
            <ul className='navbar-nav me-auto mb-2 mb-md-0'>
              <li className='nav-item'>
                <a className='nav-link active text-dark' aria-current='page' href={home}>Tous nos rayons</a>
              </li>
              <li className='nav-item'>
                <a className='nav-link text-dark' href={home}>Promos de l'été</a>
              </li>
              <li className='nav-item dropdown'>
                <a className='nav-link text-dark dropdown-toggle' href='#' id='dropdown01' data-bs-toggle='dropdown' aria-expanded='false'>Mon compte</a>
                <ul className='dropdown-menu' aria-labelledby='dropdown01'>
                  <li><a className='dropdown-item' href={home}>Pas encore inscrit ?</a></li>
                  <li><a className='dropdown-item' href={home}>F.A.Q</a></li>
                  <li><a className='dropdown-item' href={home}>Mentions légales</a></li>
                </ul>
              </li>
            </ul>
            <SearchNavBar onSubmitSearch={handleSubmitSearch} />
            <CartNavButton />
          </div>
        </div>
      </nav>

      <div className='nav-scroller bg-light shadow-sm'>
        <nav className='nav nav-underline'>
          <a className='nav-link disabled' href={home} tabIndex='-1' aria-disabled='true'>
            <span className='badge rounded-pill bg-light text-dark'>Nos partenaires</span>
          </a>
          <a className='nav-link' href={home}>Voyages.pascher</a>
          <a className='nav-link' href={home}>Locations.pascher</a>
          <a className='nav-link' href={home}>Voitures.pascher</a>
        </nav>
      </div>
    </header>
  )
}

export default CpcHeader