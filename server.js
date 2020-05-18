// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("db.json");
const db = low(adapter);

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.set("view engine", "pug");
app.set("views", "./views");

app.get("/", (request, response) => {
  response.send("I love CodersX");
});

app.get("/todos", (request, response) => {
  var q = request.query.act;
  if (q) {
    var matchTodo = db.get("todos").filter(function(job) {
      return job.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });
    response.render("todos/index", {
      todos: matchTodo,
      question: q
    });
  } else {
    response.render("todos/index", {
      todos: db.get("todos").value()
    });
  }
});

app.post("/todos/create", (req, res) => {
  console.log(req.body);
  db.get("todos")
    .push(req.body)
    .write();
res.redirect("/todos");
  
});

// listen for requests :)
app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
