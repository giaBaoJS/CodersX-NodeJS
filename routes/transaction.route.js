var express = require('express');
var route = express.Router();
var controller = require('../controller/transaction.controller');

route.get("/",controller.index);

route.get('/create', controller.create);

route.post("/create", controller.postCreate);

route.get("/:id/complete", controller.complete);

module.exports = route;