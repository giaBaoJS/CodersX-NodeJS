var db = require("../db");
const bcrypt = require("bcrypt");
const shortid = require("shortid");
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: "giabao",
  api_key: "229497952462761",
  api_secret: "urhMAzP-7_Ulf1fyOzwpDhDVABA"
});
module.exports.index = (request, response) => {

  response.render("user/user", {
    user: db.get("users").value()
  });
};

module.exports.create = (req, res) => {
  res.render("user/userCreate.pug");
};

module.exports.postCreate = (req, res) => {
  req.body.id = shortid.generate();

  var avatar = req.file.path;

  cloudinary.uploader.upload(`./${avatar}`, (error, result) => {
    var s= result.url;
    var password = bcrypt.hashSync("123123", 10);
    var isAdmin = 0;
    var id = req.body.id;
    var name = req.body.name;
    var email = req.body.email;
    var u = { id, name, password, email, isAdmin, avatar:result.url };
    db.get("users")
      .push(u)
      .write();
    res.redirect("/users");
    
  });

  // var password=bcrypt.hashSync("123123",10);
  // var isAdmin = 0;
  // var id = req.body.id;
  // var name =req.body.name;
  // var email= req.body.email;
  // var u = {id,name,password,email,isAdmin,userAvatar};
  // db.get('users').push(u).write();
  // res.redirect('/users');
};

module.exports.delete = (req, res) => {
  var id = req.params.id;
  var todos = db
    .get("users")
    .find({ id: id })
    .value();
  var c = db.get("users").indexOf(todos);
  db.get("users")
    .splice(c, 1)
    .write();
  res.redirect("/users");
};

module.exports.getUpdate = (req, res) => {
  var id = req.params.id;
  var IdUser = db
    .get("users")
    .find({ id: id })
    .value();
  res.render("user/updateUser.pug", {
    user: IdUser
  });
};

module.exports.postUpdate = (req, res) => {
  var id = req.params.id;
  db.get("users")
    .find({ id: id })
    .assign(req.body)
    .write();
  res.redirect("/users");
};
