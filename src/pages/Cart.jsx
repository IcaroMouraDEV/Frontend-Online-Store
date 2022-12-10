import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
// import PropTypes from 'prop-types';

class Cart extends React.Component {
  constructor() {
    super();
    this.state = {
      cart: [],
    };
  }

  componentDidMount() {
    if (!JSON.parse(localStorage.getItem('carrinho'))) {
      localStorage.setItem('carrinho', JSON.stringify([]));
    }
    const cart = JSON.parse(localStorage.getItem('carrinho'));
    const cartSorted = cart.sort((a, b) => {
      const fa = a.id.toLowerCase();
      const fb = b.id.toLowerCase();
      const mgnum = -1;

      if (fa < fb) return mgnum;
      if (fa > fb) return 1;
      return 0;
    });
    const newCart = cartSorted
      .filter((value, index, self) => index === self.findIndex((t) => (
        t.id === value.id && t.name === value.name
      )));
    console.log(newCart);
    this.setState({ cart: newCart });
  }

  handleClick = ({ target }, operator) => {
    const { cart } = this.state;
    const value = target.parentNode.id;
    const data = cart.find((product) => product.id === value);
    const newCart = cart.filter((product) => {
      if (product.id !== value) { return data; }
      return product;
    });
    if (operator && data.amount < data.stock) { data.amount += 1; }
    if (operator === false && data.amount > 1) { data.amount -= 1; }
    this.setState({ cart: newCart });
    localStorage.getItem('carrinho', JSON.stringify(newCart));
  }

  removeItem = () => {};

  render() {
    const { cart } = this.state;
    return (
      <>
        <Header />
        <main className="cart">
          <div className="cart-items">
            {
              cart.length === 0
                ? (
                  <h1 data-testid="shopping-cart-empty-message">
                    Seu carrinho está vazio
                  </h1>
                ) : (
                  cart.map((product) => (
                    <div key={ product.id }>
                      <button type="button" onClick={ this.removeItem }>❌</button>
                      <img src={ product.img } alt={ product.name } />
                      <p data-testid="shopping-cart-product-name">
                        {product.name}
                      </p>
                      <p>{`${product.price}${product.coin}`}</p>
                      <div className="amount" id={ product.id }>
                        <button
                          type="button"
                          data-testid="product-decrease-quantity"
                          onClick={ (event) => this.handleClick(event, false) }
                        >
                          -
                        </button>
                        <p data-testid="shopping-cart-product-quantity">
                          {product.amount}
                        </p>
                        <button
                          type="button"
                          data-testid="product-increase-quantity"
                          onClick={ (event) => this.handleClick(event, true) }
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))
                )
            }
          </div>
          <div className="checkout">
            <Link to="/cart/checkout" data-testid="checkout-products">
              Finalizar Compra
            </Link>
          </div>
        </main>
      </>
    );
  }
}

// Cart.propTypes = {
//   name: PropTypes.string.isRequired,
//   price: PropTypes.number.isRequired,
//   quantity: PropTypes.number.isRequired,
// };

export default Cart;
