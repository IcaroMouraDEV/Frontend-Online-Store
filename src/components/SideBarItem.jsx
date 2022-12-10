import PropTypes from 'prop-types';
import React from 'react';

class SideItem extends React.Component {
  handleClickSide = async (event) => {
    const { handleClick, categoryClick } = this.props;
    await categoryClick(event);
    handleClick();
  }

  render() {
    const { categoryName, categoryId } = this.props;
    return (
      <div>
        <button
          className="item"
          type="button"
          data-testid="category"
          id={ categoryId }
          onClick={ this.handleClickSide }
        >
          { categoryName }
        </button>
      </div>
    );
  }
}

SideItem.propTypes = {
  categoryName: PropTypes.string.isRequired,
  categoryId: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  categoryClick: PropTypes.func.isRequired,
};

export default SideItem;
