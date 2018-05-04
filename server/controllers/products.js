import model from '../models';
const Product = model.Product;
const YardSale = model.YardSales;
import {
  sendMessage,
  sendData
} from '../utilities';
module.exports = {
  /**
   * Create Product
   * @param {any} req 
   * @param {any} res 
   * @returns {req}
   */
  createProduct(req, res) {
    /**
     * we assume the this is not a public api , 
     * there every client would send the appropriate request body
     */
    let productObj = req.body;
    const yardsaleId = parseInt(req.params.yardsaleId, 10);
    productObj.yardsaleId = yardsaleId;
    Product.findOne({
      where: {
        name: productObj.name,
        yardsaleId,
      },
      attributes: ['id']
    })
      .then((existingProduct) => {
        if (existingProduct) {
          return sendMessage(res,
            `A Product for already for this yardsale name title ${productObj.name}`,
            400);
        }
        Product.create(productObj)
          .then(newProduct => sendData(res, newProduct, 201, 'product'))
          .catch((err) => {
            // check for error when the yardsale does not exist
            if (err.message.includes('violates foreign key constraint')) {
              return sendMessage(res, `There is no yardsale with the ID: ${yardsaleId}`, 400)
            }
            return sendMessage(res, err.message, 500)
          });
      })
      .catch(error => sendMessage(res, error.message, 500));
  },

    /**
   * Updates content of product in the database
   * Route: PUT: /products/:id
   * @param {any} req
   * @param {any} res
   * @returns {Response} response object
   */
  updateProduct(req, res) {
    return Product
      .findOne({
        where: {
          id: req.params.productId
        }
      })
      .then((product) => {
        if (!product) {
          return res
            .status(404)
            .send({ message: 'product Not Found' });
        }
        return product
          .update({
            name: req.body.name || product.name,
            condition: req.body.condition || product.condition,
            price: req.body.price || product.price,
            quantity: req.body.quantity || product.quantity,
            maxslot: req.body.maxslot || product.maxslot,
            yardsaleId: req.body.yardsaleId || product.yardsaleId,
            imageUrl: req.body.imageUrl || product.imageUrl,
          })
          .then(updatedProduct => res.status(200)
          .json({ message: 'Update Successful', updatedProduct }))
          .catch(error => res.status(500).send(error));
      })
      .catch(error => res.status(500).send(error));
  },
}
