import PropTypes from 'prop-types';
import React from 'react';
import { getProductsFromCategoryAndQuery } from '../services/api';
import ProductCard from './ProductCard';

class Main extends React.Component {
  constructor() {
    super();
    this.state = { };
  }

  handleClick = async () => {
    const products = await getProductsFromCategoryAndQuery();
    console.log(products);
    products.map((product) => ({
      name: product.title,
      img: product.thumbnail,
      price: product.price,
    }));
    this.setState({ products });
  }

  render() {
    const { searched } = this.props;
    const { products } = this.state;
    return (
      <div>
        <div>
          <input
            type="text"
            name=""
            id=""
            data-testid="query-input"
          />
          <button
            type="button"
            data-testid="query-button"
            onClick={ this.handleClick }
          >
            Search
          </button>
        </div>
        {
          searched ? (
            products.map((product, index) => <ProductCard key={ index } { ...product } />)
          ) : (
            <p data-testid="home-initial-message">
              Digite algum termo de pesquisa ou escolha uma categoria.
            </p>
          )
        }
      </div>
    );
  }
}

Main.propTypes = {
  searched: PropTypes.bool.isRequired,
};

export default Main;
