import { combineReducers } from 'redux'
import { default as cart, getQuantity, inCart } from '../installed/SideCart/reducers'
import { default as products, getProducts } from '../installed/ShoppingGrid/reducers'

export default combineReducers({
  cart,
  products
})

export function getProductsInCart(state) {
  return getProducts(state.products)
      .filter(product => inCart(product.upc))
}

export function getTotalPrice(state) {
  return getProductsInCart(state).reduce(
      (total, product) =>
        total + (product.price * getQuantity(state.cart, product.upc))
      , 0
  )
}
