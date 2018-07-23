import React from 'react';
import { connect } from 'react-redux';

class Header extends React.Component {
  render() {
    return (
      <nav className="navbar is-info">
        <div className="navbar-brand">
          <a className="navbar-item" href="/">
            <img src="https://bulma.io/images/bulma-logo-white.png" alt="Tin Lanh tre" width="112" height="28" />
          </a>
        </div>
        <div className="navbar-menu">
          <div className="navbar-start">
            <a className="navbar-item" href="/new-chapter">
              Add Chapter
            </a>
            <a className="navbar-item" href="/new-quiz">
              Add Quiz
            </a>
            <a className="navbar-item" href="#">
              Help
            </a>
          </div>
          <div className="navbar-end">
            <div className="navbar-item">
              <div className="field has-addons">
                <p className="control">
                  <a className="button is-primary" href="#">
                    <span className="icon is-small">
                      <i className="fas fa-sign-in-alt" />
                    </span>
                    <span>Login</span>
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

Header.propTypes = {
  //
};

function mapStateToProps({ i18n }) {
  return {
    i18n
  };
}

export default connect(
  mapStateToProps
)(Header);
