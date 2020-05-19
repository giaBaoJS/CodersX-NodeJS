// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const shortid = require('shortid');
const cookieParser = require("cookie-parser");
var db = require('./db');

var bookRoute = require('./routes/book.route');
var userRoute = require('./routes/user.route');
var transactionRoute = require('./routes/transaction.route');

var authMiddleware = require('./middleware/auth.middleware');


const validateCookie = require("./validate/cookies.validate.js");
var authRoute = require('./routes/auth.route');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static("public"));
app.set("view engine", "pug");
app.set("views", "./views");
app.use(cookieParser());
app.get("/", authMiddleware.requireAuth, (req, res) => {
  if(res.locals.isAdmin==0){
    res.redirect('/transactions');
  }else{
    res.redirect('/books');
  }
});
app.use('/books',authMiddleware.requireAuth,authMiddleware.checkAdmin,bookRoute);
app.use('/users',authMiddleware.requireAuth,authMiddleware.checkAdmin,userRoute);
app.use('/transactions',authMiddleware.requireAuth,transactionRoute);
app.use('/auth',authRoute);


// listen for requests :)
app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
