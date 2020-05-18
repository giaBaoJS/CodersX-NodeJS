var express = require('express');
var route = express.Router();
const shortid = require('shortid');
var db = require('../db');
const transactions = db.get("transactions").value();
const users = db.get("users").value();
const books = db.get("books").value();
route.get("/", (request, response) => {
    response.render("transaction/index", {
      transactions: db.get('transactions').value()
    });
});

route.get('/create',(req,res)=>{
  
    res.render('transaction/createTrans.pug',{
    users,
    books
    });
});

route.post("/create", (req, res) => {
  req.body.id=shortid.generate();
  var id=req.body.id;
  var bookID = req.body.book;
  var userID = req.body.user;
  var newTrans = {id, userID, bookID};
  db.get('transactions').push(newTrans).write();
  
  res.redirect('/transactions');

});

module.exports = route;