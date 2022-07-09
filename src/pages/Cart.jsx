import React from 'react';
// import PropTypes from 'prop-types';

class Cart extends React.Component {
  constructor() {
    super();
    this.state = {
      carrinho: [],
    };
  }

  componentDidMount() {
    if (!JSON.parse(localStorage.getItem('produto'))) {
      localStorage.setItem('produto', JSON.stringify([]));
    }
    const carrinho = JSON.parse(localStorage.getItem('produto'));
    this.setState({ carrinho });
  }

  render() {
    const { carrinho } = this.state;
    console.log(carrinho);
    return (
      <div>
        {
          carrinho.length === 0
            ? <h1 data-testid="shopping-cart-empty-message">Seu carrinho está vazio</h1>
            : (

              carrinho.map((produtos) => (
                <>
                  <p key={ produtos } />
                  <p data-testid="shopping-cart-product-name">
                    {' '}
                    {produtos.name}
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
