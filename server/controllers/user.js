import model from '../models';
import validator from 'validator';
import jwtoken from '../jwt';
const User = model.User;

module.exports = {
    
     /**
     * @description Allows Users signin
     * @static
     * @param {object} request Client's request
     * @param {object} response Server Response
     * @returns {object} response which includes status and and message
     * @memberof usersController
     */
    
     login(request, response) {
        if (request.body.email && !(validator.isEmail(request.body.email))) {
            response.status(400).send({
              message: 'Invalid Email',
            });
        }
        return User
        .findOne({
            where: {
              email: request.body.email
            },
            attributes: {
              exclude: ['createdAt', 'updatedAt']
            },
          })
          .then((user) => {
            if (!user){
                return User
                .create({
                    email: request.body.email,
                    role: "user",
                    name: request.body.username
                  })
                  .then(user => {
                    const token = jwtoken.sign(
                        user.dataValues.id,
                        user.dataValues.email,
                        user.dataValues.role
                        );
                        return response.status(201).send({
                            message: 'login successful', user, token });
                  })
                  .catch(error => response.status(500).send(error.toString()));
            }
            const token = jwtoken.sign(
            user.dataValues.id,
            user.dataValues.email,
            user.dataValues.role
            );
            return response.status(200).send({
            message: 'login successful', user, token });
          })
          .catch(error => response.status(500).send(error.toString()));
        
    }

}  