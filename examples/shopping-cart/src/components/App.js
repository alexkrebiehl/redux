import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import Cart from '../../installed/SideCart/components/Cart'
import AddItem from '../../installed/ShoppingAddItem/components/AddItem'

import ProductsList from '../../installed/ShoppingGrid/components/ProductsList'

import OutOfStockList from '../../installed/OutOfStock/components/OutOfStockList'

export class App extends Component {
  static propTypes = {
    dispatch: PropTypes.func
  }

  render() {
    const { dispatch } = this.props
    return (
      <div>
        <h2>ClickList</h2>
        <hr/>
        <Cart />

        <hr/>
        <ProductsList />

        <hr/>
        <AddItem title="Will succeed" />
        <AddItem title="Will fail" fail={true} />

        <hr/>

        <OutOfStockList />
      </div>
    )
  }
}

export default connect()(App);
