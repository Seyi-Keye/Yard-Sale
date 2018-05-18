import { Creators, Types } from './index';
import socketIoClient from 'socket.io-client';

const socket = socketIoClient('http://localhost:1234');

export const startRaffle = () => dispatch => {
  socket.on('start-raffle', 'hey')
}

export const getRaffleWinner = () => dispatch => {
  socket.on('raffle-winner', function () {
    console.log('raffle in progress');
  });
}

export const endProductRaffle = () => dispatch => {
  socket.on('end-product-raffle', function () {
    console.log('disconnected');
  });
}

export const endAllRaffles = () => dispatch => {
  socket.on('end-all-raffles', function () {
    console.log('disconnected');
  });
}
