/* eslint-disable no-useless-constructor */
import React, { Component } from 'react'
import Home from '../../views/Home'
import Search from '../../views/Search'
import Cart from '../../views/Cart'

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
