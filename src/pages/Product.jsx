import PropTypes from 'prop-types';
import React from 'react';
import Loading from '../components/Loading';
import { getProduct } from '../services/api';

class Product extends React.Component {
  constructor() {
    super();
    this.state = { loading: true };
  }

  componentDidMount() {
    this.fetchProduct();
  }

  fetchProduct = async () => {
    const { match } = this.props;
    const { id } = match.params;
    const product = await getProduct(id);
    console.log(id);
    this.setState({ product, loading: false });
  }

  render() {
    const { product, loading } = this.state;
    return (
      <div className="product">
        {
          loading ? <Loading /> : (
            <>
              <h1 data-testid="product-detail-name">{product.title}</h1>
              <img src={ product.thumbnail } alt={ product.title } />
              <p>{product.price}</p>
            </>
          )
        }
      </div>
    );
  }
}

Product.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({ id: PropTypes.string.isRequired }),
  }).isRequired,
};

export default Product;
