import React from 'react';
import { connect } from 'react-redux';

class Home extends React.Component {
  render() {
    return (
      <div className="container">
        <div>V 0.1.1</div>
        <h1>List of chapters</h1>
      </div>
    );
  }
}

Home.propTypes = {
  //
};

function mapStateToProps({ i18n }) {
  return {
    i18n
  };
}

export default connect(
  mapStateToProps
)(Home);
