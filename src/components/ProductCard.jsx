import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ProductCard extends Component {
  render() {
    const { name, img, price, id } = this.props;
    return (
      <div data-testid="product">
        <p>{ name }</p>
        <img src={ img } alt={ name } />
        <p>{price}</p>
        <Link data-testid="product-detail-link" to={ `/product/${id}` }>Comprar</Link>
      </div>
    );
  }
}

ProductCard.propTypes = {
  name: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};

export default ProductCard;
