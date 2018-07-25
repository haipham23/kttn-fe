import React from 'react';
import PropTypes from 'prop-types';
import Loader from 'react-loader-spinner';

import { Wrapper } from './PLoader.styled';

class PLoader extends React.PureComponent {
  render() {
    if (!this.props.show) {
      return null;
    }

    return (
      <Wrapper>
        <Loader
          type="Bars"
          color="#00BFFF"
          height="30"
          width="30"
        />
      </Wrapper>
    );
  }
}

PLoader.propTypes = {
  show: PropTypes.bool
};

export default PLoader;
