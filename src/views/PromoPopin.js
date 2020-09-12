import React, { Component } from 'react'
import ScreenModal from './ScreenModal'
import BusinessHttp from '../business/Http'

const home = BusinessHttp.fullyQualifiedName

class PromoPopin extends Component {
  constructor (props) {
    super(props)
    this._gotItCta = null
    this._closePopinCta = null

    console.log({ isVisible: props.isVisible })

    this.handleGotItClick = this.handleGotItClick.bind(this)
    this.handleClosePopinClick = this.handleClosePopinClick.bind(this)

    this.state = { isVisible: props.isVisible !== undefined ? props.isVisible : false }
  }

  handleGotItClick () {
    this.setState({ isVisible: false })

    window.location.href = 'search?q=potier'
  }

  handleClosePopinClick () {
    this.setState({ isVisible: false })
  }

  render () {
    if (!this.state.isVisible) {
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
