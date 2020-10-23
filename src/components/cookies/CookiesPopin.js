import React from 'react'
import cookie from 'react-cookies'
import ScreenModal from '../modal/ScreenModal'

const ACCEPT_COOKIES = 'acceptCookies'

const CookiesPopin = props => {
  let acceptCta = null
  let refuseCta = null

  const handleAcceptClick = () => {
    cookie.save(ACCEPT_COOKIES, '1', 365)
    props.onCallToAction(true)
  }

  const handleRefuseClick = () => {
    cookie.save(ACCEPT_COOKIES, '0', 365)
    props.onCallToAction(true)
  }

  const handleRefuseMouseOver = () => {
    acceptCta.className = 'popin-cta cancel'
    acceptCta.innerHTML = 'Paramétrer'
    refuseCta.className = 'popin-cta'
    refuseCta.innerHTML = 'Accepter tout'
  }

  const handleRefuseMouseOut = () => {
    acceptCta.className = 'popin-cta'
    acceptCta.innerHTML = 'Accepter tout'
    refuseCta.className = 'popin-cta cancel'
    refuseCta.innerHTML = 'Paramétrer'
  }

  return (
  // If choice is already set, don't ask again
    (cookie.load(ACCEPT_COOKIES) === undefined) &&
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
              id='acceptCookiesCta' className='popin-cta' ref={r => (acceptCta = r)}
              onClick={handleAcceptClick}
            >
              Accepter tout
            </button>
            &nbsp;
            &nbsp;
            &nbsp;
            <button
              id='refuseCookiesCta' className='popin-cta cancel' ref={r => (refuseCta = r)}
              onClick={handleRefuseClick}
              onMouseOver={handleRefuseMouseOver}
              onMouseOut={handleRefuseMouseOut}
            >
              Paramétrer
            </button>
          </div>
        </div>
      </ScreenModal>
  )
}

export default CookiesPopin
