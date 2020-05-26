var db = require('../db');
const shortid = require('shortid');
module.exports.index = (req, response)=>{
  var page = parseInt(req.query.page) || 1;
  var perPage = 8;
  var start = (page-1) *perPage;
  var end = page*perPage;
  var drop = (page-1)*perPage;
  var nextPage=page+1;
  var prevPage=page-1;
    response.render("products/index", {
      page:page,
      nextPage:nextPage,
      prevPage:prevPage,
      products: db.get('products').drop(drop).take(perPage).value()
      
    });
}

