import { combineReducers } from 'redux'
import { createReducer } from 'redux-act'
import { cartAdd, cartCheckout } from './actions'

// todo: design better coupling
import { getProducts } from '../ShoppingGrid/reducers'

const initialState = {
  productUpcs: [],
  quantityByUpc: {}
}

const productUpcs = createReducer({

  [cartAdd.request]: (state, { upc }) => {
    if (state.includes(upc)) {
      return state
    }
    return [ ...state, upc ]
  },

  [cartAdd.ok]: (state) => state,

  [cartAdd.error]: (state, { upc }) => [
    ...state.slice(null, state.indexOf(upc)),
    ...state.slice(state.indexOf(upc) + 1)
  ],

}, initialState.productUpcs)

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
  productUpcs,
  quantityByUpc
})

// todo: state should always be mirroring the one exported, never any higher
export function getTotalQuantity(state) {
  return state.productUpcs.reduce(
    (total, product) =>
      total + getQuantity(state, product)
    , 0
  )
}

export function getQuantity(state, productId) {
  return state.quantityByUpc[productId] || 0
}

export function inCart(state, productId) {
  return state.productUpcs.includes(productId);
}