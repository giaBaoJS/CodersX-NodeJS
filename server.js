// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);
const shortid = require('shortid')


app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.set("view engine", "pug");
app.set("views", "./views");

app.get("/", (request, response) => {
  response.send("Hello Mình Là Gia Bảo ! ");
});

app.get("/books", (request, response) => {
    response.render("books/index", {
      books: db.get('books').value()
    });
});

app.post("/books/create", (req, res) => {
  req.body.id=shortid.generate();
  db.get('books').push(req.body).write();
  
  res.redirect('/books');

});
app.get("/books/:id/delete", (req, res) => {
  var id= req.params.id;
  var todos= db.get('books').find({id :id}).value();
  var c= db.get('books').indexOf(todos);
  db.get('books').splice(c,1).write();
  res.redirect('/books');

});

app.get('/books/:id/update', (req, res) => {
    var id=req.params.id;
    var Idbook=db.get('books').find({id:id}).value();
  console.log(Idbook);
    res.render('books/update.pug',{
        book:Idbook
    })
})

app.post("/books/:id/update", (req, res) => {
  var id= req.params.id;
  db.get('books')
        .find({ id:id })
        .assign(req.body)
        .write()
    res.redirect('/books')


});
// listen for requests :)
app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
