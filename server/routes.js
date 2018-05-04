import Controllers from './controllers';
import { validateUser, adminOnly } from './utilities';


const yardsalesController = Controllers.YardSale;
const productController = Controllers.Product;
const userController = Controllers.User;

module.exports = (app) => {
   app.post('/login',  userController.login);
  // check for user session
  app.use(validateUser);
  app.get('/yardsales', yardsalesController.searchYardSale);
  app.get('/products', productController.searchProduct);
  app.get('/yardsales/:yardsaleId/cartItems', productController.getCartItems);
  app.post('/yardsales/:yardsaleId/addtoCart', productController.addtoCart);
  // admin routes start here 
  app.post('/yardsales',  yardsalesController.createYardSale);
  app.post('/yardsales/:yardsaleId/product', productController.createProduct);
  app.put('/product/:productId', productController.updateProduct);
  app.post('/yardsales/:yardsaleId/addtoCart/', productController.addtoCart);

}
