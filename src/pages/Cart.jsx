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
    this.setState({ cart });
  }

  handleClick = ({ target }, operator) => {
    const { cart } = this.state;
    console.log(cart);
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
                  cart.map((produtos) => (
                    <div key={ produtos.id }>
                      <p data-testid="shopping-cart-product-name">
                        {produtos.name}
                      </p>
                      <p>{`Preço: ${produtos.price}`}</p>
                      <div className="amount" id={ produtos.id }>
                        <button
                          type="button"
                          data-testid="product-decrease-quantity"
                          onClick={ (event) => this.handleClick(event, false) }
                        >
                          -
                        </button>
                        <p data-testid="shopping-cart-product-quantity">
                          {produtos.amount}
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
