import Cart from './Cart'

class CartChecker {
  constructor () {
    this._resourceURL = ''
  }

  get resourceURL () {
    return this._resourceURL
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

    cart.forEach((element) => {
      isbnArray.push(element.isbn)
    })

    this._resourceURL =
      'http://henri-potier.xebia.fr/books/' +
      isbnArray.join(',') +
      '/commercialOffers'

    fetch (this._resourceURL)
      .then((response) => response.json())
      .then((data) => {
        if (data === undefined || data === '') {
          return
        }

        let discountSum = 0

        let totalPct = total
        let totalMinus = total
        let totalSlice = total

        data.offers.forEach((element) => {
          if (element.type === 'percentage') {
            totalPct = total * (1 - element.value / 100)
          } else if (element.type === 'minus') {
            totalMinus = total - element.value
          } else if (element.type === 'slice') {
            totalSlice =
              total > element.sliceValue
                ? total - Math.floor(total / element.sliceValue) * element.value
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
   * Bind the cart content
   */
  displayCart () {
    const cart = Cart.readCart()
    let total = 0
    let html = ''
    let i = 1

    cart.forEach((element) => {
      // Add an article to the cart
      html = this.makeArticleLine(element, i)
      total += parseFloat(element.price)

      this.appendHTML(html)
      i++
    })

    total = parseFloat(total).toFixed(2)

    // Add the sub-total to the cart
    html = this.makeSubTotalLine(total)
    this.appendHTML(html)

    // Computes the discount sum
    this.computeDiscount(total, function (discountSum) {
      discountSum = parseFloat(discountSum).toFixed(2)

      // Add the discount sum line to the cart
      html = this.makeDiscountLine(discountSum)
      this.appendHTML(html)

      total -= discountSum
      total = parseFloat(total).toFixed(2)

      // Add the total line to the cart
      html = this.makeTotalLine(total)
      this.appendHTML(html)
    })
  }

  // Append a line to the cart table
  appendHTML (html) {
    const tableLines = document.querySelector('#table-lines')

    let text = tableLines.innerHTML
    text += html

    tableLines.innerHTML = text
  }

  // Remove all lines of the cart table
  static clearLines () {
    const tableLines = document.querySelector('#table-lines')
    tableLines.innerHTML = ''
  }

  makeArticleLine (json, index) {
    const cover = json.cover
    const price = parseFloat(json.price).toFixed(2)
    const title = json.title
    // const isbn = json.isbn

    const html = `
        <tr>
            <td><img src="${cover}" width="40" height="60"/> </td>
            <td>${title}</td>
            <td>En stock</td>
            <td><input class="form-control" type="text" value="1" /></td>
            <td class="text-right">${price} €</td>
            <td class="text-right">
                <a href="#" data-index="${index}" class="remove-from-cart-cta btn btn-sm btn-danger">
                    <i data-index="${index}" class="fa fa-trash"></i> 
                </a>
            </td>
        </tr>
        `

    return html
  }

  makeSubTotalLine (sum) {
    const html = `
        <tr>
            <td></td>
            <td></td>
            <td></td>
            <td>Sous-total</td>
            <td class="text-right">${sum} €</td>
            <td></td>
        </tr>
        `

    return html
  }

  makeDiscountLine (discountSum) {
    const html = `
        <tr>
            <td></td>
            <td></td>
            <td></td>
            <td>Meilleure remise</td>
            <td class="text-right">${discountSum} €</td>
            <td></td>
        </tr>
        `
    return html
  }

  makeTotalLine (total) {
    const html = `
        <tr>
            <td></td>
            <td></td>
            <td></td>
            <td><strong>Total TTC</strong></td>
            <td class="text-right"><strong>${total} €</strong></td>
            <td></td>
        </tr>
        `
    return html
  }

  /**
   * Remove an article from the cart by using the Button data sent on click event
   *
   * @param {DOM element} parent
   */
  static removeFromCart (parent) {
    if (parent === undefined || parent === null) {
      return
    }

    const button = parent.target
    const index = parseInt(button.dataset.index) - 1

    Cart.removeFromCart(index)

    CartChecker.clearLines()

    const checker = new CartChecker()

    checker.displayCart()

    const handle = setTimeout(function () {
      checker.attachEvents()
      clearTimeout(handle)
    }, 1000)
  }

  // Bind the click event on every trash icon
  attachEvents () {
    document.querySelectorAll('.remove-from-cart-cta').forEach((item) => {
      item.onclick = function (e) {
        console.log(e.target)
        CartChecker.removeFromCart(e)
      }
    })
  }

  static bootstrap () {
    Cart.printCount()

    const checker = new CartChecker()

    checker.displayCart()

    const handle = setTimeout(function () {
      checker.attachEvents()
      clearTimeout(handle)
    }, 500)
  }
}

export default CartChecker
