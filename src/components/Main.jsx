import PropTypes from 'prop-types';
import React from 'react';
import { getProductsFromCategoryAndQuery } from '../services/api';
import ProductCard from './ProductCard';

class Main extends React.Component {
  constructor() {
    super();
    this.state = { searched: false, searchValue: '' };
  }

  handleClick = async () => {
    const { searchValue } = this.state;
    const res = await getProductsFromCategoryAndQuery('', searchValue);
    const products = res.results.map((product) => ({
      name: product.title,
      img: product.thumbnail,
      price: product.price,
    }));
    this.setState({ products, searched: true });
  }

  handleChange = ({ target }) => {
    this.setState({ searchValue: target.value });
  }

  render() {
    // const { searched } = this.props;
    const { products, searched, searchValue } = this.state;
    return (
      <div>
        <div>
          <label htmlFor="search">
            <input
              type="text"
              name="search"
              id="search"
              value={ searchValue }
              data-testid="query-input"
              onChange={ this.handleChange }
            />
          </label>
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
