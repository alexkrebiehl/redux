import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import Cart from '../../installed/SideCart/components/Cart'
import { cartAdd } from '../../installed/SideCart/actions'
import { getTotalPrice, getProductsInCart } from '../reducers'

import ProductsList from '../../installed/ShoppingGrid/components/ProductsList'

export class App extends Component {
  static propTypes = {
    products: PropTypes.arrayOf(PropTypes.shape({
      upc: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      inventory: PropTypes.number.isRequired
    })).isRequired,
    total: PropTypes.number,
    dispatch: PropTypes.func
  }

  render() {
    const { dispatch } = this.props
    return (
      <div>
        <h2>ClickList</h2>
        <hr/>
        <Cart products={products} total={total}/>

        <hr/>
        <ProductsList />

        <hr/>
        Will Succeed&nbsp;
        <input type="text" ref={node => this.input1 = node}/>
        <button onClick={() => {
          dispatch(cartAdd({
            upc: Math.floor(Math.random() * 100),
            title: this.input1.value,
            price: 1,
            inventory: 10
          }))
        }}>Add Item</button>

        <br/>Will Fail&nbsp;
        <input type="text" ref={node => this.input2 = node}/>
        <button onClick={() => {
          dispatch(cartAdd({
            upc: Math.floor(Math.random() * 100),
            title: this.input2.value,
            price: 1,
            inventory: 10,
            fail: true
          }))
        }}>Add Item</button>

        <hr/>
      </div>
    )
  }
}

export default connect(
    (state) => ({
      products: getProductsInCart(state),
      total: getTotalPrice(state)
    })
)(App)