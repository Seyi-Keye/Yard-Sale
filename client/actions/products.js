import { Creators, Types } from './index';
import axios from 'axios';

export const showProducts = () => dispatch => {
  axios.get('http://localhost:1234/api/v1/products').then(({ data }) => {
    dispatch(Creators.getProducts(data.products.rows))
  })
};
