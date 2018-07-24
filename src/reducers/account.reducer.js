import initialState from './initialState';

export default function accountReducer(state = initialState.account, action) {
  switch (action.type) {
    case 'SAVE_TOKEN':
      return {
        ...state,
        token: action.payload.token,
        email: action.payload.email
      };

    case 'LOGOUT':
      return initialState.account;

    default:
      return state;
  }
}
