import React from 'react'
import { render } from '@testing-library/react'
// import { configure, shallow, mount, render as abrender } from 'enzyme'

// import Adapter from 'enzyme-adapter-react-16'

import fetch from 'isomorphic-fetch'

import Home from '../views/Home'
import BusinessCart from '../business/Cart'

// configure({ adapter: new Adapter() })

describe('HenriPotierApiService', () => {
  test('if jest works correctly', () => {
    expect(true).toBe(true)
  })

  // it('should find Cpascher small logo in the page', () => {
  //   expect(shallow(<Home />).contains(<img src='../assets/images/logos/Cpascher_logo_small.png' alt='Cpascher' />)).toBe(true)
  // })

  // it('should find Cpascher small logo in the page', () => {
  //   expect(mount(<Home />).find('Cpascher').length).toBe(1)
  // })

  // it('should find Cpascher small logo in the page', () => {
  //   const text = abrender(<Home />).text()
  //   expect(/Cpascher/i.test(text)).toBe(true)
  // })
  test('if Cpascher can be found in the home page', async () => {
    try {
      const response = await fetch('http://localhost:3000')
      const data = await response.text()
      const result = response.ok ? data : Promise.reject(data)

      expect(/Cpascher/i.test(result)).toBe(true)
    } catch (e) {
      throw new Error(e.message)
    }
  })

  test('if Henri Potier 2 books set can is at 15 € discount price', async () => {
    try {
      const subtotal = 64 // 29 + 35
      const response = await fetch('http://henri-potier.xebia.fr/books/fcd1e6fa-a63f-4f75-9da4-b560020b6acc,78ee5f25-b84f-45f7-bf33-6c7b30f1b502/commercialOffers')
      const data = await response.json()
      const result = response.ok ? data : Promise.reject(data)
      const businessCart = new BusinessCart()
      if (result !== undefined) {
        businessCart.computeDiscount(subtotal, result.offers)
        expect(result.offers[1].value).toBe(15)
      }
    } catch (e) {
      throw new Error(e.message)
    }
  })

})
