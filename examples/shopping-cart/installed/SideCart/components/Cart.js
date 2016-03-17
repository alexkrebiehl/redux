import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import Product from '../../shopping-common/components/Product'
import { cartCheckout } from '../../shopping-common/actions/cart'

export class Cart extends Component {

  static propTypes = {
    products: PropTypes.arrayOf(PropTypes.shape({
      upc: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      inventory: PropTypes.number.isRequired
    })).isRequired,
    total: PropTypes.number,
    onCheckoutClicked: PropTypes.func
  }

  render() {
    const { products, total, onCheckoutClicked } = this.props

    const hasProducts = products.length > 0
    const nodes = !hasProducts
      ? <em>Please add some products to cart.</em>
      : products.map((product, i) =>
          <Product
            title={product.title}
            price={product.price}
            quantity={product.quantity}
            key={i}/>
        )

    return (
      <div>
        <h3>Your Cart</h3>
        <div>{nodes}</div>
        <p>Total: &#36;{total}</p>
        <button onClick={onCheckoutClicked}
          disabled={hasProducts ? '' : 'disabled'}>
          Checkout
        </button>
      </div>
    )
  }
}

export function getTotalQuantity(state) {
  return state.productUpcs.reduce(
    (total, p) =>
      total + getQuantity(state, p)
    , 0
  )
}

export function getQuantity(state, productId) {
  return state.quantityByUpc[productId] || 0
}

export function getCartProducts(state) {
  return Object.keys(state.products.productsByUpc).map(upc => state.products.productsByUpc[upc]).filter(p => state.cart.quantityByUpc[p.upc] > 0)
}

export function getTotalPrice(state) {
  return getCartProducts(state).reduce(
      (total, p) =>
        total + (p.price * getQuantity(state.cart, p.upc))
      , 0
  )
}

export default connect(
    (state) => ({
      products: getCartProducts(state),
      total: getTotalPrice(state)
    }),
    { onCheckoutClicked: cartCheckout }
)(Cart)
