import PropTypes from 'prop-types';
import React from 'react';
import SideItem from './SideBarItem';

class SideBar extends React.Component {
  render() {
    const { categoriesList, handleClick, categoryClick } = this.props;
    return (
      <div>
        {
          categoriesList.map((category) => (
            <SideItem
              key={ category.id }
              handleClick={ handleClick }
              categoryClick={ categoryClick }
              categoryId={ category.id }
              categoryName={ category.name }
            />
          ))
        }
      </div>
    );
  }
}

SideBar.propTypes = {
  categoriesList: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleClick: PropTypes.func.isRequired,
  categoryClick: PropTypes.func.isRequired,
};

export default SideBar;
