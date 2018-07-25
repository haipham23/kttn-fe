import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router'
import { Route, Switch } from 'react-router-dom';

import configureStore from './store/configureStore';
import history from './store/history';
import { INDEX, NEW_CHAPTER, EDIT_CHAPTER, QUIZ } from './constants/routePaths';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './containers/Home/Home';
import NewChapter from './containers/Chapter/NewChapter';
import Quiz from './containers/Quiz/Quiz';
import NotFound from './components/NotFound/NotFound';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

require('./favicon.ico');


const store = configureStore({}, history);

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <Header />
        <Switch>
          <Route exact path={INDEX} component={Home} />
          <PrivateRoute path={NEW_CHAPTER} component={NewChapter} />
          <PrivateRoute path={EDIT_CHAPTER} component={NewChapter} />
          <PrivateRoute path={QUIZ} component={Quiz} />
          <Route component={NotFound} />
        </Switch>
        <Footer />
      </div>
    </ConnectedRouter>
  </Provider>, document.getElementById('react-app')
);
