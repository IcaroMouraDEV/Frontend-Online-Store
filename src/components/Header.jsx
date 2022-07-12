import React from 'react';
import { Link } from 'react-router-dom';

class Header extends React.Component {
  render() {
    return (
      <header>
        <Link to="/">Home</Link>
        <Link data-testid="shopping-cart-button" to="/cart">Carrinho</Link>
      </header>
    );
  }
}

export default Header;
