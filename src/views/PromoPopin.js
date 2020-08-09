import React, { Component } from 'react'
import ScreenModal from './ScreenModal'

class PromoPopin extends Component {
  componentDidMount () {
    const gotItCta = document.querySelector('#gotItCta')
    gotItCta.onclick = function () {
      PromoPopin.removePopin()
      window.location.href = 'search?q=potier'
    }

    const closePopinCta = document.querySelector('#closePopinCta')
    closePopinCta.onclick = function () {
      PromoPopin.removePopin()
    }
  }

  static removePopin () {
    const frameLayout = document.querySelector('.frame-layout')
    document.body.removeChild(frameLayout)
    const screenLayout = document.querySelector('#screen-layout')
    document.body.removeChild(screenLayout)

    PromoPopin.onRemovePopin()
  }

  static onRemovePopin (callback) {
    if (callback !== undefined) {
      this._onremovepopin = callback
      return
    }
    if (callback === undefined && typeof this._onremovepopin === 'function') {
      this._onremovepopin.call(null)
    }
  }

  render () {
    return (
      <ScreenModal>
        <div className='popin-box'>
          <div id='close'><a id='closePopinCta' href='#'>X</a></div>
          <div id='banner-message'>
            <p>
                  Merci d'avoir accepté les cookies !
            </p>
            <p>
                  Une offre exceptionnelle* vous attends sur la <strong>Collection&nbsp;Henri&nbsp;Potier</strong> !
            </p>

            <button id='gotItCta' className='popin-cta go'>J'en profite</button>

            <p style={{ 'font-size': 'smaller' }}>
                  * Offre non cumulable, dans la limite des stocks disponibles.
            </p>
          </div>

        </div>
      </ScreenModal>
    )
  }
}

export default PromoPopin
