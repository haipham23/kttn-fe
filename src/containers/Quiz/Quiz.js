import React from 'react';
import { connect } from 'react-redux';

import { Wrapper } from './Quiz.styled';

class Quiz extends React.Component {
  render() {
    return (
      <Wrapper className="container">
        <div className="columns">
          <div className="column">
            Left
          </div>
          <div className="column">
            Right
          </div>
        </div>
      </Wrapper>
    );
  }
}

Quiz.propTypes = {
  //
};

const mapStateToProps = ({ i18n }) => ({ i18n });

export default connect(
  mapStateToProps
)(Quiz);
