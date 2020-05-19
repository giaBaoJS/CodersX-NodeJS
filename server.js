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
const validateCookie = require("./validate/cookies.validate.js");

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static("public"));
app.set("view engine", "pug");
app.set("views", "./views");
app.use(cookieParser());
app.get("/", validateCookie.checkCookie, (req, res) => {
  console.log(`Cookie: ${res.locals.count}`);
  res.render("index.pug");
});
app.use('/books',bookRoute);
app.use('/users',userRoute);
app.use('/transactions',transactionRoute);



// listen for requests :)
app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
