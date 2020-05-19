var db = require('../db');
const shortid = require('shortid');
module.exports.login = (req,res)=>{
  res.render('auth/login');
};

module.exports.postLogin = (req,res)=>{
  var email = req.body.email;
  var password= req.body.password;
  
  var user = db.get('users').find({email: email}).value();
  
  if(!user){
    res.render('auth/login',{
      error:[
        'User does not exist.'
      ],
      values: req.body
    });
    return ;
  }
  if(user.password !==password){
     res.render('auth/login',{
      error:[
        'Wrong password.'
      ],
        values: req.body
    });
    return ;
  }
  res.cookie('userID',user.id);
  res.redirect('/users');
};