var express = require('express');
var router = express.Router();
var controller = require('../controller/book.controller');
router.get("/",controller.index);

router.get('/create', controller.create);

router.post("/create", controller.postCreate);

router.get("/:id/delete", controller.delete);

router.get('/:id/update',controller.getUpdate);

router.post("/:id/update", controller.postUpdate);

module.exports = router;