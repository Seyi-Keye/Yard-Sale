import { Creators, Types } from './index';
import { setItem } from './localStorage'

export const authSuccess = (user, token, history) => dispatch => {
  setItem('ays-token', token);
  dispatch(Creators.setCurrentUser(user, token));
  history.push('/dashboard');
}

export const setCurrentUser = (response, token) => dispatch => {
  setItem('ays-token', token);
  dispatch(Creators.setCurrentUser(response, token));
}

