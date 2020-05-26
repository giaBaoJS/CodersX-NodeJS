var express = require('express');
var multer = require('multer');
var route = express.Router();
var controller = require('../controller/user.controller');
var validate = require('../validate/user.validate');

var upload = multer({dest: './puclic/uploads/'});

route.get("/",controller.index);

route.get('/create', controller.create);

route.post("/create", upload.single('avatar'),validate.postCreate,controller.postCreate);

route.get("/:id/delete", controller.delete);

route.get('/:id/update',controller.getUpdate);

route.post("/:id/update", controller.postUpdate);
module.exports = route;