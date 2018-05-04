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


// Require all routes into the application.
routes(router);

app.use('/api/v1', router);

io.on('connection', function(socket){
  console.log('a user connected');
});

app.listen(PORT, () => {
  console.log(`BuyIt is running on port:${PORT}`);
});
