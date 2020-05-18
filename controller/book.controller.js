var db = require('../db');
const shortid = require('shortid');
module.exports.index = (request, response)=>{
    response.render("books/index", {
      books: db.get('books').value()
    });
}

module.exports.create = (req,res)=>{
    res.render('books/createBook.pug');
};

module.exports.postCreate = (req, res) => {
  req.body.id=shortid.generate();
  db.get('books').push(req.body).write();
  res.redirect('/books');
};

module.exports.delete = (req, res) => {
  var id= req.params.id;
  var todos= db.get('books').find({id :id}).value();
  var c= db.get('books').indexOf(todos);
  db.get('books').splice(c,1).write();
  res.redirect('/books');
};

module.exports.getUpdate = (req, res) => {
    var id=req.params.id;
    var Idbook=db.get('books').find({id:id}).value();
  console.log(Idbook);
    res.render('books/update.pug',{
        book:Idbook
    })
};

module.exports.postUpdate = (req, res) => {
  var id= req.params.id;
  db.get('books')
        .find({ id:id })
        .assign(req.body)
        .write()
    res.redirect('/books')
}
