import React from 'react'
import { render } from '@testing-library/react'
import fetch from 'isomorphic-fetch'

import Home from '../views/Home'
import BusinessCart from '../business/Cart'

describe('HenriPotierApiService', () => {
  test('if jest works correctly', () => {
    expect(true).toBe(true)
  })

  test('if Cpascher is in the page', () => {
    const { getByText } = render(<Home />)
    const text = getByText(/localhost/i)
    expect(text).toBeInTheDocument()
  })
  test('if Henri Potier 2 books set can is at 15 € discount price', async () => {
    try {
      const subtotal = 64 // 29 + 35
      const response = await fetch('http://henri-potier.xebia.fr/books/fcd1e6fa-a63f-4f75-9da4-b560020b6acc,78ee5f25-b84f-45f7-bf33-6c7b30f1b502/commercialOffers')
      const data = await response.json()
      const result = response.ok ? data : Promise.reject(data)
      const businessCart = new BusinessCart()
      businessCart.computeDiscount(subtotal, data.offers)
      expect(data.offers[1].value).toBe(15)
    } catch (e) {
      throw new Error(e.message)
    }
  })
})
