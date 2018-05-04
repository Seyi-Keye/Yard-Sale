import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import Dashboard from '@/components/dashboard/Dashboard'


const AuthContainer = ({ name, Comp, path, secured, exact }) => {
  const isToken = localStorage.getItem('ays-token');
  if (secured && !isToken) {
    return <Redirect to="/" />
  }

  if (isToken && name === 'login') {
    return <Redirect to="/dashboard" />
  }

  if (!isToken && name === 'login') {
    return <Route
      path={path}
      component={Comp}
      exact={exact}
      name={name}
    />
  }

  console.log('AuthContainer: ', name)

  return <Route
    path={path}
    render={() => (
      <Dashboard Comp={Comp} />
    )}
    exact={exact}
    name={name}
  />
}

export default AuthContainer;