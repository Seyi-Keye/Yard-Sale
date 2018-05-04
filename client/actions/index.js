import { createActions } from 'reduxsauce'

export const { Types, Creators } = createActions({
  appLoad: ['payload', 'token'],
  asyncStart: ['subtype'],
  hideModal: null,
  hideFlashMessage: null,
  setCurrentUser: ['payload', 'token'],
  showModal: ['modalProps', 'modalType'],
  showFlashMessage: ['flashMessageProps', 'flashMessageType'],
  getProducts: ['products']
});
