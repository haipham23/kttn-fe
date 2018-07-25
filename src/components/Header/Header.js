import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import equal from 'deep-equal';

import Login from './Login';
import Register from './Register';

import { saveToken, logout } from '../../actions/account';
import { BrandImg } from './Header.styled';

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

  componentDidUpdate(prevProps) {
    if (!equal(prevProps.router, this.props.router)) {
      const { router } = this.props;
      const isLogin = router
        && router.location
        && router.location.state
        && router.location.state.isLogin;

      if (isLogin) {
        this._toggleLogin(true);
      }
    }
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
    const { email } = this.props.account;

    return (
      <nav className="navbar is-info">
        <div className="navbar-brand">
          <Link to="/" className="navbar-item" style={{ padding: 0 }}>
            <BrandImg
              src="https://res.cloudinary.com/hai-pham/image/upload/v1532519670/kttn-fe/fj2kh83hanvtxy3i63ww.png"
              alt="Tin Lanh tre"
            />
          </Link>
        </div>
        <div className="navbar-menu">
          <div className="navbar-start">
            <Link to="/new-chapter" className="navbar-item">Add Chapter</Link>
            <Link to="/" className="navbar-item">Add Quiz</Link>
            <Link to="/" className="navbar-item">Help</Link>
          </div>
          {
            !email &&
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
          }
          {
            email &&
            <div className="navbar-end">
              <div className="navbar-item">
                <div className="field has-addons">
                  <p className="control">
                    <label className="label has-text-light">
                      { email }
                    </label>
                  </p>
                </div>
              </div>
              <div className="navbar-item">
                <div className="field has-addons">
                  <p className="control">
                    <button className="button is-small is-danger" onClick={this.props.logout}>
                      <span className="icon is-small">
                        <i className="fas fa-sign-out-alt" />
                      </span>
                    </button>
                  </p>
                </div>
              </div>
            </div>
          }
        </div>
        <Login
          show={this.state.isLogin}
          close={() => this._toggleLogin(false)}
          saveToken={this.props.saveToken}
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

const mapDispatchToProps = (dispatch) => bindActionCreators({ saveToken, logout }, dispatch);

const mapStateToProps = ({ i18n, account, router }) => ({ i18n, account, router });

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
