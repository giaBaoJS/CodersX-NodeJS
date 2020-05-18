var express = require('express');
var route = express.Router();
var controller = require('../controller/user.controller');
route.get("/",controller.index);

route.get('/create', controller.create);

route.post("/create", controller.postCreate);

route.get("/:id/delete", controller.delete);

route.get('/:id/update',controller.getUpdate);

route.post("/:id/update", controller.postUpdate);
module.exports = route;