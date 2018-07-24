import React from 'react';

import { register } from './utils';
import { Column, ErrorText, GroupField } from './Header.styled';

const INIT_STATE = {
  email: '',
  password: '',
  password2: '',
  errorText: '',
  isLoading: false
};

const ERROR_MSG = 'invalid username or password';

class Register extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = INIT_STATE;
    this._onChange = this._onChange.bind(this);
    this._register = this._register.bind(this);
  }

  _onChange(type, event) {
    this.setState({
      [type]: event.target.value
    });
  }

  _register() {
    const _this = this;
    const { email, password, password2 } = _this.state;
    const { close } = _this.props;

    _this.setState({
      errorText: '',
      isLoading: true
    }, () => {
      register({
        email,
        password,
        password2
      })
        .then(() => _this.setState(INIT_STATE, close))
        .catch(() => _this.setState({
          errorText: ERROR_MSG,
          isLoading: false
        }));
    });
  }

  render() {
    const { email, password, password2, errorText, isLoading } = this.state;
    const { show, close } = this.props;

    return (
      <div className={`modal ${show ? 'is-active' : ''}`}>
        <div className="modal-background" />
        <div className="modal-content">
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
            <div className="field">
              <div className="control">
                <input
                  value={password2}
                  onChange={e => this._onChange('password2', e)}
                  className="input"
                  type="password"
                  placeholder="retype password"
                />
              </div>
            </div>
            <GroupField className="field">
              <button
                className={`button is-success ${isLoading ? 'is-loading' : ''}`}
                onClick={this._register}
                disabled={isLoading}
              >
                Register
              </button>
              <ErrorText className="control has-text-danger">
                {errorText}
              </ErrorText>
            </GroupField>
          </Column>
        </div>
        <button className="modal-close is-large" aria-label="close" onClick={close} />
      </div>
    );
  }
}

export default Register;
