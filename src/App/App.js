/* eslint-disable no-useless-constructor */
import React, { Component } from 'react'
import Home from '../components/home/Home'
import Search from '../components/search/Search'
import Cart from '../components/cart/Cart'

import { BrowserRouter, Route, Switch } from 'react-router-dom'

class App extends Component {
  constructor () {
    super()
  }

  render () {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/search' component={Search} />
          <Route exact path='/cart' component={Cart} />
        </Switch>
      </BrowserRouter>
    )
  }
}
export default App
