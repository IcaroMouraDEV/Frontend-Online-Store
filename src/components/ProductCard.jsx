import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import { getProduct } from '../services/api';

class ProductCard extends Component {
  componentDidMount() {
    if (!JSON.parse(localStorage.getItem('carrinho'))) {
      localStorage.setItem('carrinho', JSON.stringify([]));
    }
  }

  setLocalStorage = (item) => {
    localStorage.setItem('carrinho', JSON.stringify(item));
  }

  handleClick = () => {
    const { name, img, price, id } = this.props;
    const data = [
      name,
      img,
      price,
      id,
    ];
    const produto = JSON.parse(localStorage.getItem('carrinho'));
    this.setLocalStorage([...produto, data]);
  }

  render() {
    const { name, img, price, id } = this.props;
    return (
      <div data-testid="product">
        <p>{name}</p>
        <img src={ img } alt={ name } />
        <p>{price}</p>
        <Link data-testid="product-detail-link" to={ `/product/${id}` }>Descrição</Link>

        <button
          data-testid="product-detail-add-to-cart"
          type="button"
          onClick={ this.handleClick }
        >
          Adicina ao carrinho
        </button>
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
