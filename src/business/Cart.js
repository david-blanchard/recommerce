import cookie from 'react-cookies'
import uuid from 'react-uuid'

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
   * Get the ISBN codes from the books set in the cart
   */
  static get isbnCodes () {
    const isbnArray = []

    const cart = Cart.readCart()

    cart.forEach((article) => {
      isbnArray.push(article.isbn)
    })

    return isbnArray
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
   * @param {DOM event} event
   */
  static addToCart (cardData) {

    const article = cardData
    article.keyid = uuid()
    const articles = Cart.readCart()

    articles.push(article)
    const json = JSON.stringify(articles)

    cookie.save(CART_ID, json, 1)
  }

  /**
   * Remove an article from the cart by its keyID
   *
   * @param {string} keyid
   */
  static removeFromCart (keyid) {
    const cart = Cart.readCart()

    let reducedCart = []
    reducedCart = cart.reduce((reduced, iteratee) => {
      if (iteratee.keyid !== keyid) {
        reduced.push(iteratee)
      }

      return reduced
    }, reducedCart)

    const json = JSON.stringify(reducedCart)

    cookie.save(CART_ID, json, 1)
  }

  /**
   * Display the number of articles in the cart on cart button
   */
  static printCount (ref) {
    if (ref !== undefined) {
      const count = Cart.count
      ref.innerHTML = count
    }
  }
}

export default Cart
