import React from 'react';

class Product extends React.Component {
  componentDidMount() {
    getProduct();
  }

  render() {
    return (
      <h1 data-testid="shopping-cart-empty-message">Product</h1>
    );
  }
}

export default Product;
