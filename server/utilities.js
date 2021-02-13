module.exports = {
   /**
   * send error message to client
   * @param {object} res - server response objects
   * @param {string} message - error message
   * @param {int} statusCode - response code
   * @returns {object} -
   */
  sendMessage(res, message, statusCode) {
    res.status(statusCode).send({
      status: 'fail',
      message
    });
  },
   /**
   * @param {*} res - server response object
   * @param {*} data - data to be sent
   * @param {*} statusCode - status Code
   * @param {string} dataType - name of the data
   * @returns {object} -
   */
  sendData(res, data, statusCode, dataType) {
    // create response payload
    const payload = {
      status: 'success'
    };
    payload[dataType] = data;
    res.status(statusCode).send({ ...payload });
  },
    /**
   * validate user using jwt
   * @param {*} req - client request
   * @param {*} res - server response
   * @param {*} next - call the next route
   * @returns {object} -
   */
  validateUser(req, res, next) {
    if (!req.headers && !req.body && !req.query) {
      // if there is no data to process
      res.status(401).send({
        message: 'No token provided.'
      });
    }
    const token = req.headers.authorization || req.body.token || req
    .query.token;
    // decoding the token
    if (token) {
      jwt.verify(token, process.env.TOKENSECRET, (error, decoded) => {
        if (error) {
          return res.status(401).send({
            message: 'Failed to authenticate token.'
          });
          return;
        }
        // check if user is disable
        User
        .find({
          where: {
            id: decoded.id
          },
        })
        .then((foundUser) => {
          if (foundUser) {
              // attach user info to the request object
              req.user = decoded;
              next();
          } else {
            return res.status(401).send({
              message: 'Wrong authentication credentials, ' +
              'please login with your Andela mail'
            });
          }
        })
        .catch(err => res.status(500).send({
          message: `Error occurred, please try again: ${err.message}`
        }));
      });
    } else {
      // if there is no token available return a message
      return res.status(401).send({ message: 'No token provided.' });
    }
  },
  /**
   * check if user is an admin
   * @param {*} req - client request
   * @param {*} res - server response
   * @param {*} next - call the next route
   * @returns {object} - next route or error message
   */
  adminOnly(req, res, next) {
    if (req.user.role === 'admin') {
      next();
      return;
    }
    res.status(403).send({
      status: 'fail',
      message: 'Invalid Operation'
    });
  },
}
