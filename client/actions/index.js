import { createActions } from 'reduxsauce'

export const { Types, Creators } = createActions({
  appLoad: ['payload', 'token'],
  asyncStart: ['subtype'],
  connectToRaffle: null,
  getRaffles: ['payload'],
  hideModal: null,
  hideFlashMessage: null,
  setCurrentUser: ['payload', 'token'],
  showModal: ['modalProps', 'modalType'],
  showFlashMessage: ['flashMessageProps', 'flashMessageType'],
  getProducts: ['products'],
  startRaffle: ['payload'],
  getRaffleWinner: ['payload'],
  endProductRaffle: ['payload'],
  endAllRaffles: ['payload'],
  getYardSales: ['payload', 'error']
});
