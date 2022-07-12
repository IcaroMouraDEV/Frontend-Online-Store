import React from 'react';
import Header from '../components/Header';
import Loadind from '../components/Loading';
import './css/Checkout.css';

class Checkout extends React.Component {
  constructor() {
    super();
    this.state = {
      cart: [],
    };
  }

  componentDidMount() {
    const cart = JSON.parse(localStorage.getItem('carrinho'));
    this.setState({ cart });
  }

  render() {
    const { cart } = this.state;
    return (
      <div className="checkout">
        <Header />
        <h2>Cart</h2>
        <div className="cart">
          { cart.length <= 0 ? <Loadind /> : (
            cart.map((produtos) => (
              <div key={ produtos.id } className="cart-product">
                <p data-testid="shopping-cart-product-name" className="product-name">
                  {produtos.name}
                </p>
                <img src={ produtos.img } alt={ produtos.name } />
                <p>{`Preço: ${produtos.price} R$`}</p>
                <p data-testid="shopping-cart-product-quantity">
                  {`quant: ${produtos.amount}`}
                </p>
                <p>{`total: ${produtos.price * produtos.amount} R$`}</p>
              </div>
            ))
          )}
        </div>
        <h2>Client Data</h2>
        <form className="client-data">
          <div className="data-input">
            <label htmlFor="name">
              <input
                type="text"
                id="name"
                placeholder="Fullname"
                data-testid="checkout-fullname"
              />
            </label>
          </div>
          <div className="data-input">
            <label htmlFor="mail">
              <input
                type="text"
                id="mail"
                placeholder="Mail"
                data-testid="checkout-email"
              />
            </label>
          </div>
          <div className="data-input">
            <label htmlFor="cpf">
              <input
                type="text"
                id="cpf"
                placeholder="Cpf"
                data-testid="checkout-cpf"
              />
            </label>
          </div>
          <div className="data-input">
            <label htmlFor="phone">
              <input
                type="text"
                id="phone"
                placeholder="Phone"
                data-testid="checkout-phone"
              />
            </label>
          </div>
          <div className="data-input">
            <label htmlFor="cep">
              <input
                type="text"
                id="cep"
                placeholder="Cep"
                data-testid="checkout-cep"
              />
            </label>
          </div>
          <div className="data-input">
            <label htmlFor="address">
              <input
                type="text"
                id="address"
                placeholder="Address"
                data-testid="checkout-address"
              />
            </label>
          </div>
        </form>
        <h2>Payout Method</h2>
        <form className="payout-method">
          <div className="radio-input">
            <label htmlFor="pix">
              <input type="radio" name="payout-method" id="pix" />
              Pix
            </label>
          </div>
          <div className="radio-input">
            <label htmlFor="boleto">
              <input type="radio" name="payout-method" id="boleto" />
              Boleto Bancário
            </label>
          </div>
          <div className="radio-input">
            <label htmlFor="credit-card-visa">
              <input type="radio" name="payout-method" id="credit-card-visa" />
              Visa
            </label>
          </div>
          <div className="radio-input">
            <label htmlFor="credit-card-mastercard">
              <input type="radio" name="payout-method" id="credit-card-mastercard" />
              Mastercard
            </label>
          </div>
        </form>
        <div className="button">
          <button type="button">Finalilzar compra</button>
        </div>
      </div>
    );
  }
}

export default Checkout;
