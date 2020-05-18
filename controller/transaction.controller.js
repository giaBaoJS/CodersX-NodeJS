var db = require('../db');
const shortid = require('shortid');
const transactions = db.get("transactions").value();
const users = db.get("users").value();
const books = db.get("books").value();

module.exports.index = (request, response) => {
    response.render("transaction/index", {
      transactions: db.get('transactions').value(),
      users,
      books
    });
};

module.exports.create = (req,res)=>{
    res.render('transaction/createTrans.pug',{
    users,
    books
    });
};

module.exports.postCreate = (req, res) => {
  req.body.id=shortid.generate();
  var status=false;
  var id=req.body.id;
  var bookID = req.body.book;
  var userID = req.body.user;
  var newTrans = {id, userID, bookID ,status};
  db.get('transactions').push(newTrans).write();
  res.redirect('/transactions');
};

module.exports.complete = (req,res) => {
   var id=req.params.id;
    var IdTransaction=db.get('transactions').find({id:id}).value();
  console.log(IdTransaction.status)
  if(IdTransaction.status == false){
    db.get('transactions').find({id:id}).assign(IdTransaction.status=true).write();
     res.redirect('/transactions');
  }
};
