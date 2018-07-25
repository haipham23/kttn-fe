import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({component: Component, isAuth, ...rest}) => {
  return (
    <Route
      {...rest}
      render={(props) => isAuth
        ? <Component {...props} />
        : <Redirect
            to={{
              pathname: '/',
              state: {
                from: props.location,
                isLogin: new Date().getTime()
              }
            }}
          />
      }
    />
  )
}

PrivateRoute.propTypes = {
  isAuth: PropTypes.bool.isRequired
};

const mapStateToProps = ({ account }) => ({ isAuth: !!account.token });

export default connect(mapStateToProps)(PrivateRoute);
