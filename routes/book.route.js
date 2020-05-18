var express = require('express');
var router = express.Router();
const shortid = require('shortid');
var db = require('../db');
router.get("/", (request, response) => {
    response.render("books/index", {
      books: db.get('books').value()
    });
});

router.get('/create',(req,res)=>{
    res.render('books/createBook.pug');
});

router.post("/create", (req, res) => {
  req.body.id=shortid.generate();
  db.get('books').push(req.body).write();
  
  res.redirect('/books');

});
router.get("/:id/delete", (req, res) => {
  var id= req.params.id;
  var todos= db.get('books').find({id :id}).value();
  var c= db.get('books').indexOf(todos);
  db.get('books').splice(c,1).write();
  res.redirect('/books');

});

router.get('/:id/update', (req, res) => {
    var id=req.params.id;
    var Idbook=db.get('books').find({id:id}).value();
  console.log(Idbook);
    res.render('books/update.pug',{
        book:Idbook
    })
})

router.post("/:id/update", (req, res) => {
  var id= req.params.id;
  db.get('books')
        .find({ id:id })
        .assign(req.body)
        .write()
    res.redirect('/books')


});
module.exports = router;