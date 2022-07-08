import React from 'react';
import PropTypes from 'prop-types';

class SideItem extends React.Component {
  render() {
    const { categoryName } = this.props;
    return (
      <div>
        <button
          type="button"
          data-testid="category"
        >
          { categoryName }
        </button>
      </div>
    );
  }
}

SideItem.propTypes = {
  categoryName: PropTypes.string.isRequired,
};

export default SideItem;
