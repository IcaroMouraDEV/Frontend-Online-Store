import PropTypes from 'prop-types';
import React from 'react';
import { getProductsFromCategoryAndQuery } from '../services/api';

class Main extends React.Component {
  constructor() {
    super();
    this.state = {

    };
  }

  handleClick = async () => {
    const res = await getProductsFromCategoryAndQuery();
    console.log(res);
    this.setState({ products: res });
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
            products.map((product) => <ProductCard  {...product} />)
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
