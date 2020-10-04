import React, { Component } from 'react'
import '../../css/index.css'

import plageTropique from '../../assets/images/teasers/voyages.png'
import salonJardin from '../../assets/images/teasers/chaises_jardin.png'
import librairie from '../../assets/images/teasers/librairie.png'
import article1 from '../../assets/images/articles/disque-a-lancer.jpg'
import article2 from '../../assets/images/articles//robot-nettoyeur-wifi.jpg'
import article3 from '../../assets/images/articles/platine-vinyle.jpg'

import BusinessHttp from '../../business/Http'
import WithHeaderFooter from '../headerAndFooter/WithHeaderFooter'
// import HeaderFooter from './HeaderFooter'

const home = BusinessHttp.fullyQualifiedName()

class Home extends Component {
  render () {
    return (
      <main role='main'>
        <div id='myCarousel' className='carousel slide' data-ride='carousel'>
          <ol className='carousel-indicators'>
            <li data-target='#myCarousel' data-slide-to='0' className='active' />
            <li data-target='#myCarousel' data-slide-to='1' />
            <li data-target='#myCarousel' data-slide-to='2' />
          </ol>
          <div className='carousel-inner'>
            <div className='carousel-item active'>
              <svg
                className='bd-placeholder-img' width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'
                preserveAspectRatio='xMidYMid slice' focusable='false' role='img'
              >
                <rect width='100%' height='100%' fill='#077' />
              </svg>
              <img
                className='image-middle' width='1200px' src={plageTropique} alt=''
              />
              <div className='container'>
                <div className='carousel-caption text-left'>
                  <h1>Envie de vous évader ?</h1>
                  <p>
                      Partez en bord de mer grâce aux offres exclusives de notre partenaire Voyages.pascher.
                  </p>
                  <p>
                    <button className='btn btn-lg btn-primary' href={home}>J'y vais</button>
                  </p>
                </div>
              </div>
            </div>
            <div className='carousel-item'>
              <svg
                className='bd-placeholder-img' width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'
                preserveAspectRatio='xMidYMid slice' focusable='false' role='img'
              >
                <rect width='100%' height='100%' fill='#770' />
              </svg>
              <img className='image-middle' width='1200px' role='img' src={salonJardin} alt='' />
              <div className='container'>
                <div className='carousel-caption'>
                  <h1>Profitez de l'été dans votre jardin</h1>
                  <p>
                      Cras justo odio, dapibus ac facilisis in, egestas eget quam.
                      Donec id elit non mi porta gravida at eget metus. Nullam id
                      dolor id nibh ultricies vehicula ut id elit.
                  </p>
                  <p>
                    <button className='btn btn-lg btn-primary' href={home}>En savoir plus</button>
                  </p>
                </div>
              </div>
            </div>
            <div className='carousel-item'>
              <svg
                className='bd-placeholder-img' width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'
                preserveAspectRatio='xMidYMid slice' focusable='false' role='img'
              >
                <rect width='100%' height='100%' fill='#707' />
              </svg>
              <img className='image-middle' width='1200px' src={librairie} alt='' />
              <div className='container'>
                <div className='carousel-caption text-right'>
                  <div className='bg-dark p-1'>
                    <h1>Promo sur la collection Henri Potier</h1>
                    <p>
                        Il vous manque un bout des aventures d'Henri Potier ? Ne
                        restez plus collé grâce la collection complète à prix réduit
                        !
                    </p>
                  </div>
                  <p>
                    <a className='btn btn-lg btn-primary' href='search?q=potier' role='button'>J'en profite</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <a className='carousel-control-prev' href='#myCarousel' role='button' data-slide='prev'>
            <span className='carousel-control-prev-icon' aria-hidden='true' />
            <span className='sr-only'>Previous</span>
          </a>
          <a className='carousel-control-next' href='#myCarousel' role='button' data-slide='next'>
            <span className='carousel-control-next-icon' aria-hidden='true' />
            <span className='sr-only'>Next</span>
          </a>
        </div>

        {/* <!-- Marketing messaging and featurettes
  ================================================== -->
    <!-- Wrap the rest of the page in another container to center all the content. --> */}

        <div className='container marketing'>
          <div className='pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center'>
            <h1 className='display-4'>Partez avec Voyages.pascher</h1>
          </div>

          <div className='card-deck mb-3 text-center'>
            <div className='card mb-4 shadow-sm'>
              <div className='card-header'>
                <h4 className='my-0 font-weight-normal'>Eux</h4>
              </div>
              <div className='card-body'>
                <h1 className='card-title pricing-card-title'>
                    40 € <small className='text-muted'>/ j</small>
                </h1>
                <ul className='list-unstyled mt-3 mb-4'>
                  <li>2 personnes</li>
                  <li>Petit déjeuner inclus</li>
                  <li>Wifi disponible</li>
                  <li>Proche piscine municipale</li>
                </ul>
                <button type='button' className='btn btn-lg btn-block btn-outline-primary'>
                    Je réserve
                </button>
              </div>
            </div>
            <div className='card mb-4 shadow-sm'>
              <div className='card-header'>
                <h4 className='my-0 font-weight-normal'>Saint-Aubin sur mer</h4>
              </div>
              <div className='card-body'>
                <h1 className='card-title pricing-card-title'>
                    79 € <small className='text-muted'>/ j</small>
                </h1>
                <ul className='list-unstyled mt-3 mb-4'>
                  <li>1 personne</li>
                  <li>Petit déjeuner non-inclus</li>
                  <li>Wifi non disponible</li>
                  <li>Proche centre-ville</li>
                </ul>
                <button type='button' className='btn btn-lg btn-block btn-primary'>
                    Je réserve
                </button>
              </div>
            </div>
            <div className='card mb-4 shadow-sm'>
              <div className='card-header'>
                <h4 className='my-0 font-weight-normal'>Saint Lô</h4>
              </div>
              <div className='card-body'>
                <h1 className='card-title pricing-card-title'>
                    129 €<small className='text-muted'>/ j</small>
                </h1>
                <ul className='list-unstyled mt-3 mb-4'>
                  <li>4 personnes</li>
                  <li>Tout compris</li>
                  <li>Service inclus</li>
                  <li>Proche hôpital ...</li>
                </ul>
                <button type='button' className='btn btn-lg btn-block btn-primary'>
                    Nous contacter
                </button>
              </div>
            </div>
          </div>

          {/* <!-- START THE FEATURETTES --> */}

          <hr className='featurette-divider' />

          <div className='row featurette'>
            <div className='col-md-7'>
              <h2 className='featurette-heading'>
                  Disque à lancer en caoutchouc <span className='text-muted'>densifié 1KG </span> avec rond central en vert
              </h2>
              <p className='lead'>
                  Pour l'initiation au lancer du disque. En caoutchouc densifié. Coloris (rond central) : Vert
              </p>
              <div className='badge-pill'>6.90 €</div>
            </div>
            <div className='col-md-5'>
              <img
                src={article1} alt='Disque à lancer'
                className='bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto' width='500' height='500'
                preserveAspectRatio='xMidYMid slice' focusable='false' aria-label='Disque à lancer'
              />
            </div>
          </div>

          <hr className='featurette-divider' />

          <div className='row featurette'>
            <div className='col-md-7 order-md-2'>
              <h2 className='featurette-heading'>
                  Aspirateur Robot Nettoyeur<span className='text-muted'> avec App Wifi</span>, navigation
            cartographique, aspiration 4KPA, réservoir d’eau électrique, mémoire
              </h2>
              <div className='lead'>
                <label htmlFor='points-forts'>Les points forts :</label>
                <ul id='points-forts'>
                  <li>Collecte des poussières : sans sac</li>
                  <li>Mode de nettoyage : humide et sec</li>
                  <li>Capacité du collecteur : 0.6L</li>
                  <li>Type de filtre : filtre HEPA </li>
                </ul>
              </div>
              <div className='badge-pill'>189 €</div>

            </div>
            <div className='col-md-5 order-md-1'>
              <img
                src={article2} alt='Disque à lancer'
                className='bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto' width='500' height='500'
                preserveAspectRatio='xMidYMid slice' focusable='false' aria-label='Disque à lancer'
              />
            </div>
          </div>

          <hr className='featurette-divider' />

          <div className='row featurette'>
            <div className='col-md-7'>
              <h2 className='featurette-heading'>
                  Platine vinyle avec haut-parleurs stéreo intégrés & couvercle - <span className='text-muted'>Tourne-disque 2 vitesses 33T 45T</span> - Sorties casque et RCA
              </h2>
              <p className='lead'>
                  Platine vinyle compacte avec entraînement à courroie, haut-parleurs intégrés et fonction start/stop
                  auto. Sortie casque jack 3,5mm. Avec système de prise de son et capot de protection. C'est une platine vinyle
                  HiFi compacte. Elle peut lire à toutes les vitesses standard.
              </p>

              <label htmlFor='points-forts'>Les points faibles :</label>
              <ul id='points-forts'>
                <li>N'est pas compatible avec le disque à lancer</li>
              </ul>
              <div className='badge-pill'>49 €</div>

            </div>
            <div className='col-md-5'>
              <img
                src={article3} alt='Disque à lancer'
                className='bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto' width='500' height='500'
                preserveAspectRatio='xMidYMid slice' focusable='false' aria-label='Disque à lancer'
              />

            </div>
          </div>

          <hr className='featurette-divider' />

          {/* <!-- /END THE FEATURETTES --> */}

          {/* <!-- Three columns of text below the carousel --> */}
          <div className='row'>
            <div className='col-lg-4'>
              <svg
                width='140'
                height='140' xmlns='http://www.w3.org/2000/svg'
                className='bd-placeholder-img rounded-circle'
                preserveAspectRatio='xMidYMid slice' focusable='false' role='img' aria-label='Placeholder: 140x140'
              >
                <title>Placeholder</title>
                <rect width='100%' height='100%' fill='#777' />
                <text x='50%' y='50%' fill='#777' dy='.3em'>140x140</text>
              </svg>
              <p>
                  Garantie 100% satisfait <br /> ou remboursé
              </p>
            </div>
            {/* <!-- /.col-lg-4 --> */}
            <div className='col-lg-4'>
              <svg
                width='140'
                height='140'
                className='bd-placeholder-img rounded-circle' xmlns='http://www.w3.org/2000/svg'
                preserveAspectRatio='xMidYMid slice' focusable='false' role='img' aria-label='Placeholder: 140x140'
              >
                <title>Placeholder</title>
                <rect width='100%' height='100%' fill='#777' />
                <text x='50%' y='50%' fill='#777' dy='.3em'>140x140</text>
              </svg>
              <p>
                  Sécurité des paiements
              </p>
            </div>
            {/* <!-- /.col-lg-4 --> */}
            <div className='col-lg-4'>
              <svg
                width='140' height='140' className='bd-placeholder-img rounded-circle' xmlns='http://www.w3.org/2000/svg'
                preserveAspectRatio='xMidYMid slice' focusable='false' role='img' aria-label='Placeholder: 140x140'
              >
                <title>Placeholder</title>
                <rect width='100%' height='100%' fill='#777' />
                <text x='50%' y='50%' fill='#777' dy='.3em'>140x140</text>
              </svg>
              <p>
                  Confidentialité<br />des données personnelles
              </p>
            </div>
            {/* <!-- /.col-lg-4 --> */}
          </div>
          {/* <!-- /.row --> */}
        </div>
        {/* <!-- /.container --> */}
      </main>
    )
  }
}

export default WithHeaderFooter(Home)
