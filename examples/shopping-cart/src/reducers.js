import { combineReducers } from 'redux'
import { default as cart } from '../installed/shopping-common/reducers/cart'
import { default as products } from '../installed/shopping-common/reducers/products'

export default combineReducers({
  cart,
  products
})
