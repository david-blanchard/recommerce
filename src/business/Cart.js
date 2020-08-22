import cookie from 'react-cookies'

const CART_ID = 'cpascher_cart'

class Cart {
  constructor () {
    this._resourceURL = ''
  }

  get resourceURL () {
    return this._resourceURL
  }

  /**
   *  Return the number of articles in the cart cookie, otherwise 0
   */
  static get count () {
    let result = 0

    const json = Cart.readCart()

    result = json !== undefined ? json.length : 0

    return result
  }

  /**
   * Computes the best discount price based on the total sum of a bunch of articles
   *
   * @param {float} total
   * @param {function} callback
   */
  computeDiscount (total, callback) {
    const isbnArray = []
    const cart = Cart.readCart()

    cart.forEach((article) => {
      isbnArray.push(article.isbn)
    })

    this._resourceURL =
      'http://henri-potier.xebia.fr/books/' +
      isbnArray.join(',') +
      '/commercialOffers'

    fetch(this._resourceURL)
      .then((response) => response.json())
      .then((data) => {
        if (data === undefined || data === '') {
          return
        }

        let discountSum = 0

        let totalPct = total
        let totalMinus = total
        let totalSlice = total

        data.offers.forEach((offer) => {
          if (offer.type === 'percentage') {
            totalPct = total * (1 - offer.value / 100)
          } else if (offer.type === 'minus') {
            totalMinus = total - offer.value
          } else if (offer.type === 'slice') {
            totalSlice =
              total > offer.sliceValue
                ? total - Math.floor(total / offer.sliceValue) * offer.value
                : total
          }
        })

        const minTotal = Math.min(totalPct, totalMinus, totalSlice)

        discountSum = (total - minTotal).toFixed(2)

        if (typeof callback === 'function') {
          // Trigger callback function on resource found
          callback.call(this, discountSum)
        }
      })
  }

  /**
   * Read the content of the cart cookie and return a ready-made JS object
   */
  static readCart () {
    const cart = cookie.load(CART_ID)

    return cart || []
  }

  /**
   * Add an article to the cart cookie by retrieving the data through the Button object
   *
   * @param {DOM ELement} parent
   */
  static addToCart (parent) {
    if (parent === undefined || parent === null) {
      return
    }

    const button = parent.target
    let json = decodeURIComponent(button.dataset.json)

    const article = JSON.parse(json)
    const articles = Cart.readCart()

    articles.push(article)
    json = JSON.stringify(articles)

    cookie.save(CART_ID, json, 1)

    Cart.printCount()
  }

  /**
   * Remove an article from the cart by its position in the cart
   *
   * @param {int} index
   */
  static removeFromCart (isbn) {

    const cart = Cart.readCart()

    let reducedCart = []
    reducedCart = cart.reduce((reduced, iteratee) => {
      if (iteratee.isbn !== isbn) {
        reduced.push(iteratee)
      }

      return reduced
    }, reducedCart)

    const json = JSON.stringify(reducedCart)

    cookie.save(CART_ID, json, 1)

    Cart.printCount()
  }

  /**
   * Display the number of articles in the cart on cart button
   */
  static printCount () {
    const cartSum = document.querySelector('#cartSum')
    if (cartSum !== undefined) {
      const count = Cart.count
      cartSum.innerHTML = count
    }
  }
}

export default Cart
