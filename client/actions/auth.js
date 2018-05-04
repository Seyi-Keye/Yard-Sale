import { Creators, Types } from './index';
import { setItem } from './localStorage'

export const setCurrentUser = (response, token) => dispatch => {
  setItem('ays-token', token);
  dispatch(Creators.setCurrentUser(response, token));
}

