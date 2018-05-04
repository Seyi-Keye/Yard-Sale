import { combineReducers } from 'redux';
import auth from './auth';
import notification from './notification';
<<<<<<< HEAD
import products from './products';
=======
import yardSale from './yardSale';
>>>>>>> - create yardsale (admin)

export default combineReducers({
  auth,
  notification,
<<<<<<< HEAD
  products
=======
  yardSale
>>>>>>> - create yardsale (admin)
});
