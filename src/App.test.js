import React from 'react'
import { render } from '@testing-library/react'
import Home from './views/Home'

test('renders learn react link', () => {
  const { getByText } = render(<Home />)
  const linkElement = getByText(/Cpascher/i)
  expect(linkElement).toBeInTheDocument()
})
