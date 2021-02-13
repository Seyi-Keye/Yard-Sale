import { Types } from '../actions'
const {
  GET_PRODUCTS
} = Types

const initialState = [];

export default (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case GET_PRODUCTS:
      return [
        ...action.products
      ]
    default:
      return state
  }
}
