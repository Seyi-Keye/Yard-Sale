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
      if(existingProduct) {
        return sendMessage(res,
          `A Product for already for this yardsale name title ${productObj.name}`,
          400);
      }
      Product.create(productObj)
      .then(newProduct => sendData(res, newProduct, 201, 'product'))
      .catch((err) => {
        // check for error when the yardsale does not exist
        if ( err.message.includes('violates foreign key constraint')) {
          return sendMessage(res, `There is no yardsale with the ID: ${yardsaleId}`, 400)
        }
        return sendMessage(res, err.message, 500)
      });
    })
    .catch(error => sendMessage(res, error.message, 500));
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
    if (query.LeftOver) {
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
      if (query.location ){
        yardSalesQuery.location = {
          $like: `%${query.location}%`
        }
      }
      if (query.yardsale ){
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
            yardsaleId : { $in : yardsaleIds}
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
  }
}
