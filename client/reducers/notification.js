import { Types } from '../actions'
const {
  SHOW_MODAL,
  HIDE_MODAL,
  SHOW_FLASH_MESSAGE,
  HIDE_FLASH_MESSAGE
} = Types

const initialState = {
  type: null,
  notificationProps: {
    open: false
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SHOW_MODAL:
      return {
        ...state,
        notificationProps: action.modalProps,
        type: action.modalType
      }
    case SHOW_FLASH_MESSAGE:
      return {
        ...state,
        notificationProps: action.flashMessageProps,
        type: action.flashMessageType
      }
    case HIDE_MODAL:
    case HIDE_FLASH_MESSAGE:
      return initialState
    default:
      return state
  }
}
