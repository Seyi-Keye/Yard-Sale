import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import configureStore from './store';

import './scss/main.scss';

import Login from './components/Login.jsx';
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
      <Login />
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
