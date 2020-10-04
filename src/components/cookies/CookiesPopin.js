import React, { useState, Component } from 'react'
import cookie from 'react-cookies'
import ScreenModal from '../modal/ScreenModal'

const ACCEPT_COOKIES = 'acceptCookies'

class CookiesPopin extends Component {
  constructor () {
    super()

    this.handleAcceptClick = this.handleAcceptClick.bind(this)
    this.handleRefuseClick = this.handleRefuseClick.bind(this)
    this.handleRefuseMouseOver = this.handleRefuseMouseOver.bind(this)
    this.handleRefuseMouseOut = this.handleRefuseMouseOut.bind(this)
    
    this.state = { cookiesAccepted: false }
  }

  handleAcceptClick () {
    cookie.save(ACCEPT_COOKIES, '1', 365)
    this.props.onCallToAction(true)
  }

  handleRefuseClick () {
    cookie.save(ACCEPT_COOKIES, '0', 365)
    this.props.onCallToAction(true)
  }

  handleRefuseMouseOver () {
    this._acceptCta.className = 'popin-cta cancel'
    this._acceptCta.innerHTML = 'Paramétrer'
    this._refuseCta.className = 'popin-cta'
    this._refuseCta.innerHTML = 'Accepter tout'
  }

  handleRefuseMouseOut () {
    this._acceptCta.className = 'popin-cta'
    this._acceptCta.innerHTML = 'Accepter tout'
    this._refuseCta.className = 'popin-cta cancel'
    this._refuseCta.innerHTML = 'Paramétrer'
  }

  render () {

    if (cookie.load(ACCEPT_COOKIES) !== undefined) {
      // Choice already set, don't ask again
      // this.setState({ cookiesAccepted: true })
      return false
    }

    return (
      <ScreenModal>
        <div className='popin-box'>
          <div id='banner-message'>
            <p>
              Nous utilisons les cookies pour avoir<br /> un retour de votre expérience sur notre site.
            </p>
            <p>
              Acceptez-vous la collecte de vos données personnelles ?
            </p>
            <button
              id='acceptCookiesCta' className='popin-cta' ref={r => (this._acceptCta = r)}
              onClick={this.handleAcceptClick}
            >
              Accepter tout
            </button>
            &nbsp;
            &nbsp;
            &nbsp;
            <button
              id='refuseCookiesCta' className='popin-cta cancel' ref={r => (this._refuseCta = r)}
              onClick={this.handleRefuseClick}
              onMouseOver={this.handleRefuseMouseOver}
              onMouseOut={this.handleRefuseMouseOut}
            >
              Paramétrer
            </button>
          </div>
        </div>
      </ScreenModal>
    )
  }
}

export default CookiesPopin
