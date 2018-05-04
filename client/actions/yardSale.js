import { Creators, Types } from './index';
import axios from 'axios';

export const getYardSales = () => dispatch => {
  axios.get('http://localhost:1234/api/v1/yardsales').then((response) => {
    return dispatch(Creators.getYardSales(response.data.yardSales.rows))
  }).catch((error) => {
    console.log('error: ', error);
  })
}

export const addYardSale = (yardSale) => dispatch => {
  console.log('yardSale: ', yardSale)
  axios.post('http://localhost:1234/api/v1/yardsales', {
    ...yardSale
  }).then((response) => {
    console.log('addYardSale success: ', response)
    // return dispatch(Creators.getYardSales(response.data.yardSales.rows))
  }).catch((error) => {
    console.log('addYardSale error: ', error)
  })
}