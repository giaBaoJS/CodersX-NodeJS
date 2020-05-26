// server.js
// where your node app starts
require('dotenv').config();
// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.

//Khai Báo ban đầu và require những package
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const shortid = require('shortid');
const cookieParser = require("cookie-parser");
var db = require('./db');
app.set("view engine", "pug");
app.set("views", "./views");

//Khai báo các biến chứa các route 
var bookRoute = require('./routes/book.route');
var userRoute = require('./routes/user.route');
var transactionRoute = require('./routes/transaction.route');
var sessionMiddleware = require('./middleware/session.middleware');
var authMiddleware = require('./middleware/auth.middleware');
var authRoute = require('./routes/auth.route');
var productRoute = require('./routes/product.route');

//Phần còn lại
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static("public"));

app.use(cookieParser('happypoodle'));
app.use(authMiddleware.checkSession);



//Trang chủ mặc định
app.get("/", authMiddleware.requireAuth, (req, res) => {
  if(res.locals.isAdmin==0){
    res.redirect('/transactions');
  }else{
    res.redirect('/books');
  }
});

//Sử dụng Use để set các request route và xét điều kiện
app.use('/books',bookRoute);
app.use('/users',authMiddleware.requireAuth,authMiddleware.checkAdmin,userRoute);
app.use('/transactions',authMiddleware.requireAuth,transactionRoute);
app.use('/auth',authRoute);
app.use('/products',productRoute);


// listen for requests :)
app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
