var express = require('express');
var route = express.Router();
const shortid = require('shortid');
var db = require('../db');
route.get("/", (request, response) => {
    response.render("user/user", {
      user: db.get('users').value()
    });
});

route.get('/create',(req,res)=>{
    res.render('user/userCreate.pug');
});

route.post("/create", (req, res) => {
  req.body.id=shortid.generate();
  db.get('users').push(req.body).write();
  
  res.redirect('/users');

});
route.get("/:id/delete", (req, res) => {
  var id= req.params.id;
  var todos= db.get('users').find({id :id}).value();
  var c= db.get('users').indexOf(todos);
  db.get('users').splice(c,1).write();
  res.redirect('/users');

});

route.get('/:id/update', (req, res) => {
    var id=req.params.id;
    var IdUser=db.get('users').find({id:id}).value();
  console.log(IdUser);
    res.render('user/updateUser.pug',{
        user:IdUser
    })
})

route.post("/:id/update", (req, res) => {
  var id= req.params.id;
  db.get('users')
        .find({ id:id })
        .assign(req.body)
        .write()
    res.redirect('/users')


});
module.exports = route;