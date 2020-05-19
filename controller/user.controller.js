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
  var error = [];
  if(!req.body.name){
    error.push('Name is required');
  }
  if(error.length){
      res.render('user/userCreate.pug',{
        error:error,
        values: req.body
      });
    return ;
  }
  req.body.id=shortid.generate();
  db.get('users').push(req.body).write();
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