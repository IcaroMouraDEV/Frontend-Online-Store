import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Header from './components/Header';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/" component={ Home } />
        <Route path="/carrinho" component={ Cart } />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
