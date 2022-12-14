import React from 'react';
import Header from '../components/Header';
import Main from '../components/Main';
import SideBar from '../components/SideBar';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';
import './css/Home.css';

class Home extends React.Component {
  constructor() {
    super();
    this.state = { searched: false, searchValue: '', categoriesList: [] };
  }

  componentDidMount() {
    this.fetchCategories();
  }

  handleClick = async () => {
    const { searchValue, categoryValue } = this.state;
    const res = await getProductsFromCategoryAndQuery(categoryValue, searchValue);
    const products = res.results.map((product) => ({
      name: product.title,
      img: product.thumbnail,
      price: product.price,
      id: product.id,
      stock: product.available_quantity,
      shipping: product.shipping.free_shipping,
      coin: product.currency_id,
    }));
    this.setState({ products, searched: true });
  }

  categoryClick = ({ target }) => {
    this.setState({ categoryValue: target.id });
  }

  handleChange = ({ target }) => {
    this.setState({ searchValue: target.value });
  }

  fetchCategories = async () => {
    const categoriesList = await getCategories();
    this.setState({ categoriesList });
  }

  render() {
    const { searched, products, searchValue, categoriesList } = this.state;
    const toMain = { searched, products, searchValue };
    const toSide = { categoriesList };
    return (
      <>
        <Header />
        <div className="flex">
          <SideBar
            { ...toSide }
            handleClick={ this.handleClick }
            categoryClick={ this.categoryClick }
          />
          <Main
            { ...toMain }
            handleClick={ this.handleClick }
            handleChange={ this.handleChange }
          />
        </div>
      </>
    );
  }
}

export default Home;
