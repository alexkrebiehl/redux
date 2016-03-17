import React, { Component, PropTypes } from 'react'

import { cartAdd } from '../../shopping-common/actions/cart'

export default class AddItem extends Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    fail: PropTypes.bool
  }


  static getDefaultProps = {
    fail: false

  }

  render() {
    const { title, fail } = this.props
    return (
      <div>
        {this.props.title}&nbsp;
        <input type="text" ref={node => this.input1 = node}/>
        <button onClick={() => {
          dispatch(cartAdd({
            upc: Math.floor(Math.random() * 100),
            title: this.input1.value,
            price: 1,
            inventory: 10,
            fail: this.props.fail
          }))
        }}>Add Item</button>
    </div>
    );
  }
}
