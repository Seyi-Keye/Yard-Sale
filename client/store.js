import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import rootReducer from './reducers';

const getMiddleware = () => {
  if (process.env.NODE_ENV === 'production') {
    return applyMiddleware(
      thunk
    );
  } else {
    return applyMiddleware(
      thunk,
      createLogger()
    );
  }
}

export default function configureStore(initialState={}) {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || composeWithDevTools;

  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(getMiddleware())
  )
  return store;
}
