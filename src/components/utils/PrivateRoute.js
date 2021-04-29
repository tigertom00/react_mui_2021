import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router';

const PrivateRoute = ({ children, ...rest }) => {
  const auth = useSelector((state) => state.auth);
  return (
    <Route
      {...rest}
      render={() => {
        return auth.isAuthenticated ? children : <Redirect to='/login' />;
      }}
    />
  );
};

export default PrivateRoute;
