var db = require('../db');

module.exports.requireAuth = (req,res,next)=>{
  if(!req.cookies.userID){
    res.redirect('/auth/login');
    return;
  }
  var user=db.get('users').find({id:req.cookies.userID}).value();
  if(!user){
    res.redirect('/auth/login');
    return;
  }
  next();
  res.locals.isAdmin=user.isAdmin;
};
module.exports.checkAdmin = (req,res,next)=>{
  var user=db.get('users').find({id:req.cookies.userID}).value();
  if(user.isAdmin !==1){
    res.redirect('/transactions');
    return;
  }
    next();
};