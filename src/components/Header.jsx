// req 3
import { Link } from 'react-router-dom';
import React from 'react';

class Header extends React.Component {
  render() {
    return (
      <Link data-testid="shopping-cart-button" to="/carrinho">Carrinho</Link>
    );
  }
}

export default Header;
