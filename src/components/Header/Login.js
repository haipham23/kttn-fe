import React from 'react';

import { login } from './utils';
import { Column, ErrorText, GroupField } from './Header.styled';
import Modal from '../Modal/Modal';

const INIT_STATE = {
  email: 'test1@example.com',
  password: '123456',
  errorText: '',
  isLoading: false
};

const ERROR_MSG = 'invalid username or password';

class Login extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = INIT_STATE;
    this._onChange = this._onChange.bind(this);
    this._login = this._login.bind(this);
  }

  _onChange(type, event) {
    this.setState({
      [type]: event.target.value
    });
  }

  _login() {
    const _this = this;
    const { email, password } = _this.state;
    const { close, saveToken } = _this.props;

    _this.setState({
      errorText: '',
      isLoading: true
    }, () => {
      login({
        email,
        password
      })
        .then((response) => {
          _this.setState(INIT_STATE);

          // save token to redux store
          saveToken({
            token: response.data,
            email
          });

          close();
        })
        .catch(() => {
          _this.setState({
            errorText: ERROR_MSG,
            isLoading: false
          })
        });
    });
  }

  render() {
    const { email, password, errorText, isLoading } = this.state;
    const { show, close } = this.props;

    return (
      <Modal
        show={show}
        hide={close}
      >
        <Column>
          <div className="field">
            <div className="control">
              <input
                value={email}
                onChange={e => this._onChange('email', e)}
                className="input"
                type="email"
                placeholder="email"
              />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <input
                value={password}
                onChange={e => this._onChange('password', e)}
                className="input"
                type="password"
                placeholder="password"
              />
            </div>
          </div>
          <GroupField className="field">
            <button
              className={`button is-success ${isLoading ? 'is-loading' : ''}`}
              onClick={this._login}
              disabled={isLoading}
            >
              Login
            </button>
            <ErrorText className="control has-text-danger">
              {errorText}
            </ErrorText>
          </GroupField>
        </Column>
      </Modal>
    );
  }
}

export default Login;
