import React from 'react';
import { connect } from 'react-redux';

import Login from './Login';
import Register from './Register';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLogin: false,
      isRegister: false
    };

    this._toggleLogin = this._toggleLogin.bind(this);
    this._toggleRegister = this._toggleRegister.bind(this);
  }

  _toggleLogin(isLogin) {
    this.setState({
      isLogin,
      isRegister: false
    });
  }

  _toggleRegister(isRegister) {
    this.setState({
      isRegister,
      isLogin: false
    });
  }

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
                  <button className="button is-small is-info" onClick={() => this._toggleLogin(true)}>
                    <span className="icon is-small">
                      <i className="fas fa-sign-in-alt" />
                    </span>
                    <span>Login</span>
                  </button>
                </p>
              </div>
            </div>
            <div className="navbar-item">
              <div className="field has-addons">
                <p className="control">
                  <button className="button is-small is-success" onClick={() => this._toggleRegister(true)}>
                    <span className="icon is-small">
                      <i className="fas fa-user-plus" />
                    </span>
                    <span>Register</span>
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
        <Login
          show={this.state.isLogin}
          close={() => this._toggleLogin(false)}
        />
        <Register
          show={this.state.isRegister}
          close={() => this._toggleRegister (false)}
        />
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
