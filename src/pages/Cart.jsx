import React from 'react';
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

  render() {
    const { cart } = this.state;
    return (
      <div>
        {
          cart.length === 0
            ? <h1 data-testid="shopping-cart-empty-message">Seu carrinho está vazio</h1>
            : (

              cart.map((produtos, i) => (
                <>
                  <p key={ i } />
                  <p data-testid="shopping-cart-product-name">
                    {produtos.name}
                  </p>
                  <p>{`Preço: ${produtos.price}`}</p>
                  <p data-testid="shopping-cart-product-quantity">
                    {`Quantidade: ${produtos.amount}`}
                  </p>
                </>
              ))
            )
        }
      </div>

    );
  }
}

// Cart.propTypes = {
//   name: PropTypes.string.isRequired,
//   price: PropTypes.number.isRequired,
//   quantity: PropTypes.number.isRequired,
// };

export default Cart;
