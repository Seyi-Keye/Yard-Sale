import { combineReducers } from 'redux';
import auth from './auth';
import notification from './notification';
import products from './products';

export default combineReducers({
  auth,
  notification,
  products
});
