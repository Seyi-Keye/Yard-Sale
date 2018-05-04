import React, {Component} from 'react';
import { Route, Redirect } from 'react-router-dom';


const AuthContainer = ({ name, Comp, path, secured, exact }) => {
  const isToken = localStorage.getItem('ays-token');
  if (secured && !isToken) {
    return <Redirect to="/" />
  }

  if (isToken && name==='login') {
    return <Redirect to="/dashboard" />
  }

  return <Route
      path={path}
      component={Comp}
      exact={exact}
      name={name}
      />
}

export default AuthContainer;