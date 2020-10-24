import React, { useState } from 'react'
import ScreenModal from '../modal/ScreenModal'
import HttpHelper from '../../helpers/HttpHelper'

const home = HttpHelper.fullyQualifiedName()

const PromoPopin = props => {
  const [state, setState] = useState({ isVisible: props.isVisible !== undefined ? props.isVisible : false })

  const handleGotItClick = () => {
    setState({ isVisible: false })

    window.location.href = 'search?q=potier'
  }

  const handleClosePopinClick = () => {
    setState({ isVisible: false })
  }

  return (
    (state.isVisible !== undefined ? state.isVisible : false) &&
      <ScreenModal>
        <div className='popin-box'>
          <div id='close'>
            <a
              id='closePopinCta' href={home}
              onClick={handleClosePopinClick}
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
              onClick={handleGotItClick}
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

export default PromoPopin
