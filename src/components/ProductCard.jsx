// req5
import PropTypes from 'prop-types';
import React, { Component } from 'react';

class ProductCard extends Component {
  render() {
    const { name, img, price } = this.props;
    return (
      <div data-testid="product">
        <p>{ name }</p>
        <img src={ img } alt={ name } />
        <p>{price}</p>
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
