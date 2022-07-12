import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Home from './pages/Home';
import Product from './pages/Product';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ Home } />
        <Route exact path="/product/:id" component={ Product } />
        <Route exact path="/cart" component={ Cart } />
        <Route path="/cart/checkout" component={ Checkout } />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
