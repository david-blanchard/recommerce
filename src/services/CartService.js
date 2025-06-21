import cookie from 'react-cookies'
import uuid from 'react-uuid'

const CART_ID = 'cpascher_cart'

class CartService {
  constructor () {
    this._resourceURL = ''
  }

  get resourceURL () {
    return this._resourceURL
  }

  /**
   *  Return the number of articles in the cart cookie, otherwise 0
   */
  get count () {
    let result = 0

    const json = this.readCart()
    result = json !== undefined ? json.length : 0

    return result
  }

  /**
   * Get the ISBN codes from the books set in the cart
   */
  get isbnCodes () {
    const isbnArray = []

    const cart = this.readCart()

    cart.forEach((article) => {
      isbnArray.push(article.isbn)
    })

    return isbnArray
  }

  /**
   * Read the content of the cart cookie and return a ready-made JS object
   */
  readCart () {
    const cart = cookie.load(CART_ID)

    return cart || []
  }

  /**
   * Add an article to the cart cookie by retrieving the data through the Button object
   *
   * @param cardData
   */
  addToCart (cardData) {

    const article = cardData
    article.keyid = uuid()
    const articles = this.readCart()

    articles.push(article)
    const json = JSON.stringify(articles)

    cookie.save(CART_ID, json, 1)
  }

  /**
   * Remove an article from the cart by its keyID
   *
   * @param {string} keyid
   */
  removeFromCart (keyid) {
    const cart = this.readCart()

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
  printCount (ref) {
    if (ref !== undefined) {
      ref.innerHTML = this.count
    }
  }
}

export default function useCartService () {
  return new CartService()
}
