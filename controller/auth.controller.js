
var db = require('../db');
const bcrypt = require('bcrypt');
const sgMail = require("@sendgrid/mail");
const shortid = require('shortid');
module.exports.login = (req,res)=>{
  res.render('auth/login');
};

const sendMail = () => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const msg = {
    to: "baonhgps08844@fpt.edu.vn",
    from: "waycaosi1994@gmail.com",
    subject: "Attention your account",
    text: "Your account login wrong password thrice. Please change password",
    html:
      "<strong>Your account login wrong password thrice. Please change password</strong>"
  };
  
  sgMail.send(msg);
};

module.exports.postLogin = async (req,res)=>{
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
   if (user.wrongLoginCount >= 3) {
         sendMail();
    res.render("./auth/login.pug", {
      error: [
        "Bạn đã vượt quá số lần đăng nhập."
      ],
      values: req.body
    });
    return;
  }
  var pass=user.password;
 var check= await bcrypt.compare(password,pass);
  if(!check){
    db.get("users")
      .find({ email: email })
      .assign({ wrongLoginCount: ++user.wrongLoginCount })
      .write();
    
     res.render('auth/login',{
      error:[
        'Wrong password.'
      ],
        values: req.body
    });
    
    return ;
  }
  res.cookie('userID',user.id,{
    signed : true
  });
  res.redirect('/users');
};

module.exports.logout = (req, res) => {
  res.clearCookie("userID");

  res.redirect("/");
};
