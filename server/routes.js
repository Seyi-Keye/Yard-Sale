import Controllers from './controllers';
import { validateUser, adminOnly } from './utilities';


const yardsalesController = Controllers.YardSale;
const productController = Controllers.Product;
const userController = Controllers.User;

module.exports = (app) => {


  
  // check for user session
  // app.use(validateUser);

  app.get('/yardsales', yardsalesController.searchYardSale);
  app.get('/products', productController.searchProduct);
  // admin routes start here 
  app.post('/yardsales',  yardsalesController.createYardSale);
  app.post('/yardsales/:yardsaleId/product', productController.createProduct);
  app.put('/product/:productId', productController.updateProduct);
  // login
  app.post('/login',  userController.login);

}
