import { Creators, Types } from './index';
import { setItem, removeItem } from './localStorage'

export const authSuccess = (user, token, history) => dispatch => {
  setItem('ays-token', token);
  dispatch(Creators.setCurrentUser(user, token));
  history.push('/dashboard');
}

export const logout = (history) => dispatch => {
  removeItem('ays-token');
  removeItem('ays-state');
  dispatch(Creators.logout());
  history.push('/');
}

export const setCurrentUser = (response, token) => dispatch => {
  setItem('ays-token', token);
  dispatch(Creators.setCurrentUser(response, token));
}

