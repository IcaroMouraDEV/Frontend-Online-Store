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
    const { name, img, price, id, stock, shipping, coin } = this.props;
    const amount = 1;
    const data = [
      {
        name,
        img,
        price,
        id,
        amount,
        stock,
        shipping,
        coin,
      },
    ];
    const produto = JSON.parse(localStorage.getItem('carrinho'));
    this.setLocalStorage([...produto, ...data]);
  }

  render() {
    const { name, img, price, id, shipping, coin } = this.props;
    return (
      <Link data-testid="product-detail-link" to={ `/product/${id}` }>
        <div data-testid="product" className="product-item">
          <p>{name}</p>
          <img src={ img } alt={ name } />
          <p>{`${price}${coin}`}</p>
          { shipping && <p data-testid="free-shipping">Frete Grátis</p> }
          <button
            className="item-btn"
            data-testid="product-add-to-cart"
            type="button"
            onClick={ this.handleClick }
          >
            Adicina ao carrinho
          </button>
        </div>
      </Link>
    );
  }
}

ProductCard.propTypes = {
  name: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  coin: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  stock: PropTypes.number.isRequired,
  shipping: PropTypes.bool.isRequired,
};

export default ProductCard;
