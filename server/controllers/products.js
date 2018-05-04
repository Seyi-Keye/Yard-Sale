import model from '../models';
const YardSale = model.product;
import { 
  sendMessage,
  sendData
} from '../utilities';
module.exports = {
  /**
   * Create Yard sale
   * @param {any} req 
   * @param {any} res 
   * @returns {req}
   */
  createYardSale(req, res) {
    const productObj = req.body;
    // check if an yardSale does not exist with this name
    // get owner name
    YardSale.findOne({
      where: { 
        name: productObj.name,
        
      },
      attributes: ['id']
    })
    .then((existingYardSale) => {
      if(existingYardSale) {
        return sendMessage(res,`A yardsale already exist with title ${yardSaleObj.title}`,400);
      }
      YardSale.create(yardSaleObj)
      .then(newYardSale => sendData(res, yardSaleObj, 201, 'document'))
      .catch(err => sendMessage(res, err.message, 500));
    })
    .catch(error => sendMessage(res, error.message, 500));
  },
}
