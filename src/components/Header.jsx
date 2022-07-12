import React from 'react';
import { Link } from 'react-router-dom';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    const cartAmount = JSON.parse(localStorage.getItem('carrinho'));
    this.setState({ cartAmount });
  }

  counter = () => {
    const { cartAmount = [] } = this.state;
    if (cartAmount !== null && cartAmount.length > 0) {
      return cartAmount.reduce((acc, item) => acc + item.amount, 0);
    }
    return 2;
  }

  render() {
    const spanContent = this.counter();
    return (
      <header>
        <Link to="/">Home</Link>
        <Link data-testid="shopping-cart-button" to="/cart">
          Carrinho
        </Link>
        <span data-testid="shopping-cart-size">{` ${spanContent}`}</span>
      </header>
    );
  }
}

export default Header;
