import BusinessCart from '../business/Cart'
import fetch from 'node-fetch'

function notest (label, callback) {
  if (typeof callback === 'function') {
    callback.call(this, label)
  }
}

function noexpect (expression) {
  class F {
    constructor (expression) {
      this.expression = expression
    }

    toBe (expected) {
      console.log({ expected: expected })
      console.log({ recieved: this.expression })

      console.log({ assertion: this.expression === expected })
    }
  }

  return new F(expression)
}

notest('if Cpascher can be found in the home page', async (label) => {
  try {
    const response = await fetch('http://localhost:3000')
    const data = await response.text()
    const result = response.ok ? data : Promise.reject(data)
    console.log(label)

    noexpect(/Cpascher/i.test(result)).toBe(true)
  } catch (e) {
    throw new Error(e.message)
  }
})

const testSet = {
  tests: [
    {
      subtotal: 29,
      books: [
        '78ee5f25-b84f-45f7-bf33-6c7b30f1b502'
      ],
      offer: { type: 'percentage', expected: 1.16 }
    },
    {
      subtotal: 64,
      books: [
        'fcd1e6fa-a63f-4f75-9da4-b560020b6acc',
        '78ee5f25-b84f-45f7-bf33-6c7b30f1b502'
      ],
      offer: { type: 'minus', expected: 15 }
    },
    {
      subtotal: 154,
      books: [
        'c30968db-cb1d-442e-ad0f-80e37c077f89',
        'cef179f2-7cbc-41d6-94ca-ecd23d9f7fd6',
        'fcd1e6fa-a63f-4f75-9da4-b560020b6acc',
        'a460afed-e5e7-4e39-a39d-c885c05db861',
        'c8fabf68-8374-48fe-a7ea-a00ccd07afff'
      ],
      offer: { type: 'minus', expected: 30 }
    },
    {
      subtotal: 367,
      books: [
        'c30968db-cb1d-442e-ad0f-80e37c077f89',
        'cef179f2-7cbc-41d6-94ca-ecd23d9f7fd6',
        'fcd1e6fa-a63f-4f75-9da4-b560020b6acc',
        'a460afed-e5e7-4e39-a39d-c885c05db861',
        'c8fabf68-8374-48fe-a7ea-a00ccd07afff',
        '78ee5f25-b84f-45f7-bf33-6c7b30f1b502',
        '78ee5f25-b84f-45f7-bf33-6c7b30f1b502',
        'c30968db-cb1d-442e-ad0f-80e37c077f89',
        'c30968db-cb1d-442e-ad0f-80e37c077f89',
        'c30968db-cb1d-442e-ad0f-80e37c077f89',
        'bbcee412-be64-4a0c-bf1e-315977acd924',
        'bbcee412-be64-4a0c-bf1e-315977acd924'
      ],
      offer: { type: 'slice', expected: 56 }
    }
  ]
}

testSet.tests.map((parameters, i) => {
  notest('if Henri Potier ' + parameters.books.length + ' books bundle offer is ' + parameters.offer.expected + ' €', async (label) => {
    try {
      const books = parameters.books.join(',')
      const serverName = 'http://henri-potier.xebia.fr/'
      const query = '/books/' + books + '/commercialOffers'
      const response = await fetch(serverName + query)
      const data = await response.json()
      const result = response.ok ? data : Promise.reject(data)
      const businessCart = new BusinessCart()
      if (result !== undefined) {
        const recieved = businessCart.computeDiscount(parameters.subtotal, result.offers)
        console.log(label)

        noexpect(recieved).toBe(parameters.offer.expected.toFixed(2))
      }
    } catch (e) {
      throw new Error(e.message)
    }
  })
})
