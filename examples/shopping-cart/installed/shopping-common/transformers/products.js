

export function getOutOfStockProducts(state) {
  return getProducts(state).filter(p => p.inventory == 0);
}

export function getProducts(state) {
  return Object
      .keys(state.productsByUpc)
      .map(upc => state.productsByUpc[upc])
}
