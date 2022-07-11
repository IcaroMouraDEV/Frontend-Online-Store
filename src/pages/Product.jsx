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
    if (!JSON.parse(localStorage.getItem('carrinho'))) {
      localStorage.setItem('carrinho', JSON.stringify([]));
    }
  }

  fetchProduct = async () => {
    const { match } = this.props;
    const { id } = match.params;
    const product = await getProduct(id);
    console.log(id);
    this.setState({ product, loading: false });
  }

  setLocalStorage = (item) => {
    localStorage.setItem('carrinho', JSON.stringify(item));
  }

  handleClick = () => {
    const { product } = this.state;
    const data = [
      {
        name: product.title,
        img: product.thumbnail,
        price: product.price,
        id: product.id,
        amount: 1,
      },
    ];
    const produto = JSON.parse(localStorage.getItem('carrinho'));
    this.setLocalStorage([...produto, ...data]);
  }

  render() {
    const { product, loading } = this.state;
    return (
      <div className="product">
        {
          loading ? <Loading /> : (
            <>
              <div className="product-data">
                <h1 data-testid="product-detail-name">{product.title}</h1>
                <img src={ product.thumbnail } alt={ product.title } />
                <p>{product.price}</p>
              </div>
              <div className="add-to-cart">
                <button type="button" onClick={ this.handleClick }>
                  Adicionar ao carrinho
                </button>
              </div>
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
