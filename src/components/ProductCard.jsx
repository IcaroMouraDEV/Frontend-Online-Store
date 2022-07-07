// req5
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ProductCard extends Component {
  render() {
    const { name, img, price } = this.props;
    return (
      <div>
        <p data-testid="product">{ name }</p>
        <img data-testid="product" src={ img } alt={ name } />
        <p data-testid="product">{price}</p>
      </div>
    );
  }
}

ProductCard.propTypes = {
  name: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};

export default ProductCard;
