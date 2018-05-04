import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';
import AuthContainer from '@/containers/AuthContainer'

import configureStore from './store';
import './scss/main.scss';

import router from './router';
import ModalRoot from './components/ModalRoot.jsx';
import FlashMessageRoot from './components/FlashMessageRoot.jsx';

/**
* App.jsx: main entry file
* @since: v.1.0.0
*/
const App = () => {
  return (
    <div>
      <FlashMessageRoot />
      <Router>
        <div>
          <Switch>
            {
              router.map((route) => (
                <AuthContainer
                  path={route.path}
                  name={route.name}
                  exact={route.exact}
                  Comp={route.component}
                  key={route.path}
                  secured={route.secured}
                />
              ))
            }
          </Switch>
        </div>
      </Router>
      <ModalRoot />
    </div>
  );
}

ReactDOM.render(
  <Provider store={configureStore()}>
    <App />
  </Provider>,
  document.getElementById('app')
);
