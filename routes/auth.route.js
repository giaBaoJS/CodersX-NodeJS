var express = require('express');
var route = express.Router();
var controller = require('../controller/auth.controller');


route.get("/login",controller.login);

route.post("/login",controller.postLogin);

route.get("/logout",controller.logout);

module.exports=route;
