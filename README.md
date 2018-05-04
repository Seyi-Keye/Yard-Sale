### Welcome to Yard-Sale

Yard-Sale will help manage and facilitate a yard sale. It comes with the ease of signing up with your gmail address and also view in real time an ongoing yardsale.

[Click here](http://heroku-link) to view the app on Heroku.

### Core Tecnologies
-----------
The application was developed with [NodeJs](https://nodejs.org/en/docs/) while using [Express](http://expressjs.com) for routing.
The [Postgres](http://postgresql.com) database was used with [sequelize](http://sequelizejs.com) as the ORM.
The user interface was built using [ReactJS](http://reactjs.cn/react/docs) with the [Redux](http://redux.js.org/) architecture.
[Webpack](https://webpack.js.org/configuration/) was used to bundle modules and [Babel](http://babeljs.io) was used to transpile all code to es5

### Installation
------------
1.  Ensure you have NodeJs and postgres installed
2.  Clone the repository `git clone https://github.com/Seyi-Keye/Yard-Sale.git`
3.  Change your directory `cd Yard-Sale`
4.  Install all dependencies `npm install`
5.  Run tests  `npm test`
6.  Run `npm run db:migrate` and then `sequelize db:seed:all` to populate your database with initial data.
7.  Start the app `npm start`.

### API ENDPOINTS
Access for the endpoints are restricted based on the Authorization token assigned to the user.
Users are assigned a JWT on creating an account and login to the system, this token is therefore used to authorise access to the API endpoints.


### Contributing
Contributions are most welcome. To contribute: 
1. open an issue in the issues tab on github
2. fork the repository
3. work on the feature
4. raise a PR to the staging branch.
