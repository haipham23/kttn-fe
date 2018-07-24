import axios from 'axios';
import Isemail from 'isemail';

const isSame = (password, password2) => password === password2;
const isEmail = email => email && Isemail.validate(email);
const isPasswordValid = password => typeof password === 'string' && password.length >= 6;

const ERROR_MSG = 'invalid email or password';
const LOGIN_URL = 'https://api.tinlanhtre.com/account/login';
const REGISTER_URL = 'https://api.tinlanhtre.com/account/create';

export const register = ({ email, password, password2 }) => {
  if (
    isEmail(email)
    && isPasswordValid(password)
    && isSame(password, password2)
  ) {
    return axios.post(REGISTER_URL, {
      email,
      password
    });
  }

  return Promise.reject(ERROR_MSG);
};

export const login = ({ email, password }) => {
  if (
    isEmail(email)
    && isPasswordValid(password)
  ) {
    return axios.post(LOGIN_URL, {
      email,
      password
    });
  }

  return Promise.reject(ERROR_MSG);
};
