import { combineReducers } from 'redux'
import { createReducer } from 'redux-act'
import {cartAdd, cartRemove} from '../actions/cart'

import { getProducts } from './products'

const initialState = {
  // productUpcs: [],
  quantityByUpc: {}
}

const quantityByUpc = createReducer({

  [cartAdd.request]: (state, { upc }) => ({
    ...state,
    [upc]: (state[upc] || 0) + 1
  }),

  [cartAdd.ok]: (state) => state,

  [cartAdd.error]: (state, { upc }) => ({
    ...state,
    [upc]: (state[upc]) - 1
  }),

}, initialState.quantityByUpc)


export default combineReducers({
  quantityByUpc
})
