import React, { Component } from 'react'
import BusinessCookies from '../business/Cookies'
import ScreenModal from './ScreenModal'

class CookiesPopin extends Component {
  constructor (props) {
    super(props)

    this.state = { cookiesAccepted: false }
  }

  componentDidMount () {
    const acceptCta = document.querySelector('#acceptCookiesCta')
    // if (this.state.cookiesAccepted) return
    if (BusinessCookies.read('acceptCookies') !== '') {
      return
    }

    acceptCta.onclick = function () {
      CookiesPopin.removePopin()
      BusinessCookies.write('acceptCookies', '1', 365)
    }
    const refuseCta = document.querySelector('#refuseCookiesCta')
    refuseCta.onclick = function (e) {
      console.log(e)
      CookiesPopin.removePopin()
      // Cookies.write('acceptCookies', '0', 365)
    }
    refuseCta.onmouseover = function () {
      acceptCta.className = 'popin-cta cancel'
      acceptCta.innerHTML = 'Refuser'
      refuseCta.className = 'popin-cta'
      refuseCta.innerHTML = 'Accepter'
    }
    refuseCta.onmouseout = function () {
      acceptCta.className = 'popin-cta'
      acceptCta.innerHTML = 'Accepter'
      refuseCta.className = 'popin-cta cancel'
      refuseCta.innerHTML = 'Refuser'
    }
  }

  static removePopin () {
    // const frameLayout = document.querySelector('.frame-layout')
    // const screenLayout = document.querySelector('#screen-layout')
    // screenLayout.removeChild(frameLayout)
    // document.querySelector('#root').removeChild(screenLayout)

    CookiesPopin.onRemovePopin()
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
    if (!this.state.cookiesAccepted) {
      if (BusinessCookies.read('acceptCookies') !== '') {
      // Choice already set, don't ask again
        // this.setState({ cookiesAccepted: true })
        return ''
      }
    }

    return (
      <ScreenModal>
        <div className='popin-box'>
          <div id='banner-message'>
            <p>
              Nous souhaiterions avoir un retour de votre expérience sur notre site.
            </p>
            <p>
              Acceptez-vous les cookies ?
            </p>
            <button id='acceptCookiesCta' className='popin-cta'>Accepter</button>
            <button id='refuseCookiesCta' className='popin-cta cancel'>Refuser</button>
          </div>
        </div>
      </ScreenModal>
    )
  }
}

export default CookiesPopin
