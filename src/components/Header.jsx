import React from 'react';
import { FaCartPlus, FaHome } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './css/Header.css';

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
    return 0;
  }

  render() {
    const spanContent = this.counter();
    return (
      <header className="general-header">
        <div className="header-item">
          <Link to="/">
            <div className="icon">
              <FaHome />
            </div>
          </Link>
        </div>
        <div className="header-item cart">
          <Link data-testid="shopping-cart-button" to="/cart">
            <div className="icon">
              <FaCartPlus />
            </div>
          </Link>
          <span data-testid="shopping-cart-size">{` ${spanContent}`}</span>
        </div>
      </header>
    );
  }
}

export default Header;
