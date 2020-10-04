import React, { Component } from 'react'
import ScreenModal from '../modal/ScreenModal'
import BusinessHttp from '../../business/Http'

const home = BusinessHttp.fullyQualifiedName

class PromoPopin extends Component {
  constructor () {
    super()

    this.handleGotItClick = this.handleGotItClick.bind(this)
    this.handleClosePopinClick = this.handleClosePopinClick.bind(this)

    this.state = { isVisible: false }
  }

  handleGotItClick () {
    this.setState({ isVisible: false })

    window.location.href = 'search?q=potier'
  }

  handleClosePopinClick () {
    this.setState({ isVisible: false })
  }

  render () {
    const isVisible =  this.props.isVisible !== undefined ? this.props.isVisible : false 

    if (!isVisible) {
      return (
        ''
      )
    }
    return (
      <ScreenModal>
        <div className='popin-box'>
          <div id='close'>
            <a
              id='closePopinCta' href={home}
              onClick={this.handleClosePopinClick}
            >
              X
            </a>
          </div>
          <div id='banner-message'>
            <p>
                  Merci d'avoir accepté les cookies !
            </p>
            <p>
                  Une offre exceptionnelle* vous attends sur la <strong>Collection&nbsp;Henri&nbsp;Potier</strong> !
            </p>

            <button
              id='gotItCta' className='popin-cta go'
              onClick={this.handleGotItClick}
            >
              J'en profite
            </button>

            <p style={{ fontSize: 'smaller' }}>
                  * Offre non cumulable, dans la limite des stocks disponibles.
            </p>
          </div>

        </div>
      </ScreenModal>
    )
  }
}

export default PromoPopin
