var db = require('../db');
var shortId = require('shortid');

module.exports.requireAuth = (req,res,next)=>{
  if(!req.signedCookies.userID){
    res.redirect('/auth/login');
    return;
  }
  var user=db.get('users').find({id:req.signedCookies.userID}).value();
  if(!user){
    res.redirect('/auth/login');
    return;
  }
  next();
  res.locals.user=user;
  res.locals.isAdmin=user.isAdmin;
};
module.exports.checkAdmin = (req,res,next)=>{
  var user=db.get('users').find({id:req.signedCookies.userID}).value();
  if(user.isAdmin !==1){
    res.redirect('/transactions');
    return;
  }
    next();
};
module.exports.checkSession = (req, res, next) => {
  if (!req.signedCookies.sessionId) {
    const sessionId = shortId.generate();

    res.cookie("sessionId", sessionId, { signed: true });

    db.get("session")
      .push({
        id: sessionId,
        cart: {}
      })
      .write();
  }

  if (req.signedCookies.idUser) {
    const user = db
      .get("users")
      .find({ id: req.signedCookies.idUser })
      .value();

    res.locals.user = user;
  }

  next();
};