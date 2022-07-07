import PropTypes from 'prop-types';
import React from 'react';

class Main extends React.Component {
  render() {
    const { searched } = this.props;
    return (
      <div>
        {
          searched ? (
            <p>sim</p>
          ) : (
            <p data-testid="home-initial-message">
              Digite algum termo de pesquisa ou escolha uma categoria.
            </p>
          )
        }
      </div>
    );
  }
}

Main.propTypes = {
  searched: PropTypes.bool.isRequired,
};

export default Main;
