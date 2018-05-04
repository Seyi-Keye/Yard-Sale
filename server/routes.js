import Controllers from './controllers';
import { validateUser, adminOnly } from './utilities';


const yardsalesController = Controllers.YardSale;


module.exports = (app) => {


  app.get('/yardsales', yardsalesController.searchYardSale);
  
  // check for user session
  // app.use(validateUser);

  // admin routes start here 
  app.post('/yardsales',  yardsalesController.createYardSale);

}
