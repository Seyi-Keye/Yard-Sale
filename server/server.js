/*eslint-disable no-console*/
import dotenv from 'dotenv';
const express = require('express');
import path from 'path';
import helmet from 'helmet';
import compression from 'compression';
import methodOverride from 'method-override';

import bodyParser from 'body-parser';
import routes from './routes';

// initailize dotenv
dotenv.config();
const app = express();
const router = express.Router();

// use hemlet to disable settings that would leak security
app.use(helmet());
app.use(compression());

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// this middleware allow us to accept more HTTP verbs such as PUT , DELETE ...
app.use(methodOverride());

const http = require('http').Server(app);
const io = require('socket.io')(http);
const PORT = process.env.PORT || 1234;

import model from './models';
import Raffle from './raffle';
const Product = model.Product;

// Require all routes into the application.
routes(router);

app.use('/api/v1', router);

// serve static files in public folder
const publicPath = path.join(__dirname, 'build/');
app.use(express.static(publicPath));

app.all('/', (req, res) => {
  return res.sendFile(publicPath + 'index.html');
});
io.on('connection', function(socket){
  console.log('a user connected');
});

io.on('startRaffle', function(yardsaleId){
  // we get all product for sale and create a raffle object
  Product
  .findAll({
    where: {
      yardsaleId
    }
  })
  .then((products) => {
    const length = products.length;
    products.forEach((product, index) => {
      let curRaffle = new Raffle(io,product.id, product.quantity, yardsaleId);
    })
  })
});

app.listen(PORT, () => {
  if (process.env.NODE_ENV === 'development'){
    console.log(`BuyIt is running on port:${PORT}`);
  }
});
