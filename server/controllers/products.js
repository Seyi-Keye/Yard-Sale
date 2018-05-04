import model from '../models';
const Product = model.Product;
const YardSale = model.YardSales;
const Cart = model.Cart;
const CartItems = model.CartItems;

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
  /**
   * search prodcuts by  yardsale-title, product condition, price range, name, yardsale location 
   * and if the product has leftover
   * @param {any} req 
   * @param {any} res 
   * @returns {req}
   */
  searchProduct(req, res) {
    // handle case where yardsales title or location was provided
    let query = req.query;
    const offset = parseInt(req.query.offset, 10) || 0;
    const limit = parseInt(req.query.limit, 10) || 10;
    let yardsaleIds = [];
    // add custom query
    if (query.name) {
      query.name = {
        $like: `%${query.name}%`
      }
    }
    if (query.leftOver) {
      query.leftOver = {
        $gt: 0
      }
    }
    if (query.priceBelow) {
      query.price = {
        $lte: query.priceBelow
      }
    }
    //  query for startdate
    if (query.priceAbove) {
      if (query.startdate) {
        query.price = {
          $gte: query.priceAbove,
          $lte: query.priceBelow
        }
      } else {
        query.price = {
          $gte: query.priceAbove
        }
      }
    }

    if (query.location || query.yardsale) {
      let yardSalesQuery = {};
      if (query.location) {
        yardSalesQuery.location = {
          $like: `%${query.location}%`
        }
      }
      if (query.yardsale) {
        yardSalesQuery.title = {
          $like: `%${query.yardsale}%`
        }
      }
      // remove yardsale and yardsale from query
      delete req.query.location;
      delete req.query.yardsale;
      YardSale.findAll({
        where: { ...yardSalesQuery },
        attributes: ['id']
      })
        .then((yardSales) => {
          if (!yardSales.length) {
            return sendMessage(res, 'No Product was found.', 404);
          }
          // create a array of all the yardsale id
          yardsaleIds = yardSales.map(x => x.id);
          Product.findAndCountAll({
            where: {
              ...query,
              yardsaleId: { $in: yardsaleIds }
            },
            offset,
            limit,
            order: [['name', 'ASC']],
          })
            .then((products) => {
              const count = products.count;
              const rows = products.rows;

              if (rows.length < 1) {
                return sendMessage(res, 'No Product was found.', 404);
              }
              const productPayload = {
                count,
                rows,
                curPage: parseInt(offset / limit, 10) + 1,
                pageCount: parseInt(count / limit, 10),
                pageSize: rows.length
              };
              return sendData(res, productPayload, 200, 'products');
            })
            .catch(error => sendMessage(res, error.message, 500));
        })
        .catch(error => sendMessage(res, error.message, 500));
    } else {
      // remove yardsale and yardsale from query
      delete req.query.location;
      delete req.query.yardsale;
      Product.findAndCountAll({
        where: { ...query },
        offset,
        limit,
        order: [['name', 'ASC']],
      })
        .then((products) => {
          const count = products.count;
          const rows = products.rows;

          if (rows.length < 1) {
            return sendMessage(res, 'No Product was found.', 404);
          }
          const productPayload = {
            count,
            rows,
            curPage: parseInt(offset / limit, 10) + 1,
            pageCount: parseInt(count / limit, 10),
            pageSize: rows.length
          };
          return sendData(res, productPayload, 200, 'products');
        })
        .catch(error => sendMessage(res, error.message, 500));
    }
  },

  addtoCart(req, res) {
    let cartItemObject = {
          cartId: 0,
          product: req.body.productID,
          requestedQuantity: req.body.requestedQuantity,
          price: req.body.price,
          cost: req.body.cost,
          unassignedQuantity: req.body.unassignedQuantity,
          userEmail: req.user.email,
          userId: req.user.id
    }
    Cart.findOne({
      where: {
        userId: req.params.userId
      }
    }).then((foundCart) => {
      if (foundCart !== null) {
        // update cartID 
        cartItemObject.cartId = foundCart.id;
        return CartItems.findOne({
            where: {
              cartId: foundCart.id,
              productId: req.body.productID,
            }
        })
        .then((existingCartItem) => {
            if (existingCartItem) {
              // update cartItem
              CartItems
              .update({
                unassignedQuantity: req.body.currentQty,
                requestedQuantity: req.body.currentQty
              })
              .then(updatedCartItem => res.status(200)
              .json({ message: 'Update Successful Cart Item', updatedCartItem }))
              .catch(error => res.status(500).send(error));
            } else {
              CartItems.create({cartItemObject})
              .then((cartItemAdded) => {
                res.status(201).send({ message: 'Item added to cart successfully', cartItemAdded });
              })
              .catch(err => res.status(400).send(err));
            }
        })
      }
      else {
        return Cart.create({
          userId: req.params.userId,
          yardsaleId: req.body.yardsaleId,
          status: req.body.status,
        })
          .then((newCartCreated) => {
            // update cartID 
            cartItemObject.cartId = newCartCreated.id;
            return CartItems.create({cartItemObject})
              .then((cartItemAdded) => {
              res.status(201).send({ message: 'Item added to cart successfully', cartItemAdded });
            })
          })
          .catch(err => res.status(400).send(err));
      }
    });
  },
}
