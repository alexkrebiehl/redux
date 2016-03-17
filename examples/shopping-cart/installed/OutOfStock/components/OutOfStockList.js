import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { getOutOfStockProducts } from '../../shopping-common/transformers/products'

import Product from '../../shopping-common/components/Product'

export class OutOfStockList extends Component {

  static propTypes = {
    products: PropTypes.arrayOf(PropTypes.shape({
      upc: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      inventory: PropTypes.number.isRequired
    })).isRequired
  }

  render() {
    const { products } = this.props
    return (
      <div>
        <h3>Out of stock Products</h3>
        {products.map((product, i)=>
          <Product
            key={i}
            title={product.title}
            price={product.price} />
        )}
      </div>
    )
  }
}





export default connect(
  (state) => ({
    products: getOutOfStockProducts(state.products)
  })
)(OutOfStockList)
