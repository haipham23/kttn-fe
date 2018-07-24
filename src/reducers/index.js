import { combineReducers } from 'redux';
import { i18nReducer } from 'react-redux-i18n';

import homeReducer from './home.reducer';
import accountReducer from './account.reducer';
import chapterReducer from './chapter.reducer';

const rootReducer = combineReducers({
  account: accountReducer,
  chapter: chapterReducer,
  home: homeReducer,
  i18n: i18nReducer
});

export default rootReducer;
