import PropTypes from 'prop-types';
import React from 'react';
import './css/Main.css';
import ProductCard from './ProductCard';

class Main extends React.Component {
  render() {
    const { searched, products, handleClick, handleChange, searchValue } = this.props;
    return (
      <div className="main">
        <div className="search-bar">
          <label htmlFor="search">
            <input
              className="search-input"
              type="text"
              name="search"
              id="search"
              value={ searchValue }
              data-testid="query-input"
              onChange={ handleChange }
            />
          </label>
          <button
            className="search-btn"
            type="button"
            data-testid="query-button"
            onClick={ handleClick }
          >
            Search
          </button>
        </div>
        {
          !searched && (
            <p data-testid="home-initial-message" className="text">
              Digite algum termo de pesquisa ou escolha uma categoria.
            </p>
          )
        }
        <div className="product-wrapper">
          {
            searched && (
              products.map((product, index) => (
                <ProductCard key={ index } { ...product } />
              ))
            )
          }
        </div>
      </div>
    );
  }
}

Main.defaultProps = {
  products: [],
};

Main.propTypes = {
  searched: PropTypes.bool.isRequired,
  searchValue: PropTypes.string.isRequired,
  products: PropTypes.arrayOf(PropTypes.object),
  handleClick: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default Main;
