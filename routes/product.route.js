var express = require('express');
var route = express.Router();
var controller = require('../controller/product.controller');

route.get("/",controller.index);


module.exports = route;