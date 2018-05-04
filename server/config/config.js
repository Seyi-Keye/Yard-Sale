const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  "development": {
    "username": process.env.DB_USER_NAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_NAME,
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "test": {
    "use_env_variable": "DATABASE_URL",
    "logging": false,
    "dialect": "postgres"
  },
  "production": {
    "use_env_variable": "DATABASE_URL",
    "logging": false,
    "dialect": "postgres"
  }
}
