var db = require('../db');
const shortid = require('shortid');
module.exports.index = (request, response) => {
    response.render("user/user", {
      user: db.get('users').value()
    });
}

module.exports.create = (req,res)=>{
    res.render('user/userCreate.pug');
}

module.exports.postCreate = (req, res) => {
  req.body.id=shortid.generate();
  var pass="123123";
  var isAdmin = 0;
  var id = req.body.id;
  var name =req.body.name;
  var email= req.body.email;
  var u = {id,name,pass,email,isAdmin};
  db.get('users').push(u).write();
  res.redirect('/users');
};

module.exports.delete = (req, res) => {
  var id= req.params.id;
  var todos= db.get('users').find({id :id}).value();
  var c= db.get('users').indexOf(todos);
  db.get('users').splice(c,1).write();
  res.redirect('/users');
};

module.exports.getUpdate = (req, res) => {
    var id=req.params.id;
    var IdUser=db.get('users').find({id:id}).value();
    res.render('user/updateUser.pug',{
        user:IdUser
    })
};

module.exports.postUpdate = (req, res) => {
  var id= req.params.id;
  db.get('users')
        .find({ id:id })
        .assign(req.body)
        .write()
    res.redirect('/users')
};