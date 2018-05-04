import model from '../models';
const YardSale = model.YardSales;
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
    const yardSaleObj = req.body;
    // check if an yardSale does not exist with this name
    // get owner name
    YardSale.findOne({
      where: { title: yardSaleObj.title },
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
  /**
   * search Yard sale by  locations, title , Start Date and Sales Date 
   * @param {any} req 
   * @param {any} res 
   * @returns {req}
   */
  searchYardSale(req, res) {
      let query = req.query;
      // add custom query
      if (query.title) {
        query.title = {
          $like: `%${query.title}%`
        }
      }
      if (query.location) {
        query.location = {
          $like: `%${query.location}%`
        }
      }
      if (query.startBefore) {
        query.startdate = {
          $lte: query.startBefore
        }
      }
      //  query for startdate
      if (query.startAfter) {
        if (query.startdate) {
          query.startdate = {
            $gte: query.startAfter,
            $lte: query.startBefore
          }
        } else {
          query.startdate = {
            $gte: query.startAfter
          }
        }
      }

      //  query for saleDate
      if (query.saleBefore) {
        query.saleDate = {
          $lte: query.saleBefore
        }
      }
      if (query.saleAfter) {
        if (query.startdate) {
          query.saleDate = {
            $gte: query.saleAfter,
            $lte: query.saleBefore
          }
        } else {
          query.saleDate = {
            $gte: query.saleAfter
          }
        }
      }
      const offset = parseInt(req.query.offset, 10) || 0;
      const limit = parseInt(req.query.limit, 10) || 10;
      YardSale.findAndCountAll({
        where: { ...query },
        offset,
        limit,
        order: [['title', 'ASC']],
      })
      .then((yardSales) => {
        const count = yardSales.count;
        const rows = yardSales.rows;

        if (rows.length < 1) {
          return sendMessage(res, 'No yardSale was found.', 404);
        }
        const yardSalesPayload = {
          count,
          rows,
          curPage: parseInt(offset / limit, 10) + 1,
          pageCount: parseInt(count / limit, 10),
          pageSize: rows.length
        };
        return sendData(res, yardSalesPayload, 200, 'yardSales');
      });
  }
}
