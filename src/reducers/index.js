import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { i18nReducer } from 'react-redux-i18n';

import homeReducer from './home.reducer';
import accountReducer from './account.reducer';

const rootReducer = combineReducers({
  account: accountReducer,
  home: homeReducer,
  routing: routerReducer,
  i18n: i18nReducer
});

export default rootReducer;
