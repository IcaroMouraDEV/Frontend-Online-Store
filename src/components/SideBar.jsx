import React from 'react';
import { getCategories } from '../services/api';
import SideItem from './SideBarItem';

class SideBar extends React.Component {
  constructor() {
    super();
    this.state = { categoriesList: [] };
  }

  componentDidMount() {
    this.fetchCategories();
  }

  fetchCategories = async () => {
    const getCategoriesList = await getCategories();
    this.setState({
      categoriesList: getCategoriesList,
    });
    // return getCategoriesList;
    // return console.log(getCategoriesList);
  }

  render() {
    const { categoriesList } = this.state;
    return (
      <div>
        {
          categoriesList.map((category) => (
            <SideItem
              key={ category.id }
              categoryName={ category.name }
            />
          ))
        }
      </div>
    );
  }
}

export default SideBar;
