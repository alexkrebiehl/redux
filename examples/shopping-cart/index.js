import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import App from './src/components/App'

import cart from './installed/Cart/reducers'
//import { getAllProducts } from './redux'
//import ProductsList from '../components/ProductsList'

const middleware = process.env.NODE_ENV === 'production' ?
  [ thunk ] :
  [ thunk, logger()/*, window.devToolsExtension ? window.devToolsExtension() : f => f*/ ]

const store = createStore(
  cart,
  applyMiddleware(...middleware)
)

//store.dispatch(getAllProducts())

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
