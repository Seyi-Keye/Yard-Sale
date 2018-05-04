import { Types } from '../actions';

const { GET_YARD_SALES } = Types;

export default (state = {}, action) => {
  switch (action.type) {
    case GET_YARD_SALES:
      return {
        ...state,
        yardSales: action.error ? null : action.payload
      }

    default:
      return state;
  }
}