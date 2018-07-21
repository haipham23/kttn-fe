import React from 'react';
import { connect } from 'react-redux';

class Footer extends React.Component {
  render() {
    return (
      <footer className="footer">
        <div className="content has-text-centered">
          Copyright 2018 © Hai Pham
        </div>
      </footer>
    );
  }
}

Footer.propTypes = {
  //
};

function mapStateToProps({ i18n }) {
  return {
    i18n
  };
}

export default connect(
  mapStateToProps
)(Footer);
