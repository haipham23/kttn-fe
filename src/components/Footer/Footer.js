import React from 'react';
import { connect } from 'react-redux';

class Footer extends React.Component {
  render() {
    return (
      <footer className="footer">
        <div className="content has-text-centered">
          Copyright 2018 © Tin Lanh Tre
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
