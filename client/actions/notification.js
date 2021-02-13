import { Creators, Types } from './index'

export const showModal = ({ modalProps, modalType }) => dispatch => {
  dispatch(Creators.showModal(modalProps, modalType))
};

export const showFlashMessage = ({ flashMessageProps, flashMessageType }) => dispatch => {
  dispatch(Creators.showFlashMessage(flashMessageProps, flashMessageType))
};

export const hideModal = () => dispatch => {
  dispatch(Creators.hideModal())
};

export const hideFlashMessage = () => dispatch => {
  dispatch(Creators.hideFlashMessage())
};
