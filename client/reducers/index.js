import { combineReducers } from 'redux';
import auth from './auth';
import notification from './notification';
import products from './products';
import yardSale from './yardSale';

export default combineReducers({
  auth,
  notification,
  products,
  yardSale
});
