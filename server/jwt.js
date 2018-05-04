import jwt from 'jsonwebtoken';

/**
 * @description jwt sign function
 * @param {string} id User Id
 * @param {string} email User Email
 * @param {string} role User Role Id
 * @returns {object} encoded token
 */
export default {
  sign: (id, email, role) =>
    jwt.sign(
      { id, email, role },
      process.env.TOKENSECRET,
      { expiresIn: 60 * 60 }
    ),
};
