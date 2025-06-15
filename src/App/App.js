import React, { Component } from 'react'
import Home from '../components/home/Home'
import Search from '../components/search/Search'
import Cart from '../components/cart/Cart'

import { BrowserRouter, Route, Routes } from 'react-router-dom'

class App extends Component {
  render () {
    return (
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/search' element={<Search />} />
            <Route path='/cart' element={<Cart />} />
          </Routes>
        </BrowserRouter>
    )
  }
}

export default App
