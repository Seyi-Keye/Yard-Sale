import { Types } from '../actions';

const { SET_CURRENT_USER, LOGOUT } = Types;

const initialState = {
  currentUser: null,
  token: null
}

export default (state=initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
        token: action.token
      }
    case LOGOUT: {
      return {
        ...state,
        currentUser: null
      }
    }
    default:
     return state;
  }
}