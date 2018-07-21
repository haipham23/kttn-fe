import React from 'react';
import { connect } from 'react-redux';

class NotFound extends React.Component {
  render() {
    return (
      <div className="container">
        Page Not Found!
      </div>
    );
  }
}

NotFound.propTypes = {
  //
};

function mapStateToProps({ i18n }) {
  return {
    i18n
  };
}

export default connect(
  mapStateToProps
)(NotFound);
